export type TUser = {
  user: {
    accessToken: string;
    image?: string;
    email: string;
    name?: string;
  };
} | null;
export type ProjectData = {
  title: string;
  image: string;
  liveLink: string;
  description: string;
  technologies: string[];
  _id?: string;
};
export type ArticleData = {
  title: string;
  content: string;
  image: string;
  category: string;
  _id?: string;
};
