import { AssetImage } from "@/components/AssetImage";
import { CountUpNumber } from "@/components/CountUpNumber";
import { HeroTestimonialCard } from "@/components/HeroTestimonialCard";
import { JoinWaitlistMenu } from "@/components/JoinWaitlistMenu";
import { NewsletterReviewsCarousel } from "@/components/NewsletterReviewsCarousel";
import { NewsletterSubscribeForm } from "@/components/NewsletterSubscribeForm";
import { SiteHeader } from "@/components/SiteHeader";
import { WaitlistForm } from "@/components/WaitlistForm";

const metrics = [
  { label: "Registered Rides", suffix: "+", value: 1000 },
  { label: "Cities", suffix: "+", value: 10 },
  { label: "App Downloads", suffix: "+", value: 1000 },
];

const heroTestimonials = [
  {
    avatar: "/assets/stellapeters.svg",
    name: "Stella Peters",
    quote:
      "Amazing experience, it was nothing short of a reliable and affordable ride",
    rating: "4.8",
    video: "/assets/waitlist-video-3.mp4",
  },
  {
    avatar: "/assets/dorcasnwibe.svg",
    name: "Dorcas Nwibe",
    quote:
      "Great ride, the driver was very professional and the car was clean and comfortable",
    rating: "4.9",
    video: "/assets/waitlist-video-4.mp4",
  },
  {
    avatar: "/assets/ritasimon.svg",
    name: "Rita Simon",
    quote:
      "Best ride ever, the driver was very friendly and he drives safely. I will definitely use this service again",
    rating: "4.8",
    video: "/assets/waitlist-video-2.mp4",
  },
];

