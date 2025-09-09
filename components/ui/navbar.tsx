import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="w-full bg-white shadow-md px-6 py-3 flex items-center justify-between">
            <div className="text-2xl font-bold text-green-700">
                Hajj Guide
            </div>
            <ul className="flex space-x-6">
                <li>
                    <Link href="/">
                        <a className="text-gray-700 hover:text-green-700 font-medium">Home</a>
                    </Link>
                </li>
                <li>
                    <Link href="/guide">
                        <a className="text-gray-700 hover:text-green-700 font-medium">Guide</a>
                    </Link>
                </li>
                <li>
                    <Link href="/tips">
                        <a className="text-gray-700 hover:text-green-700 font-medium">Tips</a>
                    </Link>
                </li>
                <li>
                    <Link href="/about">
                        <a className="text-gray-700 hover:text-green-700 font-medium">About</a>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}