import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const iconLinkClass =
  "text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors";

export default function ContactContent() {
  return (
    <section>
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
        Contact
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Open to interesting conversations about React Native, native development, and open source.
        I&apos;m most active on{" "}
        <Link
          href="https://x.com/o_kwasniewski"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
        >
          X
        </Link>
        .
      </p>

      <div className="space-y-6">
        <div>
          <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
            Social
          </h2>
          <div className="flex gap-5">
            <Link
              href="https://x.com/o_kwasniewski"
              target="_blank"
              rel="noopener noreferrer"
              className={iconLinkClass}
              aria-label="X"
            >
              <FaXTwitter className="w-6 h-6" />
            </Link>
            <Link
              href="https://github.com/okwasniewski"
              target="_blank"
              rel="noopener noreferrer"
              className={iconLinkClass}
              aria-label="GitHub"
            >
              <FaGithub className="w-6 h-6" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/oskar-kwa%C5%9Bniewski-452977207/"
              target="_blank"
              rel="noopener noreferrer"
              className={iconLinkClass}
              aria-label="LinkedIn"
            >
              <FaLinkedin className="w-6 h-6" />
            </Link>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
            Email
          </h2>
          <Link
            href="mailto:hello@oskarkwasniewski.dev"
            className="text-gray-700 dark:text-gray-300 underline underline-offset-2 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          >
            hello@oskarkwasniewski.dev
          </Link>
        </div>
      </div>
    </section>
  );
}
