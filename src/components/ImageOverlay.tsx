"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import { useEffect, useState } from "react";

export const REQUIRED_IMAGE_COUNT = 3 as const;
export type RequiredImageCount = typeof REQUIRED_IMAGE_COUNT;

export type ImagesData = {
  id: string;
  src: string | StaticImageData;
  alt: string;
};

interface ImageOverlayProps {
  images: ImagesData[];
  className?: string;
}

const ImageOverlay = ({ images, className = "" }: ImageOverlayProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (images.length !== 3) {
    throw new Error("ImageOverlay component requires exactly 3 images");
  }

  const handleClick = (index: number) => {
    setSelectedIndex(index);
  };

  const nextSlide = () => {
    setSelectedIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (isMobile) {
    return (
      <div
        className={`relative w-full aspect-square ${className}`}
        id="image-overlay"
      >
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-30 bg-white/80 p-2 rounded-full shadow-md"
          aria-label="Previous image"
        >
          <ArrowLeft className="h-6 w-6 text-gray-800" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-30 bg-white/80 p-2 rounded-full shadow-md"
          aria-label="Next image"
        >
          <ArrowRight className="h-6 w-6 text-gray-800" />
        </button>

        <div className="relative w-full h-full overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out h-full"
            style={{
              transform: `translateX(-${selectedIndex * 100}%)`,
            }}
          >
            {images.map((image, index) => (
              <div
                key={image.id}
                className="min-w-full h-full relative aspect-square"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>
        </div>

        {/* <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => handleClick(index)}
              className={`w-3 h-3 rounded-full ${
                index === selectedIndex ? "bg-white" : "bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div> */}
      </div>
    );
  }

  // Desktop version
  const previousIndex = (selectedIndex - 1 + images.length) % images.length;
  const nextIndex = (selectedIndex + 1) % images.length;

  return (
    <div
      className={`relative aspect-square w-full max-w-[800px] ${className}`}
      id="image-overlay"
    >
      {images.map((image, index) => {
        let positionClass = "";
        let sizeClass = "";
        let zIndexClass = "";

        if (index === selectedIndex) {
          positionClass = "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2";
          sizeClass = "w-1/2";
          zIndexClass = "z-20"; // Main image on top
        } else if (index === previousIndex) {
          positionClass = "left-[10%] top-[10%]";
          sizeClass = "w-2/5";
          zIndexClass = "z-10"; // Secondary images below
        } else if (index === nextIndex) {
          positionClass = "right-[10%] bottom-[10%]";
          sizeClass = "w-2/5";
          zIndexClass = "z-10"; // Secondary images below
        }

        return (
          <div
            key={image.id}
            className={`absolute transition-all duration-500 ease-in-out cursor-pointer ${positionClass} ${sizeClass} ${zIndexClass}`}
            onClick={() => handleClick(index)}
          >
            <div className="relative aspect-square rounded-lg bg-white">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                loading="lazy"
                className={`object-cover rounded-lg shadow-lg ${
                  index !== selectedIndex ? "opacity-50" : ""
                }`}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRojHyAiIygnLSYxMC0sLTIxP0BOT09OP0E5PkpLUFNWWldaYVthZGhqc2diW2f/2wBDARUXFyMeIBshIVshZS8lL2VlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWX/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ImageOverlay;
