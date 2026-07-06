"use client";

import { ArrowRight, Play } from "lucide-react";
import { useRef, useState } from "react";

type HeroTestimonialCardProps = {
  avatar: string;
  name: string;
  quote: string;
  rating: string;
  video: string;
};

function canHover() {
  if (typeof window === "undefined") {
    return false;
  }

  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

export function HeroTestimonialCard({
  avatar,
  name,
  quote,
  rating,
  video,
}: HeroTestimonialCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  async function playVideo() {
    const media = videoRef.current;

    if (!media) {
      return;
    }

    try {
      await media.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  }

  function stopVideo() {
    const media = videoRef.current;

    if (!media) {
      return;
    }

    media.pause();
    media.currentTime = 0;
    setPlaying(false);
  }

  function handlePointerEnter() {
    if (canHover()) {
      void playVideo();
    }
  }

  function handlePointerLeave() {
    if (canHover()) {
      stopVideo();
    }
  }

  return (
    <article
      className={`hero-testimonial-card ${playing ? "is-playing" : ""}`}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <div className="hero-testimonial-video-frame">
        <video
          aria-label={`${name} testimonial video`}
          className="hero-testimonial-video"
          loop
          muted
          playsInline
          preload="metadata"
          ref={videoRef}
        >
          <source src={video} type="video/mp4" />
        </video>
        <button
          aria-label={`Play ${name} testimonial video`}
          className="hero-testimonial-play"
          onClick={playVideo}
          type="button"
        >
          <Play aria-hidden="true" fill="currentColor" size={18} />
        </button>
      </div>

      <div className="hero-testimonial-rating">
        <span>{rating} Ratings</span>
        <ArrowRight aria-hidden="true" size={14} />
      </div>
      <p className="hero-testimonial-quote">&ldquo;{quote}&rdquo;</p>
      <div className="hero-testimonial-person">
        <img src={avatar} alt="" aria-hidden="true" />
        <strong>{name}</strong>
      </div>
    </article>
  );
}
