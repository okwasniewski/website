import Link from "next/link";

const Header = () => (
  <header className="w-full max-w-[750px] mx-auto px-6 py-6 sm:py-8">
    <nav className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <Link
        href="/"
        className="text-gray-900 dark:text-gray-100 hover:opacity-70 transition-opacity font-bold"
      >
        okwasniewski
      </Link>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-gray-600 dark:text-gray-400 text-sm sm:justify-end sm:gap-6">
        <Link
          href="/blog"
          className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
        >
          blog
        </Link>
        <Link
          href="/portfolio"
          className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
        >
          portfolio
        </Link>
        <Link
          href="/videos"
          className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
        >
          videos
        </Link>
        <Link
          href="/contact"
          className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
        >
          contact
        </Link>
      </div>
    </nav>
  </header>
);

export default Header;
