import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <h2 className="text-4xl font-bold mb-4">404</h2>
      <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
        Oops! Page not found
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Back to Home
      </Link>
    </div>
  );
}
