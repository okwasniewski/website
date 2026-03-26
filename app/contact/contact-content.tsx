import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const iconLinkClass =
  "text-purple-500 dark:text-purple-500 hover:text-purple-900 dark:hover:text-purple-100 transition-colors";

export default function ContactContent() {
  return (
    <section>
      <h1 className="text-2xl font-semibold text-purple-900 dark:text-purple-100 mb-2">
        Contact
      </h1>
      <p className="text-purple-600 dark:text-purple-400 mb-8">
        Open to interesting conversations about React Native, native development, and open source.
        I&apos;m most active on{" "}
        <Link
          href="https://x.com/o_kwasniewski"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-purple-900 dark:hover:text-purple-100 transition-colors"
        >
          X
        </Link>
        .
      </p>

      <div className="space-y-6">
        <div>
          <h2 className="text-sm font-medium text-purple-500 dark:text-purple-400 uppercase tracking-wide mb-3">
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
          <h2 className="text-sm font-medium text-purple-500 dark:text-purple-400 uppercase tracking-wide mb-3">
            Email
          </h2>
          <Link
            href="mailto:hello@oskarkwasniewski.dev"
            className="text-purple-700 dark:text-purple-300 underline underline-offset-2 hover:text-purple-900 dark:hover:text-purple-100 transition-colors"
          >
            hello@oskarkwasniewski.dev
          </Link>
        </div>
      </div>
    </section>
  );
}
