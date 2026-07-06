"use client";

import { useEffect, useState } from "react";

const slides = [
  {
    avatarClass: "newsletter-review-avatar--day-1",
    day: "Day 1",
    headline:
      "Don't Miss That Meeting This Morning, Book A Ride With CitiRide today. We Offer Daily Affordable & Comfortable Rides. Your City, Your Ride.",
    image: "/assets/newsletter_day1.png",
    imageAlt: "CitiRide customer review for day one",
    name: "Ama Okafor",
    quote:
      "As someone who travels frequently, safety is a big deal for me. The live tracking and driver details give me peace of mind every time I book a ride.",
  },
  {
    avatarClass: "newsletter-review-avatar--day-2",
    day: "Day 2",
    headline:
      "Don't let the weather ruin your outfit. Stay cool, dry, and on time. Book a premium CitiRide today.",
    image: "/assets/newsletter_day2.png",
    imageAlt: "CitiRide customer review for day two",
    name: "Chinwe Eze",
    quote:
      "What I love most is how easy it is to get a ride, even during rush hour. I've tried other services before, but this one consistently gets me where I need to be without the stress.",
  },
  {
    avatarClass: "newsletter-review-avatar--day-3",
    day: "Day 3",
    headline:
      "Bags too heavy? Sun too bright? Skip the long walk and chaotic streets. Let us lift the weight off your shoulders.",
    image: "/assets/newsletter_day3.png",
    imageAlt: "CitiRide customer review for day three",
    name: "Aisha Bello",
    quote:
      "I use this app almost everyday for work, and it's been surprisingly reliable. Drivers arrive on time, the rides are comfortable, and I always know exactly what I'm paying before I book.",
  },
];

const SLIDE_INTERVAL_MS = 5200;

export function NewsletterReviewsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, SLIDE_INTERVAL_MS);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <section className="newsletter-section" id="insight">
      <div className="newsletter-shell">
        <h2 className="newsletter-heading">Newsletter &amp; Reviews</h2>

        <div className="newsletter-viewport" aria-live="polite">
          <div
            className="newsletter-track"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {slides.map((slide) => (
              <div className="newsletter-slide" key={slide.day}>
                <article className="newsletter-review-card">
                  <img
                    alt={slide.imageAlt}
                    className="newsletter-review-photo"
                    src={slide.image}
                  />
                  <span className="newsletter-review-quote" aria-hidden="true">
                    &ldquo;
                  </span>
                  <div className="newsletter-review-note">
                    <p>&ldquo;{slide.quote}&rdquo;</p>
                    <div className="newsletter-review-person">
                      <img
                        className={slide.avatarClass}
                        src={slide.image}
                        alt=""
                        aria-hidden="true"
                      />
                      <div>
                        <strong>CitiRide User</strong>
                        <span>{slide.name}</span>
                      </div>
                    </div>
                  </div>
                </article>

                <article className="newsletter-daily-card">
                  <div className="newsletter-daily-card__topline">
                    <span>CitiRide Daily</span>
                    <img
                      className="newsletter-daily-card__icon"
                      src="/assets/Newsletter_icon.svg"
                      alt=""
                      aria-hidden="true"
                    />
                  </div>

                  <h3>{slide.headline}</h3>

                  <div className="newsletter-daily-card__footer">
                    <div>
                      <strong>{slide.day}</strong>
                      <span>Daily Dose</span>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>

        <div className="newsletter-dots" aria-label="Newsletter slides">
          {slides.map((slide, index) => (
            <button
              aria-label={`Show ${slide.day}`}
              aria-current={activeIndex === index ? "true" : undefined}
              className={activeIndex === index ? "is-active" : undefined}
              key={slide.day}
              onClick={() => setActiveIndex(index)}
              type="button"
            />
          ))}
        </div>
      </div>
    </section>
  );
}