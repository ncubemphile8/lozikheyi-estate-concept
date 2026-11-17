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
      <section className="type-note"><h2>Explore the design</h2><p>This is an early massing model to demonstrate the interactive 3D experience. Room layout, dimensions, structure, finishes and construction details still need architectural development and professional review.</p><Link href="/#contact">Discuss this house type <ArrowUpRight size={16}/></Link></section>
      <footer><span>VanillaWebz · Interactive architectural concept</span><span>Illustrative model only · Not construction documentation</span></footer>
    </main>
  );
}
