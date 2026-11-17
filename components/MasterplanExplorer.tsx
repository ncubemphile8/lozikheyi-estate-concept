"use client";

import { useMemo, useState } from "react";
import { Compass, Filter, Layers3, Minus, Plus, RotateCcw } from "lucide-react";

type Status = "Available" | "Reserved" | "Sold";
type Plot = { id: string; status: Status; size: number; points: string };

const plots: Plot[] = [
  { id: "A01", status: "Available", size: 300, points: "105,105 205,88 225,160 125,180" },
  { id: "A02", status: "Available", size: 320, points: "215,86 315,72 335,145 235,160" },
  { id: "A03", status: "Reserved", size: 280, points: "345,70 445,62 458,133 360,145" },
  { id: "B01", status: "Available", size: 350, points: "470,62 575,68 565,142 465,133" },
  { id: "B02", status: "Sold", size: 310, points: "590,72 695,88 675,160 575,145" },
  { id: "B03", status: "Available", size: 400, points: "710,91 810,112 780,185 685,162" },
  { id: "C01", status: "Reserved", size: 450, points: "110,345 220,325 245,405 130,430" },
  { id: "C02", status: "Available", size: 526, points: "245,320 365,300 385,380 270,405" },
  { id: "C03", status: "Available", size: 216, points: "400,295 510,285 525,360 415,380" },
  { id: "C04", status: "Sold", size: 275, points: "545,285 655,300 635,380 530,360" },
];

const colors: Record<Status, string> = { Available: "#9acb4a", Reserved: "#d8a63d", Sold: "#d95b50" };

export default function MasterplanExplorer() {
  const [filter, setFilter] = useState<"All" | Status>("All");
  const [selected, setSelected] = useState<Plot | null>(null);
  const [zoom, setZoom] = useState(1);
  const visible = useMemo(() => plots.filter(p => filter === "All" || p.status === filter), [filter]);

  return (
    <div className="masterplan-layout">
      <div className="plan-canvas plan-svg-canvas">
        <div className="plan-map-toolbar">
          <span><Layers3 size={14}/> CONCEPT MASTERPLAN</span>
          <div><button aria-label="Zoom out" onClick={() => setZoom(z => Math.max(.8, +(z - .1).toFixed(1)))}><Minus size={14}/></button><button aria-label="Zoom in" onClick={() => setZoom(z => Math.min(1.5, +(z + .1).toFixed(1)))}><Plus size={14}/></button><button aria-label="Reset zoom" onClick={() => setZoom(1)}><RotateCcw size={13}/></button></div>
        </div>
        <div className="plan-svg-viewport">
          <svg viewBox="0 0 900 500" role="img" aria-label="Illustrative estate masterplan with selectable plots" style={{ transform: `scale(${zoom})` }}>
            <defs><pattern id="grass" width="34" height="34" patternUnits="userSpaceOnUse"><circle cx="4" cy="8" r="1" fill="#a1ad7c" opacity=".22"/><circle cx="25" cy="23" r="1.3" fill="#a1ad7c" opacity=".2"/></pattern></defs>
            <rect width="900" height="500" fill="#40533e"/><rect width="900" height="500" fill="url(#grass)"/>
            <path d="M-20 235 C180 205 280 250 430 220 S700 205 930 250" fill="none" stroke="#858879" strokeWidth="72"/>
            <path d="M-20 235 C180 205 280 250 430 220 S700 205 930 250" fill="none" stroke="#c5c1a9" strokeWidth="60"/>
            <path d="M430 -20 L485 520" stroke="#858879" strokeWidth="55"/><path d="M430 -20 L485 520" stroke="#c5c1a9" strokeWidth="44"/>
            <path d="M55 455 Q100 390 160 440 T280 455" fill="none" stroke="#7e9561" strokeWidth="48" strokeLinecap="round"/>
            <path d="M700 25 Q770 0 840 55" fill="none" stroke="#7e9561" strokeWidth="45" strokeLinecap="round"/>
            {visible.map(plot => <g key={plot.id} onClick={() => setSelected(plot)} role="button" tabIndex={0} aria-label={`Select plot ${plot.id}`} onKeyDown={e => { if (e.key === "Enter" || e.key === " ") setSelected(plot); }}>
              <polygon points={plot.points} fill={colors[plot.status]} fillOpacity={selected?.id === plot.id ? .95 : .76} stroke={selected?.id === plot.id ? "#fff3c5" : "#e9e4cf"} strokeWidth={selected?.id === plot.id ? 5 : 2} className="plan-plot-shape"/>
              <text x={plot.id.startsWith("A") ? Number(plot.points.split(" ")[0].split(",")[0]) + 48 : Number(plot.points.split(" ")[0].split(",")[0]) + 52} y={Number(plot.points.split(" ")[0].split(",")[1]) + 43} textAnchor="middle" className="plan-plot-label">{plot.id}</text>
            </g>)}
            <g className="plan-estate-label"><text x="675" y="440">LOZIKHEYi</text><text x="680" y="458" className="plan-estate-sub">ESTATE CONCEPT</text></g>
          </svg>
        </div>
        <div className="plan-map-footer"><span><Compass size={14}/> N</span><div><i className="dot available"/> Available <i className="dot reserved"/> Reserved <i className="dot sold"/> Sold</div></div>
      </div>
      <aside className="plot-panel">
        <div className="plot-panel-top"><div><p className="eyebrow">PLOT EXPLORER</p><h3>{selected ? selected.id : "Select a plot"}</h3></div><Filter size={18}/></div>
        <div className="filter-row">{(["All", "Available", "Reserved", "Sold"] as const).map(f => <button key={f} className={filter === f ? "filter-active" : ""} onClick={() => { setFilter(f); setSelected(null); }}>{f}</button>)}</div>
        {selected && visible.some(p => p.id === selected.id) ? <div className="plot-details"><span className="status-pill" style={{ "--pin": colors[selected.status] } as React.CSSProperties}>{selected.status}</span><div className="plot-size">{selected.size} <small>m²</small></div><p>Illustrative stand size</p><div className="detail-line"><span>Plot reference</span><b>{selected.id}</b></div><div className="detail-line"><span>Indicative price</span><b>To be confirmed</b></div><a className="gold-button full" href="#contact">Enquire about this plot</a></div> : <div className="plot-empty"><Layers3/><p>Choose a coloured plot on the plan to preview its sample details.</p><small>{visible.length} sample plots shown</small></div>}
        <small className="panel-disclaimer">Plot positions, sizes, statuses and prices are fictional demonstration data. They do not represent the approved Lozikheyi Estate layout.</small>
      </aside>
    </div>
  );
}
