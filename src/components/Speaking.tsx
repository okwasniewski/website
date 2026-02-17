import Link from "next/link";

const Speaking = () => (
  <section className="mb-16 pixel-reveal">
    <h2 className="pixel-section-title">
      Speaking
    </h2>
    <p className="pixel-body leading-relaxed">
      I speak at React Native conferences about native development, visionOS, and performance optimization.{" "}
      <Link
        href="/videos"
        className="pixel-link underline underline-offset-2 transition-colors"
      >
        Watch my talks →
      </Link>
    </p>
  </section>
);

export default Speaking;
