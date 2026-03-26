import Image from "next/image";
import Link from "next/link";

const Hero = () => (
  <section className="mb-16">
    <div className="flex items-center gap-4 mb-6">
      <Image
        src="/oskar.jpg"
        width={60}
        height={60}
        alt="Oskar Kwaśniewski"
        className="rounded-full"
      />
      <div>
        <h1 className="text-2xl font-semibold text-purple-900 dark:text-purple-100">
          Oskar Kwaśniewski
        </h1>
        <p className="text-purple-600 dark:text-purple-400 font-mono">
          Senior Software Engineer
        </p>
      </div>
    </div>
    <div className="text-purple-700 dark:text-purple-300 leading-relaxed space-y-4">
      <p>
        Building React Native apps at{" "}
        <a
          href="https://www.born.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-purple-900 dark:hover:text-purple-100"
        >
          Born
        </a>
        . Previously at{" "}
        <a
          href="https://callstack.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-purple-900 dark:hover:text-purple-100"
        >
          Callstack
        </a>{" "}
        Open source enthusiast with 100+ merged PRs to React Native Core.
      </p>
      <p>
        Creator of{" "}
        <Link href="/portfolio/react-native-visionos" className="underline underline-offset-2 hover:text-purple-900 dark:hover:text-purple-100">
          react-native-visionos
        </Link>
        ,{" "}
        <Link href="/portfolio/react-native-bottom-tabs" className="underline underline-offset-2 hover:text-purple-900 dark:hover:text-purple-100">
          react-native-bottom-tabs
        </Link>
        , and{" "}
        <Link href="/portfolio/liquid-glass" className="underline underline-offset-2 hover:text-purple-900 dark:hover:text-purple-100">
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
