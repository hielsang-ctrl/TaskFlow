import React from 'react';

const STATUS_STYLES = {
  todo:        { pill: 'bg-gray-100 text-gray-600',   label: 'To Do' },
  'in progress': { pill: 'bg-blue-100 text-blue-700', label: 'In Progress' },
  done:        { pill: 'bg-green-100 text-green-700', label: '✓ Done' },
};

const TaskCard = ({ task, onEdit, onDelete }) => {
  const { title, status = 'todo', deadline } = task;

  const normalizedStatus = status.toLowerCase();
  const { pill, label } = STATUS_STYLES[normalizedStatus] ?? STATUS_STYLES.todo;

  const formattedDeadline = deadline
    ? new Date(deadline).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
    : 'No deadline';

  const isOverdue = deadline && new Date(deadline) < new Date() && normalizedStatus !== 'done';

  return (
    <div className="flex flex-col gap-4">

      {/* Title & Status */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-2 shrink-0">
            <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <h4 className="text-sm font-semibold text-gray-900 leading-snug">{title}</h4>
        </div>
        <span className={`shrink-0 text-xs font-semibold px-3 py-1 rounded-full ${pill}`}>
          {label}
        </span>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100" />

      {/* Deadline */}
      <div className="flex items-center gap-2">
        <svg
          className={`w-4 h-4 shrink-0 ${isOverdue ? 'text-red-400' : 'text-gray-400'}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span className={`text-xs font-medium ${isOverdue ? 'text-red-500' : 'text-gray-500'}`}>
          {isOverdue ? 'Overdue · ' : 'Due · '}{formattedDeadline}
        </span>
      </div>

      {/* Actions */}
      <div className="flex gap-2 mt-auto">
        <button
          onClick={() => onEdit && onEdit(task)}
          className="flex items-center justify-center gap-1.5 flex-1 py-2 rounded-xl border border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold transition-colors duration-200"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Edit
        </button>
        <button
          onClick={() => onDelete && onDelete(task)}
          className="flex items-center justify-center gap-1.5 flex-1 py-2 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold transition-colors duration-200"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Delete
        </button>
      </div>

    </div>
  );
};

export default TaskCard;
