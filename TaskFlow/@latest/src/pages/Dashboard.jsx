import React, { useState } from 'react';
import TaskCard from '../components/TaskCard';

const EMPTY_MEMBER = { name: '', role: '' };

const SAMPLE_TASKS = [
  {
    id: 1,
    title: 'TaskFlow Website design',
    description: 'designing of a website that enables people to work smoothly in groups and eases the process of project management.',
    repository: 'https://github.com/hielsang-ctrl/TaskFlow.git',
    status: 'in progress',
    deadline: '2025-07-10',
    requirements: '',
    dueDate: '',
    members: [EMPTY_MEMBER],
  },
  {
    id: 2,
    title: 'Voting poll App',
    description: 'A voting poll app that allows users to create and participate in polls on various topics, providing real-time results and insights.',
    repository: 'https://github.com/hielsang-ctrl/G2VP.git',
    status: 'in progress',
    deadline: '2025-07-25',
    requirements: '',
    dueDate: '',
    members: [EMPTY_MEMBER],
  },
  {
    id: 3,
    title: 'RealEstate Project',
    description: 'A real estate project that provides a platform for users to browse, buy, and sell properties, offering features like virtual tours, price comparisons, and personalized recommendations.',
    repository: 'https://github.com/RayW-exe/Group-Project-RealEastate.git',
    status: 'completed',
    deadline: '2025-08-05',
    requirements: '',
    dueDate: '',
    members: [EMPTY_MEMBER],
  },
  {
    id: 4,
    title: 'Implement authentication',
    description: 'Add JWT-based authentication and role management.',
    repository: '',
    status: 'in progress',
    deadline: '2025-07-01',
    requirements: '',
    dueDate: '',
    members: [EMPTY_MEMBER],
  },
];

/* project details */
const ProjectDetails = ({ task, onChange }) => {
  const [open, setOpen] = useState(false);

  const updateMember = (index, field, value) => {
    const updated = task.members.map((m, i) =>
      i === index ? { ...m, [field]: value } : m
    );
    onChange(task.id, 'members', updated);
  };

  const addMember = () =>
    onChange(task.id, 'members', [...task.members, { ...EMPTY_MEMBER }]);

  const removeMember = (index) =>
    onChange(task.id, 'members', task.members.filter((_, i) => i !== index));

  return (
    <div className="border-t border-gray-100 mt-1">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-3 text-xs font-semibold text-gray-500 hover:text-gray-800 transition-colors"
      >
        <span className="flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          Project Details
        </span>
        <svg
          className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div
        className={`flex flex-col gap-4 overflow-hidden transition-all duration-300 ease-in-out ${
          open ? 'max-h-[600px] opacity-100 pb-4' : 'max-h-0 opacity-0'
        }`}
      >

          {/* Requirements */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-600">Project Requirements</label>
            <textarea
              value={task.requirements}
              onChange={(e) => onChange(task.id, 'requirements', e.target.value)}
              placeholder="List the project requirements..."
              rows={3}
              data-gramm="false"
              data-gramm_editor="false"
              data-enable-grammarly="false"
              className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-300 transition resize-none"
            />
          </div>

          {/* Due Date */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-600">Project Due Date</label>
            <input
              type="date"
              value={task.dueDate}
              onChange={(e) => onChange(task.id, 'dueDate', e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-300 transition"
            />
          </div>

          {/* Team Members */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-gray-600">
                Team Members
                <span className="ml-1.5 bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                  {task.members.length}
                </span>
              </label>
              <button
                onClick={addMember}
                className="flex items-center gap-1 text-xs text-green-600 hover:text-green-800 font-semibold transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                Add
              </button>
            </div>

            {task.members.map((member, index) => (
              <div key={index} className="flex gap-2 items-center">
                <input
                  value={member.name}
                  onChange={(e) => updateMember(index, 'name', e.target.value)}
                  placeholder="Name"
                  className="flex-1 px-2.5 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-300 transition"
                />
                <input
                  value={member.role}
                  onChange={(e) => updateMember(index, 'role', e.target.value)}
                  placeholder="Role"
                  className="flex-1 px-2.5 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                />
                {task.members.length > 1 && (
                  <button
                    onClick={() => removeMember(index)}
                    className="text-red-400 hover:text-red-600 transition-colors shrink-0"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            ))}
          </div>
      </div>
    </div>
  );
};

/* ── Dashboard ── */
const Dashboard = () => {
  const [tasks, setTasks] = useState(SAMPLE_TASKS);
  const [editingTask, setEditingTask] = useState(null);

  const handleFieldChange = (id, field, value) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, [field]: value } : t)));
  };

  const handleDelete = (task) => {
    setTasks((prev) => prev.filter((t) => t.id !== task.id));
  };

  const handleEdit = (task) => setEditingTask({ ...task });

  const handleEditSave = () => {
    setTasks((prev) => prev.map((t) => (t.id === editingTask.id ? editingTask : t)));
    setEditingTask(null);
  };

  const handleEditChange = (e) => {
    setEditingTask({ ...editingTask, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-10">

      {/* Header */}
      <div className="mb-6 mt-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Manage and track all your tasks</p>
      </div>

      {/* Task Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <div key={task.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 p-5 flex flex-col gap-4">
            <TaskCard task={task} onEdit={handleEdit} onDelete={handleDelete} />
            <ProjectDetails task={task} onChange={handleFieldChange} />
          </div>
        ))}
        {tasks.length === 0 && (
          <div className="col-span-3 text-center py-16 text-gray-400 text-sm">
            No tasks yet.
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editingTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 flex flex-col gap-5">

            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                <span className="w-1 h-5 rounded-full bg-gradient-to-b from-green-500 to-blue-500 inline-block" />
                Edit Task
              </h2>
              <button onClick={() => setEditingTask(null)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-600">Task Name</label>
              <input name="title" value={editingTask.title} onChange={handleEditChange}
                className="w-full px-3 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-300 transition" />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-600">Description</label>
              <textarea name="description" value={editingTask.description} onChange={handleEditChange}
                rows={3} data-gramm="false" data-gramm_editor="false" data-enable-grammarly="false"
                className="w-full px-3 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-300 transition resize-none" />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-600">Repository URL</label>
              <input name="repository" value={editingTask.repository} onChange={handleEditChange}
                placeholder="https://github.com/you/project"
                className="w-full px-3 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300 transition" />
            </div>

            <div className="flex gap-3 pt-1">
              <button onClick={() => setEditingTask(null)}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50 transition-colors">
                Cancel
              </button>
              <button onClick={handleEditSave}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md">
                Save Changes
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Dashboard;
