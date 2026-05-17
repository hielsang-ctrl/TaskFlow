# TaskFlow

A project management application that helps teams organise work, track task progress, and monitor individual contributor activity through GitHub repository integration.

 **Deployed site** https://hielsang-ctrl.github.io/TaskFlow/

---

## Features

- **Authentication** — Email/password sign up and log in, plus social login with GitHub and Google via Firebase
- **Project Management** — Create projects with a name, description, and repository link
- **GitHub Integration** — Fetches real commit data to calculate overall project progress and per-collaborator contribution percentages
- **Task Tracking** — Add tasks with status, deadline, and overdue detection
- **Project Details** — Define project requirements, due dates, and team members with roles
- **Protected Routes** — All pages require authentication; sessions persist across page refreshes

---

## Tech Stack


| Frontend -React && Vite 
| Styling -Tailwind CSS 
| Routing -React Router DOM 
| Authentication -Firebase Auth 
| API -GitHub REST API 
| Testing -Vitest, React Testing Library 
| Deployment -GitHub Actions → GitHub Pages 

---

## Deployment

The app is automatically deployed to GitHub Pages on every push to `main` via GitHub Actions.

link -https://hielsang-ctrl.github.io/TaskFlow/

