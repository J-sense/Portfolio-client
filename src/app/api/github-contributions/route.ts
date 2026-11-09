import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const GITHUB_USERNAME = 'J-sense';

const GRAPHQL_QUERY = `
  query($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              color
            }
          }
        }
      }
    }
  }
`;

const LEVEL_COLORS: Record<number, string> = {
  0: 'rgba(255, 255, 255, 0.14)',
  1: 'rgba(188, 237, 52, 0.28)',
  2: 'rgba(188, 237, 52, 0.50)',
  3: 'rgba(188, 237, 52, 0.78)',
  4: '#BCED34',
};

async function fetchPublicContributionsFallback(username: string) {
  const res = await fetch(
    `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
    { cache: 'no-store' }
  );

  if (!res.ok) {
    throw new Error(`Fallback API returned status ${res.status}`);
  }

  const data = await res.json();
  const contributions: Array<{ date: string; count: number; level: number }> =
    data.contributions || [];

  const weeks: Array<{
    contributionDays: Array<{
      date: string;
      contributionCount: number;
      color: string;
    }>;
  }> = [];

  let currentWeek: Array<{
    date: string;
    contributionCount: number;
    color: string;
  }> = [];

  for (const item of contributions) {
    currentWeek.push({
      date: item.date,
      contributionCount: item.count,
      color: LEVEL_COLORS[item.level] ?? 'rgba(255, 255, 255, 0.05)',
    });

    if (currentWeek.length === 7) {
      weeks.push({ contributionDays: currentWeek });
      currentWeek = [];
    }
  }

  if (currentWeek.length > 0) {
    weeks.push({ contributionDays: currentWeek });
  }

  return {
    totalContributions:
      data.total?.lastYear ?? contributions.reduce((acc, c) => acc + c.count, 0),
    weeks,
  };
}

export async function GET() {
  const token = process.env.GITHUB_ACCESS_TOKEN || process.env.GITHUB_TOKEN;

  if (token && token !== 'your_github_personal_access_token_here') {
    try {
      const response = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'User-Agent': 'Nextjs-GitHub-Contributions',
        },
        body: JSON.stringify({
          query: GRAPHQL_QUERY,
          variables: { login: GITHUB_USERNAME },
        }),
        cache: 'no-store',
      });

      if (response.ok) {
        const data = await response.json();
        const calendar =
          data?.data?.user?.contributionsCollection?.contributionCalendar;

        if (calendar && Array.isArray(calendar.weeks)) {
          return NextResponse.json(calendar, {
            headers: {
              'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
            },
          });
        }
      }
      console.warn(
        'GitHub GraphQL API response invalid or unauthorized, falling back to public mirror.'
      );
    } catch (err) {
      console.warn('GitHub GraphQL API request failed, falling back:', err);
    }
  }

  // Fallback to public contribution mirror so the UI always renders live data safely
  try {
    const fallbackCalendar = await fetchPublicContributionsFallback(GITHUB_USERNAME);
    return NextResponse.json(fallbackCalendar, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (error: any) {
    console.error('Error fetching GitHub contributions:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch GitHub contributions',
        totalContributions: 0,
        weeks: [],
      },
      { status: 500 }
    );
  }
}
