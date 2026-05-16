# Changelog

All notable changes to TaskFlow will be documented in this file.
This project follows [Semantic Versioning](https://semver.org/) and the [Keep a Changelog](https://keepachangelog.com/) format.

---

## [1.0.0] - 2025-05-16

### Added

#### Authentication
- Email and password sign up and log in via Firebase Authentication
- Social authentication with GitHub and Google using OAuth popup
- Protected routes — unauthenticated users are redirected to `/login`
- Session persistence across page refreshes via Firebase `onAuthStateChanged`
- Dedicated social auth page at `/social-auth`

#### Routing
- React Router v7 with `BrowserRouter`, `Routes`, and `Route`
- Protected route guard via `ProtectedRoute` component
- 404 Not Found page for unmatched routes
- Redirect from `/login` to `/` when already authenticated

#### Home Page
- Hero section with TaskFlow description
- Add project form with name, repository URL, and description fields
- Duplicate project name and repository URL validation
- Dynamic project grid that updates on new project submission

#### Project Cards
- Displays project title, description, repository link, and overall progress
- GitHub API integration via `githubService.js` to fetch real commit data
- Per-collaborator contribution breakdown with avatar, commit count, and percentage bar
- Progress bar color shifts from blue to green as progress increases
- "Open Project" button links directly to the GitHub repository

#### Dashboard
- Task cards displaying title, status pill, deadline, and overdue indicator
- Collapsible "Project Details" panel per card with smooth CSS transition
- Project requirements textarea, due date picker, and dynamic team members list
- Edit modal for updating task name, description, and repository URL
- Delete functionality to remove tasks from the list

#### Navbar
- Sticky top navigation with TaskFlow logo
- Active route highlighting
- User profile display with avatar initial and email
- Logout button
- Responsive mobile hamburger menu

#### Testing
- Vitest and React Testing Library configured
- 30 tests across `TaskCard`, `ProjectCard`, `Login`, and `githubService`
- Coverage reporting via `@vitest/coverage-v8`

#### Services
- `githubService.js` — fetches contributor stats from GitHub REST API
- Calculates overall project progress and per-collaborator percentages
- Supports authenticated requests via `VITE_GITHUB_TOKEN`

### Technical Stack
- React 19 with Vite 8
- Tailwind CSS v4
- Firebase Authentication
- React Router DOM v7
- Vitest + React Testing Library

---

## [Unreleased]

### Planned
- GitHub Actions deployment to GitHub Pages
- Firestore integration for persistent project and task data
- User profile editing
- Project sharing and team invitations
