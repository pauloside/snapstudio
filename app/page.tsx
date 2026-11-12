import Link from "next/link";
import BookingForm from "@/components/booking-form";

const packageData = [
  { name: "The Portrait Edit", tag: "For the individual", price: "₦85,000", desc: "A little time in front of the lens, a lifetime of photographs to keep.", items: ["45-minute studio session", "10 carefully edited images", "Private online gallery", "One outfit change"] },
  { name: "The Story Session", tag: "Most loved", price: "₦150,000", desc: "Room to slow down, connect and tell a fuller story.", items: ["90-minute session", "20 carefully edited images", "Private online gallery", "Two outfit changes", "Favourite-photo selection"], featured: true },
  { name: "The Celebration", tag: "For your big moments", price: "₦280,000", desc: "For milestones, beautiful gatherings and all the people you love.", items: ["Up to 3 hours coverage", "50 carefully edited images", "Private online gallery", "Online delivery and downloads"] }
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <Link className="brand" href="/">snap<span>studio.</span></Link>
        <nav className="nav" aria-label="Main navigation">
          <a href="#packages">Packages</a><a href="#experience">The experience</a><a href="#portfolio">Portfolio</a><a href="#contact">Contact</a>
          <Link className="nav-cta" href="#book">Book a session</Link>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">Photography, with feeling</span>
          <h1>Moments,<br /><em>beautifully</em><br />kept.</h1>
          <p>Honest photographs for the people, places and seasons you never want to forget. Thoughtfully made, carefully finished, yours to keep.</p>
          <div className="hero-actions"><a className="button-primary" href="#book">Let&apos;s make something ↗</a><a className="text-link" href="#portfolio">Explore the work</a></div>
        </div>
        <div className="hero-image" role="img" aria-label="Editorial portrait photography"><span className="hero-note">People · Portraits · Stories</span></div>
      </section>

      <div className="trust-strip"><span><i className="dot" /> Thoughtful sessions</span><span><i className="dot" /> Beautifully edited</span><span><i className="dot" /> Private online galleries</span><span><i className="dot" /> Your memories, always</span></div>

      <section className="section" id="packages">
        <div className="section-heading"><span className="eyebrow">The session menu</span><h2>Good photographs start<br />with a good experience.</h2><p>Choose the session that feels right. Every package includes a relaxed experience and a private gallery to revisit whenever you like.</p></div>
        <div className="packages">{packageData.map((item) => <article className={item.featured ? "package-card featured" : "package-card"} key={item.name}><span className="package-tag">{item.tag}</span><h3>{item.name}</h3><p className="desc">{item.desc}</p><div className="price">{item.price} <small>/ session</small></div><ul>{item.items.map(feature => <li key={feature}>{feature}</li>)}</ul><a className="button-primary" href="#book">Choose this package</a></article>)}</div>
        <p style={{textAlign:"center",fontSize:11,color:"#85847b",marginTop:24}}>Starting prices for Version 1 preview. Final studio pricing and deposit terms to be confirmed.</p>
      </section>

      <section className="split-section" id="experience">
        <div className="split-image" role="img" aria-label="A couple sharing a moment during a photography session" />
        <div className="split-copy"><span className="eyebrow">More than a photoshoot</span><h2>A little less posing. A lot more you.</h2><p>We believe the best photographs happen when you can simply be yourself. We&apos;ll guide you when you need it, give you room when you don&apos;t, and take care of the details from booking to delivery.</p><p>Your finished photographs arrive in a private online gallery. Choose your favourites, download the images you love and share the memories with the people who matter.</p><a className="text-link" href="#book">Plan your session ↗</a></div>
      </section>

      <section className="section">
        <div className="section-heading"><span className="eyebrow">Simple from the start</span><h2>From first hello to forever.</h2><p>A clear, considered process—so you can spend less time organising and more time looking forward to it.</p></div>
        <div className="steps"><article className="step"><div className="step-number">01</div><h3>Choose your session</h3><p>Explore the packages and send us your preferred date. We&apos;ll confirm the details together.</p></article><article className="step"><div className="step-number">02</div><h3>Enjoy the moment</h3><p>Show up, settle in and let us take care of capturing the moments that matter.</p></article><article className="step"><div className="step-number">03</div><h3>Keep your story</h3><p>Receive your private gallery, pick your favourites and download your finished photographs.</p></article></div>
      </section>

      <section className="section gallery-section" id="portfolio">
        <div className="section-heading"><span className="eyebrow" style={{color:"#c2c7a9"}}>A few stories we&apos;ve loved</span><h2>Made to feel like you.</h2><p>A visual direction for the SnapStudio portfolio. Photography shown here is illustrative while the studio&apos;s own work is being added.</p></div>
        <div className="gallery-grid"><div className="gallery-tile" /><div className="gallery-tile" /><div className="gallery-tile" /><div className="gallery-tile" /><div className="gallery-tile" /></div>
      </section>

      <section className="booking-section" id="book">
        <div className="booking-copy"><span className="eyebrow">Your story starts here</span><h2>Let&apos;s make a little magic.</h2><p>Tell us what you have in mind and when you&apos;d love to make it happen. We&apos;ll be in touch to talk through the details.</p><p style={{marginTop:30,fontSize:12}}>Prefer a conversation?<br /><strong>hello@snapstudio.example</strong></p><p style={{fontSize:10,color:"#96948a"}}>Studio location and contact details will be updated before launch.</p></div>
        <BookingForm />
      </section>

      <footer className="site-footer" id="contact"><div className="footer-top"><div><Link className="brand" href="/">snap<span>studio.</span></Link><p>Honest photographs. Beautifully kept memories. A considered experience from first hello to final gallery.</p></div><div className="footer-links"><a href="#packages">Packages</a><a href="#experience">Our approach</a><a href="#portfolio">Portfolio</a><a href="#book">Book a session</a><Link href="/gallery">Client gallery preview</Link><Link href="/studio">Studio preview</Link></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} SnapStudio. All rights reserved.</span><span>Made with care, for the moments that matter.</span></div></footer>
    </main>
  );
}
