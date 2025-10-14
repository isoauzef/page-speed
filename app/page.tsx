import Image from "next/image";

type Feature = {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
};

const features: Feature[] = [
  {
    title: "Routine home refresh",
    description: "Weekly or bi-weekly visits that dust, vacuum, mop, and reset every lived-in space with eco-friendly care.",
    image: "/cleaning.webp",
    imageAlt: "Cleaner fluffing pillows in a bright living room"
  },
  {
    title: "Deep clean detailing",
    description: "Quarterly resets that tackle baseboards, grout lines, appliances, and hard-to-reach corners for a true reset.",
    image: "/gloves.webp",
    imageAlt: "Close-up of gloves scrubbing a sink with suds"
  },
  {
    title: "Move-in ready",
    description: "Top-to-bottom sanitization of empty homes and condos so you can unpack into a spotless, scent-free space.",
    image: "/automobile.webp",
    imageAlt: "Moving truck parked outside a freshly cleaned home"
  },
  {
    title: "Workspace sparkle",
    description: "After-hours office cleans covering desks, shared surfaces, conference rooms, and kitchenette restocks.",
    image: "/soap-dispenser.webp",
    imageAlt: "Soap dispenser with cleaning supplies on an office counter"
  }
];

export default function Home() {
  return (
    <main className="landing">
      <HeroSection />
      <FeatureSection />
      <ContactSection />
      <Footer />
    </main>
  );
}

function HeroSection() {
  return (
    <section className="section hero" id="about">
  <div className="hero__intro">
        <span className="hero__stamp">BrightSweep Cleaning Co.</span>
        <h1 className="hero__headline">Your home, hotel clean in under 90 minutes.</h1>
        <p className="hero__subhead">
          Premium residential and office cleanings powered by eco-friendly products, meticulous detail, and a team that respects your
          space.
        </p>
        <div className="hero__cta">
          <a href="#contact" className="button button--primary">
            Book a session
          </a>
          <a href="#features" className="button button--secondary">
            View services
          </a>
        </div>
      </div>
      <div className="hero__media">
        <div className="hero__image-frame">
          <Image
            src="/cleaning.webp"
            alt="Professional cleaner preparing eco-friendly supplies"
            width={640}
            height={640}
            priority
            fetchPriority="high"
            className="hero__image"
            sizes="(min-width: 960px) 32rem, (min-width: 640px) 24rem, 18rem"
          />
        </div>
      </div>
    </section>
  );
}

function FeatureSection() {
  return (
    <section id="features" className="section features">
      <div className="section__heading animate-rise" style={{ animationDelay: "0.12s" }}>
        <h2>Services tailored to your schedule.</h2>
        <p>Flexible plans with the same meticulous finish—whether you need a weekday reset or a move-in miracle.</p>
      </div>
      <div className="features__grid">
        {features.map((feature, index) => (
          <article
            className="feature-card animate-rise"
            key={feature.title}
            style={{ animationDelay: `${0.15 + index * 0.08}s` }}
          >
            <div className="feature-card__media">
              <Image
                src={feature.image}
                alt={feature.imageAlt}
                width={480}
                height={320}
                loading="lazy"
                className="feature-card__image"
                sizes="(min-width: 960px) 24rem, (min-width: 640px) 18rem, 100vw"
              />
            </div>
            <div className="feature-card__body">
              <h3 className="feature-card__title">{feature.title}</h3>
              <p className="feature-card__copy">{feature.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="section contact">
      <div className="contact__halo contact__halo--left" aria-hidden />
      <div className="contact__halo contact__halo--right" aria-hidden />
      <div className="contact__inner">
        <div className="contact__copy animate-rise" style={{ animationDelay: "0.15s" }}>
          <h2 className="hero__headline">Get a tailored cleaning plan today.</h2>
          <p className="hero__subhead">
            Share a few details and our concierge will send a custom quote and availability within one business hour.
          </p>
          <dl className="contact__facts">
            <div className="contact__fact">
              <dt>Service window</dt>
              <dd>7 days a week, 7 am – 8 pm</dd>
            </div>
            <div className="contact__fact">
              <dt>Response time</dt>
              <dd>Usually under 30 minutes</dd>
            </div>
          </dl>
        </div>
        <form method="post" action="/api/contact" className="contact__form animate-rise" style={{ animationDelay: "0.22s" }}>
          <label className="field">
            <span className="field__label">Name</span>
            <input
              className="field__control"
              name="name"
              type="text"
              required
              placeholder="Avery Johnson"
              aria-label="Name"
            />
          </label>
          <label className="field">
            <span className="field__label">Email</span>
            <input
              className="field__control"
              name="email"
              type="email"
              required
              placeholder="you@home.com"
              aria-label="Email"
            />
          </label>
          <label className="field">
            <span className="field__label">Cleaning details</span>
            <textarea
              className="field__control"
              name="message"
              rows={4}
              placeholder="Tell us about your space, pets, and preferred schedule."
              aria-label="Cleaning details"
            />
          </label>
          <button type="submit" className="button button--primary">
            Request my quote
          </button>
          <p className="field__helper">We respect your inbox. You’ll only hear from us about your booking.</p>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner animate-rise" style={{ animationDelay: "0.15s" }}>
        <p>&copy; {new Date().getFullYear()} BrightSweep Cleaning Co. All rights reserved.</p>
        <nav className="footer__links">
          <a href="#features">Services</a>
          <a href="#contact">Get a quote</a>
          <a href="mailto:hello@brightsweep.co">Support</a>
        </nav>
      </div>
    </footer>
  );
}

