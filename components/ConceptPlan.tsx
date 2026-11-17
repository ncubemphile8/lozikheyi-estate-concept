export default function ConceptPlan({type}:{type:"b"|"c"|"d"}) {
 const rooms = {
  b:[["LOUNGE + DINING","Open plan"],["KITCHEN","Family kitchen"],["BEDROOM 1","Main suite"],["BEDROOM 2","Bedroom"],["BEDROOM 3","Bedroom"],["BATHROOM","Shared"]],
  c:[["LOUNGE","Main living"],["DINING","Dining area"],["KITCHEN","Open kitchen"],["MAIN SUITE","Bedroom + ensuite"],["BEDROOM 2","Bedroom"],["BEDROOM 3","Bedroom"],["BATHROOM","Shared"],["GUEST WC","Powder room"]],
  d:[["FORMAL LOUNGE","Reception"],["FAMILY LOUNGE","Private living"],["DINING","Entertainment"],["KITCHEN","Main kitchen"],["MAIN SUITE","Bedroom + ensuite"],["BEDROOM 2","Bedroom"],["BEDROOM 3","Bedroom"],["BEDROOM 4","Guest room"],["BATHROOMS","3.5 total"]]
 }[type];
 const cols = type==="b"?3:type==="c"?4:3;
 return <section className="floorplan-section"><div className="floorplan-heading"><p className="eyebrow">CONCEPTUAL SPACE PLANNING</p><h2>Explore the <em>floor plan.</em></h2><p>Illustrative room zoning only. This diagram is not dimensioned and is not suitable for construction.</p></div><div className="concept-room-grid" style={{gridTemplateColumns:"repeat("+cols+",minmax(0,1fr))"}}>{rooms.map((room,i)=><div className="concept-room" key={room[0]+i}><span>{String(i+1).padStart(2,"0")}</span><b>{room[0]}</b><small>{room[1]}</small></div>)}</div><p className="concept-plan-footnote">Room count and arrangement are preliminary concepts. A qualified architect must develop and verify the actual plan.</p></section>;
}