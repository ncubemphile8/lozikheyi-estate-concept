"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

const StarterHouse3D = dynamic(() => import("../../../components/StarterHouse3D"), { ssr: false });

export default function TypeAPage() {
  return (
    <main className="type-page">
      <header className="type-header"><Link href="/#homes"><ArrowLeft size={16}/> Back to house collection</Link><span>LOZIKHEYi ESTATE · CONCEPT</span></header>
      <section className="type-intro"><p className="eyebrow">HOUSE COLLECTION · TYPE A</p><h1>The <em>Starter.</em></h1><p>A compact contemporary home concept designed around practical everyday living.</p></section>
      <StarterHouse3D/>
      <section className="type-specs"><div><small>CONCEPT FLOOR AREA</small><b>75 m²</b></div><div><small>BEDROOMS</small><b>2</b></div><div><small>BATHROOMS</small><b>1</b></div><div><small>STYLE</small><b>Modern bungalow</b></div></section>

      <section className="floorplan-section">
        <div className="floorplan-heading"><p className="eyebrow">CONCEPTUAL SPACE PLANNING</p><h2>A practical <em>two-bedroom layout.</em></h2><p>Illustrative arrangement for the Type A concept. Dimensions and room areas require architectural verification.</p></div>
        <div className="floorplan-board">
          <svg viewBox="0 0 900 590" role="img" aria-label="Conceptual two-bedroom house floor plan">
            <rect x="70" y="55" width="760" height="470" fill="#eee9dd" stroke="#252b2a" strokeWidth="15"/>
            <rect x="85" y="70" width="370" height="270" fill="#d8d2c4" stroke="#444b43" strokeWidth="7"/>
            <rect x="455" y="70" width="205" height="160" fill="#d1c7b4" stroke="#444b43" strokeWidth="7"/>
            <rect x="660" y="70" width="155" height="160" fill="#d9d2c5" stroke="#444b43" strokeWidth="7"/>
            <rect x="455" y="230" width="205" height="295" fill="#d8d2c4" stroke="#444b43" strokeWidth="7"/>
            <rect x="660" y="230" width="155" height="160" fill="#c9d0c1" stroke="#444b43" strokeWidth="7"/>
            <rect x="660" y="390" width="155" height="135" fill="#d1c7b4" stroke="#444b43" strokeWidth="7"/>
            <rect x="85" y="340" width="370" height="185" fill="#d1c7b4" stroke="#444b43" strokeWidth="7"/>
            <g fill="#333a32" fontFamily="DM Sans, sans-serif" textAnchor="middle">
              <text x="270" y="180" fontSize="23" fontWeight="700">LOUNGE + DINING</text><text x="270" y="210" fontSize="14">Open-plan living</text>
              <text x="555" y="140" fontSize="19" fontWeight="700">KITCHEN</text><text x="555" y="165" fontSize="13">Open connection</text>
              <text x="737" y="140" fontSize="17" fontWeight="700">BATH</text><text x="737" y="163" fontSize="12">Shared</text>
              <text x="555" y="365" fontSize="19" fontWeight="700">BEDROOM 1</text><text x="555" y="390" fontSize="13">Main bedroom</text>
              <text x="737" y="300" fontSize="16" fontWeight="700">PASSAGE</text>
              <text x="737" y="455" fontSize="16" fontWeight="700">BEDROOM 2</text>
              <text x="270" y="425" fontSize="20" fontWeight="700">FRONT VERANDAH</text><text x="270" y="450" fontSize="13">Covered outdoor space</text>
            </g>
            <g stroke="#536b70" strokeWidth="11"><path d="M160 55h105M300 55h85M485 55h80M685 55h75M70 150v90M830 275v75M150 525h105M300 525h80"/></g>
            <g stroke="#a78a59" strokeWidth="4" fill="none"><path d="M440 340v-55a55 55 0 0 1 55 55M455 225h-48a48 48 0 0 0 48 48M660 230h-45a45 45 0 0 0 45 45"/></g>
            <g fill="#6c765c" fontFamily="DM Sans, sans-serif" fontSize="12"><text x="70" y="35">FRONT / GARDEN</text><text x="830" y="550" textAnchor="end">CONCEPT PLAN · NOT TO SCALE</text></g>
          </svg>
          <aside><span>75 m²</span><b>Indicative internal floor area</b><p>2 bedrooms · 1 shared bathroom · open-plan living · kitchen · covered entrance verandah</p></aside>
        </div>
      </section>
      <section className="type-note"><h2>Explore the design</h2><p>This is an early massing model to demonstrate the interactive 3D experience. Room layout, dimensions, structure, finishes and construction details still need architectural development and professional review.</p><Link href="/#contact">Discuss this house type <ArrowUpRight size={16}/></Link></section>
      <footer><span>VanillaWebz · Interactive architectural concept</span><span>Illustrative model only · Not construction documentation</span></footer>
    </main>
  );
}
