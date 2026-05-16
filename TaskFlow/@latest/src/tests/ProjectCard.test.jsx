import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProjectCard from '../components/ProjectCard';

vi.mock('../services/githubService', () => ({
  fetchRepoProgress: vi.fn(() => Promise.resolve({ totalCommits: 0, overallProgress: 0, collaborators: [] })),
}));

const baseProject = {
  id: 1,
  title: 'TaskFlow App',
  description: 'A project management tool.',
  repository: 'https://github.com/owner/repo',
  tasksCompleted: 5,
  tasksTotal: 10,
};

describe('ProjectCard', () => {

  it('renders the project title', () => {
    render(<ProjectCard project={baseProject} />);
    expect(screen.getByText('TaskFlow App')).toBeInTheDocument();
  });

  it('renders the project description', () => {
    render(<ProjectCard project={baseProject} />);
    expect(screen.getByText('A project management tool.')).toBeInTheDocument();
  });

  it('renders fallback description when none provided', () => {
    render(<ProjectCard project={{ ...baseProject, description: '' }} />);
    expect(screen.getByText('No description provided.')).toBeInTheDocument();
  });

  it('renders the repository link', () => {
    render(<ProjectCard project={baseProject} />);
    expect(screen.getByText('github.com/owner/repo')).toBeInTheDocument();
  });

  it('renders In Progress status when progress is below 100', () => {
    render(<ProjectCard project={baseProject} />);
    expect(screen.getByText('In Progress')).toBeInTheDocument();
  });

  it('renders Open Project button', () => {
    render(<ProjectCard project={baseProject} />);
    expect(screen.getByText('Open Project')).toBeInTheDocument();
  });

  it('Open Project link points to repository', () => {
    render(<ProjectCard project={baseProject} />);
    const link = screen.getByText('Open Project').closest('a');
    expect(link).toHaveAttribute('href', 'https://github.com/owner/repo');
  });

  it('Open Project is disabled when no repository', () => {
    render(<ProjectCard project={{ ...baseProject, repository: '' }} />);
    const link = screen.getByText('Open Project').closest('a');
    expect(link).toHaveClass('pointer-events-none');
  });
});
