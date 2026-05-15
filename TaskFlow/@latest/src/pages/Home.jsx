import React, { useState } from 'react';
import ProjectCard from '../components/ProjectCard';

const INITIAL_PROJECTS = [
  {
    id: 1,
    title: 'TaskFlow Website design',
    description: 'designing of a website that enables people to work smoothly in groups and eases the process of project management.',
    repository: 'https://github.com/hielsang-ctrl/TaskFlow.git',
    tasksCompleted: 6,
    tasksTotal: 10,
  },
  {
    id: 2,
    title: 'Voting poll App',
    description: 'A voting poll app that allows users to create and participate in polls on various topics, providing real-time results and insights.',
    repository: 'https://github.com/hielsang-ctrl/G2VP.git',
    tasksCompleted: 3,
    tasksTotal: 10,
  },
  {
    id: 3,
    title: 'RealEstate Project',
    description: 'A real estate project that provides a platform for users to browse, buy, and sell properties, offering features like virtual tours, price comparisons, and personalized recommendations.',
    repository: 'https://github.com/RayW-exe/Group-Project-RealEastate.git',
    tasksCompleted: 5,
    tasksTotal: 5,
  },
];

const EMPTY_FORM = { title: '', repository: '', description: '' };

const Home = () => {
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.title.trim()) {
      e.title = 'Project name is required.';
    } else if (projects.some((p) => p.title.trim().toLowerCase() === form.title.trim().toLowerCase())) {
      e.title = 'A project with this name already exists.';
    }
    if (!form.description.trim()) e.description = 'Description is required.';
    if (form.repository.trim() && projects.some((p) => p.repository && p.repository.trim().toLowerCase() === form.repository.trim().toLowerCase())) {
      e.repository = 'This repository URL is already linked to another project.';
    }
    return e;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) { setErrors(e2); return; }
    setProjects([
      ...projects,
      { ...form, id: Date.now(), tasksCompleted: 0, tasksTotal: 0 },
    ]);
    setForm(EMPTY_FORM);
  };

  const handleOpen = (project) => console.log('Opening project:', project.title);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-10">

      {/* Hero Description */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-blue-500 mb-4">
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-3">
          Welcome to TaskFlow
        </h1>
        <p className="text-gray-500 text-sm leading-relaxed max-w-xl mx-auto">
          TaskFlow is a lightweight project management tool that helps you organise your work,
          track task progress, and collaborate with your team — all in one place.
          Create projects, link your repositories, and stay on top of every deadline.
        </p>
      </div>

      {/* Add Project Form */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-base font-semibold text-gray-900 mb-5 flex items-center justify-center gap-2">
          <span className="w-1 h-5 rounded-full bg-gradient-to-b from-green-500 to-blue-500 inline-block" />
          Add a New Project
        </h2>
        <form onSubmit={handleAdd} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* Project Name */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-600">Project Name <span className="text-red-400">*</span></label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="e.g. Website Redesign"
                className={`w-full px-3 py-2.5 text-sm rounded-xl border ${errors.title ? 'border-red-300 focus:ring-red-300' : 'border-gray-200 focus:ring-green-300'} focus:outline-none focus:ring-2 transition`}
              />
              {errors.title && <p className="text-xs text-red-500">{errors.title}</p>}
            </div>

            {/* Repository */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-600">Repository URL <span className="text-gray-400">(optional)</span></label>
              <input
                name="repository"
                value={form.repository}
                onChange={handleChange}
                placeholder="https://github.com/you/project"
                className={`w-full px-3 py-2.5 text-sm rounded-xl border ${errors.repository ? 'border-red-300 focus:ring-red-300' : 'border-gray-200 focus:ring-blue-300'} focus:outline-none focus:ring-2 transition`}
              />
              {errors.repository && <p className="text-xs text-red-500">{errors.repository}</p>}
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-600">Description <span className="text-red-400">*</span></label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Briefly describe what this project is about..."
              rows={3}
              data-gramm="false"
              data-gramm_editor="false"
              data-enable-grammarly="false"
              className={`w-full px-3 py-2.5 text-sm rounded-xl border ${errors.description ? 'border-red-300 focus:ring-red-300' : 'border-gray-200 focus:ring-green-300'} focus:outline-none focus:ring-2 transition resize-none`}
            />
            {errors.description && <p className="text-xs text-red-500">{errors.description}</p>}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Add Project
            </button>
          </div>
        </form>
      </div>

      {/* Projects Grid */}
      <div>
        <h2 className="text-base font-semibold text-gray-900 mb-5 flex items-center justify-center gap-2">
          <span className="w-1 h-5 rounded-full bg-gradient-to-b from-green-500 to-blue-500 inline-block" />
          Your Projects
          <span className="ml-1 text-xs font-medium bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
            {projects.length}
          </span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} onOpen={handleOpen} />
          ))}
        </div>
      </div>

    </div>
  );
};

export default Home;
