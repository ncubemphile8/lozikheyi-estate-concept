"use client";

import { useState } from "react";
import MasterplanExplorer from "../components/MasterplanExplorer";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronDown, Compass, Download, Filter, House, Layers3, Map, MapPin, Menu, Play, ShieldCheck, Trees, Waves, X, Zap, ZoomIn, ZoomOut } from "lucide-react";

const homes = [
  { type: "TYPE A", name: "The Starter", detail: "2 Bed  ·  1 Bath", area: "75 m²", note: "Thoughtfully compact", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=85" },
  { type: "TYPE B", name: "The Family", detail: "3 Bed  ·  2 Bath", area: "120 m²", note: "Room to grow", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=85" },
  { type: "TYPE C", name: "The Executive", detail: "3 Bed  ·  2.5 Bath", area: "165 m²", note: "Modern everyday luxury", image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=85" },
  { type: "TYPE D", name: "The Signature", detail: "4 Bed  ·  3.5 Bath", area: "240 m²", note: "A statement in space", image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=900&q=85" },
];


export default function HomePage() {
  const [view, setView] = useState<"3D View" | "2D Map" | "Street View">("2D Map");
  const [menuOpen, setMenuOpen] = useState(false);
  const [zoom, setZoom] = useState(1);

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#home" aria-label="Lozikheyi Estate home">
          <span className="brand-mark"><svg viewBox="0 0 72 56" aria-hidden="true"><path d="M5 27 36 5l31 22M14 29v21h44V29M25 50V36l11-8 11 8v14" /></svg></span>
          <span className="brand-name">LOZIKHEYi<span>ESTATE <i>·</i> BULAWAYO</span></span>
        </a>
        <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X/> : <Menu/>}</button>
        <nav className={menuOpen ? "nav nav-open" : "nav"}>
          <a className="active" href="#home" onClick={() => setMenuOpen(false)}>Home</a><a href="#about" onClick={() => setMenuOpen(false)}>About</a><a href="#masterplan" onClick={() => setMenuOpen(false)}>Masterplan</a><a href="#homes" onClick={() => setMenuOpen(false)}>House Designs</a><a href="#investment" onClick={() => setMenuOpen(false)}>Investment</a><a href="#gallery" onClick={() => setMenuOpen(false)}>Gallery</a><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </nav>
        <a className="enquire" href="#contact"><span>◉</span> Enquire Now <ArrowUpRight size={15}/></a>
      </header>

      <section className="hero" id="home">
        <div className="hero-image" />
        <div className="hero-shade" />
        <div className="hero-copy">
          <p className="eyebrow"><span/> RESIDENTIAL DEVELOPMENT CONCEPT</p>
          <h1>Find your place<br/><em>to belong.</em></h1>
          <p className="hero-sub">A considered vision for modern living in<br className="desktop-break"/> Lower Rangemore, Bulawayo.</p>
          <p className="hero-desc">Explore a residential community concept shaped around thoughtful homes, connected spaces and a sense of place.</p>
          <div className="hero-facts">
            <div><MapPin/><span><b>Lower Rangemore</b><small>Bulawayo, Zimbabwe</small></span></div>
            <div><Layers3/><span><b>216–526 m²</b><small>Illustrative stand range</small></span></div>
            <div><House/><span><b>4 house types</b><small>Concept collection</small></span></div>
          </div>
          <div className="hero-actions"><a className="gold-button" href="#masterplan">Explore masterplan <ArrowRight size={17}/></a><a className="outline-button" href="#homes"><Play size={15}/> Discover house designs</a></div>
        </div>
        <aside className="availability">
          <div className="availability-title"><Layers3 size={19}/> Stand availability <span>CONCEPT</span></div>
          <button onClick={() => document.getElementById("masterplan")?.scrollIntoView({behavior:"smooth"})><i className="dot available"/>Available <b>Sample</b></button>
          <button onClick={() => document.getElementById("masterplan")?.scrollIntoView({behavior:"smooth"})><i className="dot reserved"/>Reserved <b>Sample</b></button>
          <button onClick={() => document.getElementById("masterplan")?.scrollIntoView({behavior:"smooth"})><i className="dot sold"/>Sold <b>Sample</b></button>
          <div className="availability-divider"/>
          <p><Layers3/> Interactive masterplan</p><p><House/> House design collection</p><p><Download/> Brochure concept</p>
          <small>All statuses are illustrative.</small>
        </aside>
        <div className="hero-controls"><button className={view === "3D View" ? "selected" : ""} onClick={() => setView("3D View")}><Layers3/> 3D View</button><button className={view === "2D Map" ? "selected" : ""} onClick={() => setView("2D Map")}><Map/> 2D Map</button><button className={view === "Street View" ? "selected" : ""} onClick={() => setView("Street View")}><Compass/> Street View</button><span className="view-note">{view === "Street View" ? "Street-view concept" : view === "2D Map" ? "Plan view concept" : "Aerial concept view"}</span></div>
        <div className="hero-zoom"><button onClick={() => setZoom(Math.max(.85, zoom-.1))}><ZoomOut/></button><button onClick={() => setZoom(Math.min(1.25, zoom+.1))}><ZoomIn/></button></div>
        <div className="hero-caption">VISUAL CONCEPT · NOT AN APPROVED ESTATE RENDER</div>
      </section>

      <section className="homes-strip" id="homes">
        <div className="homes-intro"><p className="eyebrow">DESIGNED FOR DIFFERENT LIVES</p><h2>Explore our<br/><em>house designs.</em></h2><p>Four conceptual home types, from considered essentials to spacious contemporary living.</p><a href="#contact">Discuss a house type <ArrowUpRight size={15}/></a></div>
        {homes.map((home, i) => <article className="home-card" key={home.type}><div className="home-image" style={{backgroundImage: `url("${home.image}")`}}><span>{home.type}</span><button aria-label={`Explore ${home.name}`} onClick={() => { window.location.href = `/homes/type-${String.fromCharCode(97+i)}`; }}><ArrowUpRight/></button></div><div className="home-card-info"><div><h3>{home.name}</h3><p>{home.detail} <span>·</span> {home.area}</p></div><small>{home.note}</small></div></article>)}
      </section>

      <section className="benefits" id="about">
        <div><ShieldCheck/><span><b>Considered security</b><small>A vision for peace of mind</small></span></div><div><Waves/><span><b>Connected services</b><small>Infrastructure information</small></span></div><div><Zap/><span><b>Everyday convenience</b><small>Thoughtful estate planning</small></span></div><div><Trees/><span><b>Green open spaces</b><small>Room to breathe and connect</small></span></div>
      </section>

      <section className="masterplan-section" id="masterplan">
        <div className="section-heading"><div><p className="eyebrow">EXPLORE THE DEVELOPMENT</p><h2>A closer look at <em>the plan.</em></h2><p>Select a sample plot to preview how an interactive estate explorer could work.</p></div><div className="concept-tag">DEMONSTRATION DATA ONLY</div></div>
        <MasterplanExplorer />
      </section>

      <section className="investment" id="investment"><div><p className="eyebrow">A PLACE TO CALL YOUR OWN</p><h2>Make room for<br/><em>what comes next.</em></h2><p>Explore the concept, discover the home collection and speak with the team about official development information.</p><a className="gold-button" href="#contact">Start a conversation <ArrowRight size={16}/></a></div><div className="investment-image"/></section>
      <section className="contact" id="contact"><p className="eyebrow">LET'S TALK</p><h2>Your next chapter<br/><em>starts here.</em></h2><p>This demonstration is ready to be adapted with official estate details, approved plans and the sales team's contact information.</p><a className="outline-button" href="mailto:hello@vanillawebz.co.za?subject=Lozikheyi%20Estate%20enquiry">Request information <ArrowUpRight size={16}/></a></section>
      <footer><a className="brand footer-brand" href="#home"><span className="brand-mark"><svg viewBox="0 0 72 56"><path d="M5 27 36 5l31 22M14 29v21h44V29M25 50V36l11-8 11 8v14"/></svg></span><span className="brand-name">LOZIKHEYi<span>ESTATE · BULAWAYO</span></span></a><p>Concept experience by <b>VanillaWebz</b></p><small>Independent demonstration · Not an official estate website</small><a href="#home" className="back-top">Back to top ↑</a></footer>
    </main>
  );
}
