import React from 'react';

const ProjectCard = ({ project, onOpen }) => {
  const { title, description, repository, tasksCompleted = 0, tasksTotal = 0 } = project;
  const progress = tasksTotal > 0 ? Math.round((tasksCompleted / tasksTotal) * 100) : 0;

  const progressColor =
    progress === 100 ? 'bg-green-500' : progress >= 50 ? 'bg-blue-500' : 'bg-blue-300';

  const statusStyle =
    progress === 100 ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700';

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 p-6 flex flex-col gap-5">

      {/* Title & Status */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="bg-green-50 border border-green-200 rounded-xl p-2 shrink-0">
            <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7" />
            </svg>
          </div>
          <h3 className="text-base font-semibold text-gray-900 leading-snug">{title}</h3>
        </div>
        <span className={`shrink-0 text-xs font-semibold px-3 py-1 rounded-full ${statusStyle}`}>
          {progress === 100 ? '✓ Complete' : 'In Progress'}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
        {description || 'No description provided.'}
      </p>

      {/* Repository */}
      {repository && (
        <a
          href={repository}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-800 hover:underline truncate"
        >
          <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
          {repository.replace(/^https?:\/\//, '')}
        </a>
      )}

      {/* Progress */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between text-xs font-medium">
          <span className="text-gray-500">Progress</span>
          <span className="text-gray-800">{progress}%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
          <div
            className={`h-2 rounded-full transition-all duration-500 ${progressColor}`}
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-gray-400">{tasksCompleted} of {tasksTotal} tasks completed</p>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100" />

      {/* Open Button */}
      <a
        href={repository || '#'}
        target={repository ? '_blank' : '_self'}
        rel="noopener noreferrer"
        className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md ${!repository ? 'opacity-50 pointer-events-none' : ''}`}
      >
        Open Project
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </a>

    </div>
  );
};

export default ProjectCard;
