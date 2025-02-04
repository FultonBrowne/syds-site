"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export const REQUIRED_IMAGE_COUNT = 3 as const;
export type RequiredImageCount = typeof REQUIRED_IMAGE_COUNT;

export type ImagesData = {
  id: string;
  src: string;
  alt: string;
};

interface ImageOverlayProps {
  images: ImagesData[];
  className?: string;
}

const ImageOverlay = ({ images, className = "" }: ImageOverlayProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [actualSize, setActualSize] = useState<number>(
    typeof window !== "undefined"
      ? document?.getElementById("image-overlay")?.clientWidth || 800
      : 800,
  );

  useEffect(() => {
    const handleResize = () => {
      const newSize =
        document?.getElementById("image-overlay")?.clientWidth || 800;
      setActualSize(newSize);
      setIsMobile(window.innerWidth < 768); // Set mobile breakpoint at 768px
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const mainImageSize = actualSize * 0.5;
  const smallImageSize = actualSize * 0.4;

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
      <div className={`relative ${className} w-full `} id="image-overlay">
        {/* Carousel Navigation */}
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

        {/* Images */}
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
                className="min-w-full h-full flex items-center justify-center aspect-square"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => handleClick(index)}
              className={`w-2 h-2 rounded-full ${
                index === selectedIndex ? "bg-white" : "bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    );
  }

  // Desktop version (original layout)
  return (
    <div
      className={`relative ${className}`}
      id="image-overlay"
      style={{
        width: `${actualSize}px`,
        height: `${actualSize}px`,
      }}
    >
      {images.map((image, index) => (
        <div
          key={image.id}
          className={`absolute transition-all duration-500 ease-in-out cursor-pointer`}
          style={{
            width:
              index === selectedIndex
                ? `${mainImageSize}px`
                : `${smallImageSize}px`,
            ...(index === selectedIndex
              ? {
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 20,
                }
              : index === 1
                ? {
                    right: "10%",
                    top: "10%",
                    opacity: 0.5,
                  }
                : index === 2
                  ? {
                      left: "10%",
                      bottom: "10%",
                      opacity: 0.5,
                    }
                  : { opacity: 0.5 }),
          }}
          onClick={() => handleClick(index)}
        >
          <div className="relative aspect-square bg-white rounded-lg">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover rounded-lg shadow-lg"
              priority={index === 0}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageOverlay;
