import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const iconLinkClass = "pixel-icon-link transition-colors";

export default function ContactContent() {
  return (
    <section className="pixel-reveal">
      <h1 className="pixel-title-lg mb-2">Contact</h1>
      <p className="pixel-body mb-8">
        Open to interesting conversations about React Native, native development, and
        open source. I&apos;m most active on{" "}
        <Link
          href="https://x.com/o_kwasniewski"
          target="_blank"
          rel="noopener noreferrer"
          className="pixel-link underline underline-offset-2 transition-colors"
        >
          X
        </Link>
        .
      </p>

      <div className="space-y-6">
        <div>
          <h2 className="pixel-section-title">Social</h2>
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
          <h2 className="pixel-section-title">Email</h2>
          <Link
            href="mailto:hello@oskarniewski.dev"
            className="pixel-link underline underline-offset-2 transition-colors"
          >
            hello@oskarniewski.dev
          </Link>
        </div>
      </div>
    </section>
  );
}
