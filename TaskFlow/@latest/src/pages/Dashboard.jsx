import React from 'react';
import TaskCard from '../components/TaskCard';

const SAMPLE_TASKS = [
  {
    id: 1,
    title: 'Design homepage mockup',
    status: 'done',
    deadline: '2025-07-10',
  },
  {
    id: 2,
    title: 'Set up project repository',
    status: 'in progress',
    deadline: '2025-07-25',
  },
  {
    id: 3,
    title: 'Write API documentation',
    status: 'todo',
    deadline: '2025-08-05',
  },
  {
    id: 4,
    title: 'Implement authentication',
    status: 'in progress',
    deadline: '2025-07-01',
  },
];

const Dashboard = () => {
  const handleEdit = (task) => console.log('Edit task:', task.title);
  const handleDelete = (task) => console.log('Delete task:', task.title);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Manage and track all your tasks</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {SAMPLE_TASKS.map((task) => (
          <TaskCard key={task.id} task={task} onEdit={handleEdit} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
