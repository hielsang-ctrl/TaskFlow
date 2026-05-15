import React from 'react';
import ProjectCard from '../components/ProjectCard';

const SAMPLE_PROJECTS = [
  {
    id: 1,
    title: 'Website Redesign',
    description: 'Redesign the company website with a modern look and improved user experience.',
    tasksCompleted: 6,
    tasksTotal: 10,
  },
  {
    id: 2,
    title: 'Mobile App MVP',
    description: 'Build the minimum viable product for the TaskFlow mobile application.',
    tasksCompleted: 3,
    tasksTotal: 8,
  },
  {
    id: 3,
    title: 'API Integration',
    description: 'Integrate third-party APIs for payments, notifications, and analytics.',
    tasksCompleted: 5,
    tasksTotal: 5,
  },
];

const Home = () => {
  const handleOpen = (project) => {
    console.log('Opening project:', project.title);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
        <p className="text-sm text-gray-500 mt-1">Overview of all your active projects</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {SAMPLE_PROJECTS.map((project) => (
          <ProjectCard key={project.id} project={project} onOpen={handleOpen} />
        ))}
      </div>
    </div>
  );
};

export default Home;
