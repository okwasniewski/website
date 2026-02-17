import Link from "next/link";
import { FaYoutube } from "react-icons/fa";

type Video = {
  id: string;
  title: string;
  event: string;
  date: string;
  url: string;
  description: string;
};

const conferencesTalks: Video[] = [
  {
    id: "rn-optimization-2025",
    title: "Tips & Tricks From the Ultimate Guide to RN Optimization 2025",
    event: "React Universe Meetup SF",
    date: "2025",
    url: "https://www.youtube.com/watch?v=rINiwWnYrJE",
    description:
      "Practical performance tactics from the Ultimate Guide to React Native Optimization 2025.",
  },
  {
    id: "feel-native",
    title: "Make Your React (Native) App Feel Native",
    event: "React Universe Meetup Wrocław",
    date: "April 2024",
    url: "https://www.youtube.com/watch?v=qT2xZ1S1X8g",
    description:
      "What makes an app feel truly native and how to achieve it in React Native across platforms.",
  },
  {
    id: "visionpro-geekconf",
    title: "React Native Apple Vision Pro",
    event: "The Geek Conf",
    date: "2024",
    url: "https://www.youtube.com/watch?v=WSmf7t5EnDk",
    description:
      "How React Native was adapted for Apple's Vision Pro and building for visionOS.",
  },
  {
    id: "visionpro-ruc",
    title: "React Native ❤️ Apple Vision Pro: Your App in the New Dimension",
    event: "React Universe Conf 2024",
    date: "September 2024",
    url: "https://www.youtube.com/watch?v=rGpVxi6oS68",
    description:
      "Enabling JavaScript-based apps to run natively on Apple Vision Pro.",
  },
];

const podcasts: Video[] = [
  {
    id: "v0-ios",
    title: "Building v0 iOS and Fixing React Native Along the Way",
    event: "React Universe On Air",
    date: "2025",
    url: "https://www.youtube.com/watch?v=rhLBFKlEXPM",
    description:
      "How the v0 mobile app was built with React Native and Expo while achieving a native iOS feel.",
  },
  {
    id: "visionpro-podcast",
    title: "React Native for Apple Vision Pro and visionOS",
    event: "React Universe On Air",
    date: "December 2023",
    url: "https://www.youtube.com/watch?v=RCNi8fToMBA",
    description:
      "Discussion about the experimental journey of bringing React Native to Apple Vision Pro.",
  },
];

const tutorials: Video[] = [
  {
    id: "turbomodules-complete",
    title: "Building React Native TurboModules with Swift - Complete Tutorial",
    event: "YouTube",
    date: "2025",
    url: "https://www.youtube.com/watch?v=cMAgfQ6Fz9U",
    description:
      "Full guide covering project setup, TypeScript spec, Codegen, and bridging Swift to Objective-C.",
  },
  {
    id: "turbomodules-events",
    title: "Building React Native TurboModules with Swift - Event Emitting",
    event: "YouTube",
    date: "2025",
    url: "https://www.youtube.com/watch?v=WArl-7O6e0w",
    description:
      "Implementing event emitting with Swift, ARC, fixing retain cycles, and testing in JavaScript.",
  },
];

function VideoCard({ video }: { video: Video }) {
  return (
    <Link
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block group"
    >
      <article className="pixel-video-card py-4 last:border-b-0">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="pixel-title transition-colors">
              {video.title}
            </h3>
            <p className="pixel-meta mt-1">
              {video.event} · {video.date}
            </p>
            <p className="pixel-body mt-2">
              {video.description}
            </p>
          </div>
          <FaYoutube className="w-5 h-5 pixel-icon group-hover:opacity-100 flex-shrink-0 mt-1" />
        </div>
      </article>
    </Link>
  );
}

function VideoSection({ title, videos }: { title: string; videos: Video[] }) {
  return (
    <div className="mb-10 pixel-reveal">
      <h2 className="pixel-section-title">
        {title}
      </h2>
      <div>
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
}

export default function VideosContent() {
  return (
    <section className="pixel-reveal">
      <h1 className="pixel-title-lg mb-2">
        Videos
      </h1>
      <p className="pixel-body mb-8">
        {conferencesTalks.length} conference talks, {podcasts.length} podcast appearances, {tutorials.length} tutorials — and more coming. Subscribe to my{" "}
        <Link
          href="https://www.youtube.com/@okwasniewski-dev"
          target="_blank"
          rel="noopener noreferrer"
          className="pixel-link underline underline-offset-2 transition-colors"
        >
          YouTube channel
        </Link>{" "}
        for more content.
      </p>

      <VideoSection title="Conference Talks" videos={conferencesTalks} />
      <VideoSection title="Podcasts" videos={podcasts} />
      <VideoSection title="Tutorials" videos={tutorials} />
    </section>
  );
}
