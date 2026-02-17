import Link from "next/link";

const Header = () => (
  <header className="w-full max-w-[860px] mx-auto px-6 pt-8">
    <nav className="pixel-shell px-4 py-3 flex items-center justify-between">
      <Link
        href="/"
        className="pixel-brand pixel-link transition-opacity hover:opacity-80"
      >
        okwasniewski
      </Link>
      <div className="flex gap-3 sm:gap-6">
        <Link
          href="/blog"
          className="pixel-nav-link transition-colors"
        >
          blog
        </Link>
        <Link
          href="/portfolio"
          className="pixel-nav-link transition-colors"
        >
          portfolio
        </Link>
        <Link
          href="/videos"
          className="pixel-nav-link transition-colors"
        >
          videos
        </Link>
        <Link
          href="/contact"
          className="pixel-nav-link transition-colors"
        >
          contact
        </Link>
      </div>
    </nav>
  </header>
);

export default Header;
