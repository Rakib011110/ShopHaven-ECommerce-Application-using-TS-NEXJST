import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-6">
      <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
      <p className="text-2xl font-medium mb-4">Oops! Page Not Found.</p>
      <p className="text-lg mb-6">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="text-blue-500 hover:underline text-lg">
        Go to Home
      </Link>
      <br />
      <Link to="/login" className="text-blue-500 hover:underline text-lg">
        Login
      </Link>
    </div>
  );
};

export default ErrorPage;
