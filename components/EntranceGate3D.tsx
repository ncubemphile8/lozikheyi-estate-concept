"use client";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, OrbitControls, Text } from "@react-three/drei";
import { Suspense } from "react";

function Lamp({x,z}:{x:number;z:number}) {
 return <group position={[x,0,z]}><mesh position={[0,2.5,0]} castShadow><boxGeometry args={[.18,5,.18]}/><meshStandardMaterial color="#343b35"/></mesh><mesh position={[0,5.08,0]}><boxGeometry args={[.42,.16,.42]}/><meshStandardMaterial color="#b99b63" metalness={.45}/></mesh><mesh position={[0,5.22,0]}><sphereGeometry args={[.14,16,16]}/><meshStandardMaterial color="#ffe2a0" emissive="#e4b969" emissiveIntensity={1.5}/></mesh><pointLight position={[0,5.2,0]} color="#f4cb79" intensity={7} distance={9}/></group>;
}
function Tree({x,z}:{x:number;z:number}) {
 return <group position={[x,0,z]}><mesh position={[0,1.2,0]} castShadow><cylinderGeometry args={[.14,.22,2.4,8]}/><meshStandardMaterial color="#69533b"/></mesh><mesh position={[0,2.8,0]} castShadow><icosahedronGeometry args={[1.15,1]}/><meshStandardMaterial color="#526a49"/></mesh><mesh position={[.55,2.5,.12]} castShadow><icosahedronGeometry args={[.72,1]}/><meshStandardMaterial color="#74835a"/></mesh></group>;
}
function Planter({x,z,w=2}:{x:number;z:number;w?:number}) {
 return <group position={[x,0,z]}><mesh position={[0,.25,0]} castShadow><boxGeometry args={[w,.5,1.3]}/><meshStandardMaterial color="#5c5a50"/></mesh>{[-.55,0,.55].map((dx,i)=><mesh key={i} position={[dx,.72,0]} castShadow><icosahedronGeometry args={[.42,1]}/><meshStandardMaterial color={i===1?"#74845c":"#536b49"}/></mesh>)}</group>;
}
function GateStructure() {
 const wall="#c8c0ad", stone="#55534b", gold="#d9b66d", black="#202523";
 return <group position={[0,-.5,0]}>
  {/* broad landscaped arrival island and asphalt approach */}
  <mesh position={[0,-.12,0]} receiveShadow><boxGeometry args={[38,.22,25]}/><meshStandardMaterial color="#68735d"/></mesh>
  <mesh position={[0,-.005,9]} receiveShadow><boxGeometry args={[38,.16,9]}/><meshStandardMaterial color="#353a38"/></mesh>
  <mesh position={[0,.09,5.5]} receiveShadow><boxGeometry args={[30,.18,5.5]}/><meshStandardMaterial color="#8c8d83"/></mesh>
  <mesh position={[0,.19,9]}><boxGeometry args={[.16,.025,8]}/><meshStandardMaterial color="#d9d2bd"/></mesh>
  {[-1,1].map(n=><mesh key={n} position={[n*3,.19,9]}><boxGeometry args={[.12,.025,1.2]}/><meshStandardMaterial color="#e9e2d2"/></mesh>)}
  {/* boundary wall with capstones, piers and recessed wall lights */}
  {[-14,-10.5,10.5,14].map(x=><group key={x}><mesh position={[x,1.25,0]} castShadow><boxGeometry args={[3.4,2.5,.7]}/><meshStandardMaterial color={wall}/></mesh><mesh position={[x,2.55,0]}><boxGeometry args={[3.55,.12,.82]}/><meshStandardMaterial color="#a99f8b"/></mesh></group>)}
  <mesh position={[-7.2,1.5,0]} castShadow><boxGeometry args={[.9,3,1.25]}/><meshStandardMaterial color={stone}/></mesh>
  <mesh position={[7.2,1.5,0]} castShadow><boxGeometry args={[.9,3,1.25]}/><meshStandardMaterial color={stone}/></mesh>
  {[-7.2,7.2].map(x=><group key={x}><mesh position={[x,3.08,.02]}><boxGeometry args={[1.05,.12,1.4]}/><meshStandardMaterial color={gold}/></mesh><mesh position={[x,3.22,.02]}><sphereGeometry args={[.12,16,16]}/><meshStandardMaterial color="#ffe1a0" emissive="#d6ac62" emissiveIntensity={1.1}/></mesh></group>)}
  {/* central portal frame with layered trim */}
  <mesh position={[0,4.4,0]} castShadow><boxGeometry args={[14.5,.8,2.4]}/><meshStandardMaterial color={stone}/></mesh>
  <mesh position={[0,4.84,0]}><boxGeometry args={[14.8,.12,2.7]}/><meshStandardMaterial color={gold} metalness={.25}/></mesh>
  <mesh position={[-6.65,2.4,0]} castShadow><boxGeometry args={[.8,4.8,2.4]}/><meshStandardMaterial color={stone}/></mesh>
  <mesh position={[6.65,2.4,0]} castShadow><boxGeometry args={[.8,4.8,2.4]}/><meshStandardMaterial color={stone}/></mesh>
  <mesh position={[-6.65,2.4,1.24]}><boxGeometry args={[.12,4.7,.08]}/><meshStandardMaterial color={gold}/></mesh>
  <mesh position={[6.65,2.4,1.24]}><boxGeometry args={[.12,4.7,.08]}/><meshStandardMaterial color={gold}/></mesh>
  {/* illuminated estate identity monument */}
  <mesh position={[9.5,1.85,-.2]} castShadow><boxGeometry args={[4.8,3.7,1.3]}/><meshStandardMaterial color={stone}/></mesh>
  <mesh position={[9.5,1.85,.48]}><boxGeometry args={[4.25,3.15,.04]}/><meshStandardMaterial color="#252c27"/></mesh>
  <mesh position={[9.5,1.85,.52]}><boxGeometry args={[.035,2.75,.02]}/><meshStandardMaterial color={gold}/></mesh>
  <Text position={[9.5,2.25,.56]} fontSize={.4} maxWidth={4} textAlign="center" color={gold} anchorX="center" anchorY="middle">LOZIKHEYi</Text>
  <Text position={[9.5,1.72,.56]} fontSize={.17} letterSpacing={.24} textAlign="center" color="#e9e1d0" anchorX="center" anchorY="middle">ESTATE</Text>
  <Text position={[9.5,1.4,.56]} fontSize={.1} letterSpacing={.3} textAlign="center" color={gold} anchorX="center" anchorY="middle">BULAWAYO</Text>
  {/* main sliding gate with detailed rails, piers and pedestrian access */}
  {Array.from({length:24},(_,i)=><mesh key={i} position={[-5.55+i*.47,1.5,.22]} castShadow><boxGeometry args={[.065,2.55,.16]}/><meshStandardMaterial color={black} metalness={.7} roughness={.35}/></mesh>)}
  {[.35,1.45,2.55].map(y=><mesh key={y} position={[0,y,.22]}><boxGeometry args={[11.1,.07,.2]}/><meshStandardMaterial color={black} metalness={.7}/></mesh>)}
  <mesh position={[-5.95,.12,.22]}><cylinderGeometry args={[.12,.12,.24,16]}/><meshStandardMaterial color={gold} metalness={.7}/></mesh>
  <mesh position={[5.95,.12,.22]}><cylinderGeometry args={[.12,.12,.24,16]}/><meshStandardMaterial color={gold} metalness={.7}/></mesh>
  {/* guardhouse with glazing, canopy, service door and security camera */}
  <mesh position={[-10,1.35,-3.4]} castShadow><boxGeometry args={[4,2.7,3.8]}/><meshStandardMaterial color={wall}/></mesh>
  <mesh position={[-10,2.8,-3.4]}><boxGeometry args={[4.3,.2,4.1]}/><meshStandardMaterial color={black}/></mesh>
  <mesh position={[-10,1.72,-1.45]}><boxGeometry args={[2.65,1.15,.08]}/><meshStandardMaterial color="#33484a" metalness={.3} roughness={.18}/></mesh>
  <mesh position={[-8.55,1.25,-3.4]}><boxGeometry args={[.8,2.1,.08]}/><meshStandardMaterial color="#76563b"/></mesh>
  <mesh position={[-10,2.45,-1.35]}><boxGeometry args={[3.1,.12,.65]}/><meshStandardMaterial color={gold}/></mesh>
  <mesh position={[-11.7,2.9,-1.1]} rotation={[0,0,-.35]}><boxGeometry args={[.35,.12,.2]}/><meshStandardMaterial color={black}/></mesh>
  <mesh position={[-11.7,2.82,-1.1]}><sphereGeometry args={[.08,12,12]}/><meshStandardMaterial color="#b7c7c4"/></mesh>
  {/* boom barrier and access-control bollards */}
  <mesh position={[-5.5,1.25,-2.3]}><cylinderGeometry args={[.12,.16,2.5,16]}/><meshStandardMaterial color={black}/></mesh>
  <mesh position={[-3.6,2.35,-2.3]} rotation={[0,0,-.12]}><boxGeometry args={[4,.13,.13]}/><meshStandardMaterial color="#eee7d7"/></mesh>
  {[-5.2,-4.2,-3.2].map(x=><mesh key={x} position={[x,.48,-1.5]}><cylinderGeometry args={[.16,.16,.9,16]}/><meshStandardMaterial color={gold} metalness={.45}/></mesh>)}
  {/* visitor pedestrian gate and paving */}
  <mesh position={[7.9,1.35,1]}><boxGeometry args={[1.25,2.5,.15]}/><meshStandardMaterial color={black}/></mesh>
  {Array.from({length:7},(_,i)=><mesh key={i} position={[7.4+i*.16,1.35,1.1]}><boxGeometry args={[.045,2.35,.08]}/><meshStandardMaterial color={gold}/></mesh>)}
  <mesh position={[7.9,.08,2.2]}><boxGeometry args={[2.6,.16,3.2]}/><meshStandardMaterial color="#b6b09f"/></mesh>
  {/* arrival planting, mature trees, low planting beds and bollard lights */}
  <Planter x={-15} z={5} w={4}/><Planter x={15} z={5} w={4}/><Planter x={-8} z={6} w={3}/><Planter x={8} z={6} w={3}/>
  <Tree x={-16} z={-6}/><Tree x={16} z={-6}/><Tree x={-14} z={8}/><Tree x={14} z={8}/>
  {[-12,-8,8,12].map(x=><Lamp key={x} x={x} z={5.2}/>)}
  {[-3,-1.5,1.5,3].map(x=><group key={x} position={[x,0,6.2]}><mesh position={[0,.45,0]}><cylinderGeometry args={[.09,.11,.9,12]}/><meshStandardMaterial color={gold}/></mesh><pointLight position={[0,.9,0]} color="#f4cb79" intensity={1.8} distance={3}/></group>)}
  {/* low wall-mounted uplights */}
  {[-13,-10,10,13].map(x=><pointLight key={x} position={[x,2.1,.5]} color="#f4cb79" intensity={3} distance={5}/>)}
 </group>;
}
export default function EntranceGate3D() {
 return <div className="entrance-viewer"><Canvas shadows dpr={[1,1.5]} camera={{position:[21,11,24],fov:36}}><color attach="background" args={["#b7b5a9"]}/><fog attach="fog" args={["#b7b5a9",36,82]}/><ambientLight intensity={.72}/><directionalLight position={[12,18,10]} intensity={2.1} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048}/><Suspense fallback={null}><GateStructure/><ContactShadows position={[0,-.35,0]} opacity={.45} scale={42} blur={3}/><Environment preset="city"/></Suspense><OrbitControls makeDefault target={[0,2,1]} minDistance={13} maxDistance={46} maxPolarAngle={Math.PI/2.05} enableDamping/></Canvas><div className="entrance-viewer-label">ILLUSTRATIVE ENTRANCE DESIGN · NOT APPROVED DRAWINGS</div></div>;
}
