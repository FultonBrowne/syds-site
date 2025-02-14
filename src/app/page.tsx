"use client";

import ImageOverlay, { ImagesData } from "@/components/ImageOverlay";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

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

export default function Home() {
  const router = useRouter();
  return (
    <main className="flex flex-col min-h-screen justify-center p-4 sm:p-8 md:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col-reverse lg:flex-row justify-between w-full gap-8 lg:gap-4">
        <div className="flex flex-col gap-4 justify-center">
          <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
            Hi I{"'"}m Syd
          </div>
          <div className="text-base sm:text-lg">
            A stage manager, designer, and technician at Samford University
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              className="w-full sm:w-auto"
              onClick={() => {
                router.push("/projects");
              }}
            >
              Explore my projects
            </Button>
            <Button
              className="w-full sm:w-auto"
              variant={"secondary"}
              onClick={() => {
                router.push("/about");
              }}
            >
              More about me
            </Button>
          </div>
        </div>
        <div className="flex w-full lg:w-1/2 items-center justify-center">
          <ImageOverlay images={images} />
        </div>
      </div>
    </main>
  );
}
