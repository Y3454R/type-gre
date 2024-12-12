import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="w-64 bg-gray-800 text-white p-6 flex flex-col">
      <h2 className="text-2xl font-bold mb-4">Word Marshal</h2>
      <ul className="flex flex-col space-y-4">
        <li>
          <Link href="/" className="hover:text-blue-400">
            Home
          </Link>
        </li>
        <li>
          <Link href="#" className="hover:text-blue-400">
            Settings
          </Link>
        </li>
        <li>
          <Link href="#" className="hover:text-blue-400">
            Leaderboard
          </Link>
        </li>
        <li>
          <Link href="#" className="hover:text-blue-400">
            About
          </Link>
        </li>
      </ul>
    </div>
  );
}
