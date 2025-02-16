# Personal Portfolio & Blog Website

This project is a personal portfolio and blog website built using Next.js. It helps in learning dynamic routing, API integration, authentication, state management, and deployment in a practical way.

## 🔹 Features Breakdown

### 1️⃣ Public Pages (Accessible to All Users)

#### ✅ Home Page (`/`)

- Display portfolio introduction (name, bio, and profile picture).
- Showcase skills using icons or a skill bar.
- Highlight featured projects (static or fetched from an API).
- Resume download button.

#### ✅ Projects Page (`/projects`)

- List of projects with images, descriptions, and links.
- Clicking on a project opens a detailed page (`/projects/[id]`).

#### ✅ Blog Page (`/blog`)

- Display a list of blogs (fetched from an API or JSON file).
- Clicking on a blog opens a detailed blog page (`/blog/[id]`).

#### ✅ Contact Page (`/contact`)

- Simple contact form (name, email, message).
- Save messages in local storage or a database.

### 2️⃣ Dashboard (Only for Logged-in Users) 💡

#### ✅ Login (`/dashboard`)

- Social login using NextAuth.
- Only authenticated users can access the dashboard.

#### ✅ Blog Management (`/dashboard/blogs`)

- Create, read, edit, or delete blog posts.
- Form with fields like title, content, image, and category.

#### ✅ Project Management (`/dashboard/projects`)

- CRUD operations (Create, Read, Update, Delete) for projects.
- Upload project image, title, live link, descriptions, etc.

#### ✅ Message Management (`/dashboard/messages`)

- View messages submitted from the contact form.

## 🔹 Technical Requirements

### ✅ Frontend

- Next.js with TypeScript.
- Use Tailwind CSS for styling or any UI library/framework.
- Implement dynamic routes (`/projects/[id]`, `/blog/[id]`).

### ✅ Backend 💡

- Simple backend using Node.js/Express to manage Blogs, Projects, and other essential data.
- Backend API accessible publicly.

### ✅ Database

- MongoDB.

### ✅ Authentication 💡

- Social login using NextAuth.

### ✅ Deployment

- Deploy the website on Vercel.
- Store projects and blogs in MongoDB.
