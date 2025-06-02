import { useUser } from "../context/UserContext";

export default function Navbar() {
  const { user } = useUser();

  return (
    <nav className="flex justify-end items-center p-4 border-b">
      {user ? (
        <div className="flex items-center gap-2">
          <span>Bienvenue {user.firstName}</span>
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-lg text-white">
            {user.firstName?.[0]?.toUpperCase() ?? <UserIcon />}
          </div>
        </div>
      ) : (
        <div className="flex gap-3">
          <a href="/login" className="button">Login</a>
          <a href="/register" className="button">Sign Up</a>
        </div>
      )}
    </nav>
  );
}

function UserIcon() {
  return (
    <svg fill="none" viewBox="0 0 24 24" width={24} height={24}>
      <circle cx="12" cy="8" r="4" fill="#fff"/>
      <rect x="4" y="16" width="16" height="4" rx="2" fill="#fff"/>
    </svg>
  );
}