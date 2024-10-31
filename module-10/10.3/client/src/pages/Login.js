import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider'

// Login view
function LoginPage() {
  const { user, logout, isLoggedIn } = useAuth();

  return (
    <div
      id="wrapper"
      className="flex flex-col h-full my-40 items-center justify-center0"
    >
      <div>
        <h2 className="text-2xl text-center mb-8 relative">
          {isLoggedIn ? 'Logged in' : 'Login'}
        </h2>
      </div>
      {isLoggedIn ? (
        <div className="my-20 text-center">
          <h1 className="text-xl mb-6">You are logged in as {user?.email}.</h1>
          <p className="my-4 text-lg">
            Go to your <Link to="/profile">profile</Link>
          </p>

          <div className="mt-16">
            <LogoutButton onClick={logout} />
          </div>
        </div>
      ) : (
        <LoginForm />
      )}
    </div>
  );
}

export const LogoutButton = ({ onClick }) => {
    <button
    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 my-2 mx-2 rounded focus:outline-none focus:shadow-outline"
    type="button"
    onClick={onClick}
  >
    Log out
  </button>
};

// Login form
function LoginForm({ setIsLoggedIn }) {
    const [hasError, setHasError] = useState(false);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [canSubmit, setCanSubmit] = useState(false);
    const forgotPasswordUrl = '#';
    const { login } = useAuth();

    // Login form handler
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          console.log('Attempting login with:', { email, password })
          const user = await login({ email, password });
          console.log('Logged in user:', user);
          if (!user) {
            throw new Error('user is empty');
          }
          setHasError(false);
          console.log('logged in');
      }   catch (err) {
          console.log('login failed: ' + err.message);
          setHasError(true);
      }
    };

    // Enable the submit button on all fields filled
    useEffect(() => {
        if (email?.length && password?.length) {
            setCanSubmit(true);
        } else {
            setCanSubmit(false);
        }
    }, [email, password]);

    return (
        <form
          id="login"
          method="POST"
          action="#"
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/3 min-w-72"
          onSubmit={handleSubmit}
        >
          {hasError && (
            <div className="h-12 warn text-red-500 text-center text-xl">
              There was an error with your login.
            </div>
          )}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className={`shadow appearance-none border ${
                hasError ? 'border-red-600' : ''
              } rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
              id="password"
              type="password"
              placeholder="******************"
              onChange={(e) => setPassword(e.target.value)}
            />
            {hasError && (
              <p className="text-red-500 text-xs italic hidden">
                Please choose a password.
              </p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              className={`${
                canSubmit ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-300'
              } text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
              type="submit"
              disabled={!canSubmit}
            >
              Sign In
            </button>
            <a
              className="inline-block align-baseline font-bold text-sm text-green-500 hover:text-green-600"
              href={forgotPasswordUrl}
            >
              Forgot Password?
            </a>
          </div>
        </form>
      );
}

export default LoginPage;








