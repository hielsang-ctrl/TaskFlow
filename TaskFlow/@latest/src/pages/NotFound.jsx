import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="w-full max-w-sm mx-auto px-4 pt-24 text-center flex flex-col items-center gap-6">
    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-blue-500">
      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
    <div>
      <h1 className="text-4xl font-bold text-gray-900">404</h1>
      <p className="text-sm text-gray-500 mt-2">Oops — this page doesn't exist.</p>
    </div>
    <Link
      to="/"
      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md"
    >
      Back to Home
    </Link>
  </div>
);

export default NotFound;
