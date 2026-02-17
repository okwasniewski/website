import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => (
  <footer className="w-full max-w-[750px] mx-auto px-6 py-8 border-t border-gray-200 dark:border-gray-800">
    <div className="flex flex-row items-center justify-between gap-4 text-sm text-gray-500 dark:text-gray-500">
      <div className="flex gap-5">
        <Link
          href="https://github.com/okwasniewski"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          aria-label="GitHub"
        >
          <FaGithub className="w-5 h-5" />
        </Link>
        <Link
          href="https://www.linkedin.com/in/okwasniewski/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          aria-label="LinkedIn"
        >
          <FaLinkedin className="w-5 h-5" />
        </Link>
        <Link
          href="https://x.com/o_kwasniewski"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          aria-label="X"
        >
          <FaXTwitter className="w-5 h-5" />
        </Link>
      </div>
      <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-500 text-right">
        <p>
          <Link
            href="https://github.com/okwasniewski/website"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          >
            Built with ❤️ and <span className="font-semibold">NextJS</span>
          </Link>
        </p>
        <span>© {new Date().getFullYear()}</span>
      </div>
    </div>
  </footer>
);

export default Footer;
