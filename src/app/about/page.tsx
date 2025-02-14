"use client";

import ImageOverlay, { ImagesData } from "@/components/ImageOverlay";

const images: ImagesData[] = [
  {
    id: "1",
    src: "/about1.jpg",
    alt: "Image 1",
  },
  {
    id: "2",
    src: "/about2.jpg",
    alt: "Image 2",
  },
  {
    id: "3",
    src: "/about3.jpg",
    alt: "Image 3",
  },
];

export default function About() {
  return (
    <main className="flex flex-col min-h-screen justify-center p-4 sm:p-8 md:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col-reverse lg:flex-row justify-between w-full gap-8 lg:gap-4">
        <div className="flex flex-col gap-4 justify-center">
          <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
            More About me
          </div>
          <div className="text-base sm:text-lg">
            I love dogs, art, video games, and theater (obviously). I am
            currently pursuing a degree in theater production design and
            technology, but I have been a technician since 2018.
          </div>
        </div>
        <div className="flex w-full lg:w-1/2 items-center justify-center">
          <ImageOverlay images={images} />
        </div>
      </div>
    </main>
  );
}
