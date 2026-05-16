import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskCard from '../components/TaskCard';

const baseTask = {
  id: 1,
  title: 'Write tests',
  status: 'todo',
  deadline: '2099-12-31',
};

describe('TaskCard', () => {

  it('renders the task title', () => {
    render(<TaskCard task={baseTask} />);
    expect(screen.getByText('Write tests')).toBeInTheDocument();
  });

  it('renders To Do status pill', () => {
    render(<TaskCard task={baseTask} />);
    expect(screen.getByText('To Do')).toBeInTheDocument();
  });

  it('renders In Progress status pill', () => {
    render(<TaskCard task={{ ...baseTask, status: 'in progress' }} />);
    expect(screen.getByText('In Progress')).toBeInTheDocument();
  });

  it('renders Done status pill', () => {
    render(<TaskCard task={{ ...baseTask, status: 'done' }} />);
    expect(screen.getByText('✓ Done')).toBeInTheDocument();
  });

  it('shows No deadline when deadline is missing', () => {
    render(<TaskCard task={{ ...baseTask, deadline: null }} />);
    expect(screen.getByText(/No deadline/)).toBeInTheDocument();
  });

  it('shows Overdue when deadline has passed and task is not done', () => {
    render(<TaskCard task={{ ...baseTask, deadline: '2000-01-01', status: 'todo' }} />);
    expect(screen.getByText(/Overdue/)).toBeInTheDocument();
  });

  it('does not show Overdue when task is done', () => {
    render(<TaskCard task={{ ...baseTask, deadline: '2000-01-01', status: 'done' }} />);
    expect(screen.queryByText(/Overdue/)).not.toBeInTheDocument();
  });

  it('calls onEdit when Edit button is clicked', () => {
    const onEdit = vi.fn();
    render(<TaskCard task={baseTask} onEdit={onEdit} />);
    fireEvent.click(screen.getByText('Edit'));
    expect(onEdit).toHaveBeenCalledWith(baseTask);
  });

  it('calls onDelete when Delete button is clicked', () => {
    const onDelete = vi.fn();
    render(<TaskCard task={baseTask} onDelete={onDelete} />);
    fireEvent.click(screen.getByText('Delete'));
    expect(onDelete).toHaveBeenCalledWith(baseTask);
  });

  it('does not throw when onEdit is not provided', () => {
    render(<TaskCard task={baseTask} />);
    expect(() => fireEvent.click(screen.getByText('Edit'))).not.toThrow();
  });
});
