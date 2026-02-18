import Image from "next/image";
import Link from "next/link";

const Hero = () => (
  <section className="mb-16 pixel-reveal">
    <div className="flex items-center gap-4 mb-6">
      <Image
        src="/oskar.jpg"
        width={60}
        height={60}
        alt="Oskar Kwaśniewski"
        className="pixel-avatar"
      />
      <div>
        <h1 className="pixel-title-lg">
          Oskar Kwaśniewski
        </h1>
        <p className="pixel-subtitle">
          Senior Software Engineer
        </p>
      </div>
    </div>
    <div className="pixel-body space-y-4">
      <p>
        Building React Native apps at{" "}
        <a
          href="https://www.born.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="pixel-link hover:underline underline-offset-2"
        >
          Born
        </a>
        . Previously at{" "}
        <a
          href="https://callstack.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="pixel-link hover:underline underline-offset-2"
        >
          Callstack
        </a>{" "}
        Open source enthusiast with 100+ merged PRs to React Native Core.
      </p>
      <p>
        Creator of{" "}
        <Link
          href="/portfolio/react-native-visionos"
          className="pixel-link underline underline-offset-2"
        >
          react-native-visionos
        </Link>
        ,{" "}
        <Link
          href="/portfolio/react-native-bottom-tabs"
          className="pixel-link underline underline-offset-2"
        >
          react-native-bottom-tabs
        </Link>
        , and{" "}
        <Link
          href="/portfolio/liquid-glass"
          className="pixel-link underline underline-offset-2"
        >
          Liquid Glass
        </Link>
        . Focused on bridging React Native with native platforms — iOS, Android, visionOS, macOS.
      </p>
      <p>
        When not coding, I enjoy gravel cycling and building side projects.
      </p>
    </div>
  </section>
);

export default Hero;
