import { Link } from 'react-router-dom';

export default function Signup() {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          Create an account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6">
          <input
            type="text"
            placeholder="Full name"
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:ring-1 focus:ring-indigo-600 focus:border-indigo-600"
          />
          <input
            type="email"
            placeholder="Email"
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:ring-1 focus:ring-indigo-600 focus:border-indigo-600"
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:ring-1 focus:ring-indigo-600 focus:border-indigo-600"
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-500"
          >
            Sign up
          </button>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-600 hover:text-indigo-500 font-semibold">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