const driverHighlights = ["Affordable", "Convenient", "Comfortable"];
const riderHighlights = ["Profitable", "Reliable", "Flexible"];

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="hero-section" id="home">
          <video
            aria-label="CitiRide hero background video"
            autoPlay
            className="hero-video"
            loop
            muted
            playsInline
            poster="/assets/hero-citiride.jpg"
          >
            <source src="/assets/waitlist-video-1.mp4" type="video/mp4" />
          </video>
          <div className="hero-scrim" />
          <div className="hero-shell">
            <div className="hero-copy">
              <h1>Your City. Your Ride</h1>
              <p>
                CitiRide is a technology-driven mobility platform transforming the way people
                <span>access transportation across Nigeria.</span>
              </p>
            </div>

            <div className="hero-lower">
              <div className="hero-stat-stack">
                <div className="metrics-panel" aria-label="CitiRide metrics">
                  {metrics.map((metric) => (
                    <div className="metric" key={metric.label}>
                      <span>{metric.label}</span>
                      <strong><CountUpNumber end={metric.value} suffix={metric.suffix} /></strong>
                    </div>
                  ))}
                </div>
                <div className="hero-service-strip">Ride Hailing Service</div>
              </div>

              <div className="hero-card-row" aria-label="CitiRide video testimonials">
                {heroTestimonials.map((testimonial) => (
                  <HeroTestimonialCard
                    avatar={testimonial.avatar}
                    key={testimonial.name}
                    name={testimonial.name}
                    quote={testimonial.quote}
                    rating={testimonial.rating}
                    video={testimonial.video}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className="services-showcase" id="services">
          <div className="services-showcase__inner">
            <h2 className="services-showcase__heading">Our Services</h2>
            <div className="services-showcase__grid">
              <div className="services-showcase__copy">
                <span className="services-showcase__quote" aria-hidden="true">
                  &ldquo;
                </span>
                <h3>
                  An innovative way of
                  <br />
                  booking your rides
                </h3>
                <p>
                  Our platform allows users to book rides through a mobile
                  application or via USSD codes, ensuring that transportation
                  services remain accessible even to people without smartphones
                  or internet connectivity. CitiRide also features an in-app
                  wallet that enables secure and convenient cashless payments,
                  making it easier for users to pay for rides and manage their
                  transportation expenses.
                </p>
                <p>
                  For drivers and transport operators, CitiRide provides
                  powerful tools to manage bookings, receive ride requests, track
                  earnings, and improve operational efficiency. By digitizing
                  transportation services, we help operators increase their
                  visibility, maximize vehicle utilization, and generate more
                  income.
                </p>
              </div>

              <div className="services-showcase__media">
                <AssetImage
                  alt="CitiRide riders preparing for a trip"
                  className="services-showcase__image services-showcase__image--main"
                  fallbackLabel="Service image"
                  src="/assets/services-main.png"
                />
                <AssetImage
                  alt="CitiRide passenger relaxing beside a ride"
                  className="services-showcase__image services-showcase__image--side"
                  fallbackLabel="Service image"
                  src="/assets/services-side.png"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="about-showcase" id="about">
          <div className="about-showcase__inner">
            <div className="about-showcase__grid">
              <div className="about-showcase__copy">
                <h2 className="about-showcase__heading">About CitiRide</h2>
                <span className="about-showcase__quote" aria-hidden="true">
                  &ldquo;
                </span>
                <h3>
                  Transforming the way people access transportation across
                  Nigeria
                </h3>
                <p>
                  CitiRide is a technology-driven mobility platform transforming
                  the way people access transportation across Nigeria. We
                  provide a seamless, reliable, and inclusive ride-booking
                  experience that connects commuters with driver and transport
                  operators through both digital and offline channels.
                </p>
              </div>

              <div className="about-showcase__collage" aria-label="CitiRide city and ride scenes">
                <AssetImage
                  alt="Busy Nigerian city transportation scene"
                  className="about-showcase__image about-showcase__image--city"
                  fallbackLabel="City image"
                  src="/assets/about_collage1.jpg"
                />
                <AssetImage
                  alt="CitiRide branded vehicle detail"
                  className="about-showcase__image about-showcase__image--ride"
                  fallbackLabel="Ride image"
                  src="/assets/about_collage2.jpg"
                />
                <AssetImage
                  alt="CitiRide driver inside a vehicle"
                  className="about-showcase__image about-showcase__image--driver"
                  fallbackLabel="Driver image"
                  src="/assets/about_collage3.png"
                />
              </div>
            </div>
          </div>
        </section>

        <NewsletterReviewsCarousel />

        <section className="waitlist-section waitlist-section--driver" id="driver-waitlist">
          <div className="waitlist-wrap">
            <h2 className="waitlist-title">Driver Waitlist</h2>
            <div className="waitlist-grid">
              <div className="waitlist-copy">
                <h3>
                  Your City.
                  <span>Your Ride</span>
                </h3>
                <p>
                  Join our waitlist and start earning more with CitiRide. 
                  Receive ride requests, grow your income, and connect with more passengers, 
                  all from one platform.

                </p>
                <JoinWaitlistMenu
                  align="left"
                  className="waitlist-selector"
                  label="Driver Waitlist"
                  variant="compact"
                />
                <WaitlistForm category="Driver" />
              </div>

              <div className="waitlist-visual waitlist-visual--driver">
                <AssetImage
                  alt="CitiRide driver waitlist"
                  className="waitlist-image"
                  fallbackLabel="Driver waitlist"
                  src="/assets/about_collage2.jpg"
                />
                {driverHighlights.map((highlight) => (
                  <span className="floating-tag" key={highlight}>
                    {highlight}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="waitlist-section waitlist-section--rider" id="rider-waitlist">
          <div className="waitlist-wrap">
            <h2 className="waitlist-title">Rider Waitlist</h2>
            <div className="waitlist-grid">
              <div className="waitlist-copy">
                <h3>
                  Your City.
                  <span>Your Ride</span>
                </h3>
                <p>
                  Join our waitlist to experience convenient rides and
                  affordable fares with CitiRide. Book your next ride today.
                </p>
                <JoinWaitlistMenu
                  align="left"
                  className="waitlist-selector"
                  label="Rider Waitlist"
                  variant="compact"
                />
                <WaitlistForm category="Rider" />
              </div>

              <div className="waitlist-visual waitlist-visual--rider">
                <AssetImage
                  alt="CitiRide rider waitlist"
                  className="waitlist-image"
                  fallbackLabel="Rider waitlist"
                  src="/assets/ritasimon.svg"
                />
                {riderHighlights.map((highlight) => (
                  <span className="floating-tag" key={highlight}>
                    {highlight}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="loop-section" id="newsletter">
          <div className="loop-content">
            <h2>Stay in the Loop</h2>
            <p>News, new locations, and exclusive updates.</p>
            <NewsletterSubscribeForm />
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <a className="brand brand--footer" href="#home" aria-label="CitiRide home">
              <img src="/assets/citiride-logo.svg" alt="CitiRide" />
            </a>
            <p>RIDE HAILING SERVICES</p>
            <div className="footer-links" aria-label="Social links">
              <a href="https://tiktok.com/@citi_ride" rel="noreferrer" target="_blank" aria-label="CitiRide on TikTok">
                <img src="/assets/titktok_icon.svg" alt="" aria-hidden="true" />
              </a>
              <a href="https://www.instagram.com/citiridemobility" rel="noreferrer" target="_blank" aria-label="CitiRide on Instagram">
                <img src="/assets/instagram_icon.svg" alt="" aria-hidden="true" />
              </a>
              {/* <a href="https://www.linkedin.com" rel="noreferrer" target="_blank" aria-label="CitiRide on LinkedIn">
                <img src="/assets/linkedin_icon.svg" alt="" aria-hidden="true" />
              </a> */}
            </div>
          </div>
          <p className="copyright">
            &copy; 2026 CITIRIDE MOBILITY NETWORK LTD. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}









