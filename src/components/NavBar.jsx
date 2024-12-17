import { useUser } from "../lib/context/user";

export default function Navbar() {
  const user = useUser();

  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo / Brand */}
        <a
          href="/"
          className="text-white text-2xl font-bold tracking-wider hover:text-blue-200 transition-colors"
        >
          Budget App
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {user.current ? (
            <>
              <span className="text-white">{user.current.email}</span>
              <button
                type="button"
                onClick={() => user.logout()}
                className="text-white bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition-all"
              >
                Logout
              </button>
            </>
          ) : (
            <a
              href="/login"
              className="text-white hover:text-blue-200 transition-colors"
            >
              Login
            </a>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            className="text-white hover:text-blue-300 focus:outline-none"
            onClick={() =>
              document.getElementById("mobile-menu")?.classList.toggle("hidden")
            }
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className="hidden md:hidden bg-blue-700 px-4 py-2 space-y-2"
      >
        {user.current ? (
          <>
            <span className="block text-white">{user.current.email}</span>
            <button
              type="button"
              onClick={() => user.logout()}
              className="block text-white bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition-all"
            >
              Logout
            </button>
          </>
        ) : (
          <a
            href="/login"
            className="block text-white hover:text-blue-300 transition-colors"
          >
            Login
          </a>
        )}
      </div>
    </nav>
  );
}
