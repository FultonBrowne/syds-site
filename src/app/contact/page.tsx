"use client";

import ImageOverlay, { ImagesData } from "@/components/ImageOverlay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const images: ImagesData[] = [
  {
    id: "1",
    src: "/image1.jpg",
    alt: "Image 1",
  },
  {
    id: "2",
    src: "/image2.jpg",
    alt: "Image 2",
  },
  {
    id: "3",
    src: "/image3.jpg",
    alt: "Image 3",
  },
];

export default function ContactPage() {
  return (
    <main className="flex flex-col min-h-screen justify-center p-4 sm:p-8 md:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col-reverse lg:flex-row justify-between w-full gap-8 lg:gap-4">
        <div className="flex flex-col gap-4 justify-center">
          <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
            Contact me!
          </div>
          <div className="text-base sm:text-lg">
            If you want me to work on a project with you, or if you just want to
            say hi, feel free to reach out!
          </div>
          <div className="flex gap-6 mt-4">
            <a
              href="mailto:your.email@example.com"
              className="text-2xl hover:text-gray-600 transition-colors"
              aria-label="Email"
            >
              <FontAwesomeIcon icon={faEnvelope} />
            </a>
            <a
              href="https://www.instagram.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-gray-600 transition-colors"
              aria-label="Instagram"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a
              href="https://www.linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-gray-600 transition-colors"
              aria-label="LinkedIn"
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          </div>
        </div>
        <div className="flex w-full lg:w-1/2 items-center justify-center">
          <ImageOverlay images={images} />
        </div>
      </div>
    </main>
  );
}
