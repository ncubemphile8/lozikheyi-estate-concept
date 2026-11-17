"use client";

import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import { Suspense, useMemo } from "react";
import { RotateCcw } from "lucide-react";

type HouseType = "b" | "c" | "d";
type Vec3 = [number, number, number];
const palette = {
  plaster: "#e6dfd2", pale: "#d5d0c4", charcoal: "#232a28",
  roof: "#202725", glass: "#59757b", timber: "#76563b",
  stone: "#a79a83", gold: "#b99b63", concrete: "#aaa99e",
  lawn: "#738367", darkGreen: "#536a49", lightGreen: "#7d8a60"
};

function Block({ p, s, color, rotation = [0, 0, 0], roughness = .78, metalness = .04 }:
  { p: Vec3; s: Vec3; color: string; rotation?: Vec3; roughness?: number; metalness?: number }) {
  return <mesh position={p} rotation={rotation} castShadow receiveShadow>
    <boxGeometry args={s}/>
    <meshStandardMaterial color={color} roughness={roughness} metalness={metalness}/>
  </mesh>;
}

function WindowUnit({ p, w = 2, h = 1.45, side = false, divisions = 2 }:
  { p: Vec3; w?: number; h?: number; side?: boolean; divisions?: number }) {
  return <group position={p} rotation={[0, side ? Math.PI / 2 : 0, 0]}>
    <Block p={[0, 0, 0]} s={[w + .22, h + .22, .16]} color={palette.charcoal}/>
    <mesh position={[0, 0, .09]}><boxGeometry args={[w, h, .035]}/>
      <meshPhysicalMaterial color={palette.glass} roughness={.16} metalness={.32} transparent opacity={.82} clearcoat={.65}/>
    </mesh>
    {Array.from({ length: divisions - 1 }, (_, i) =>
      <Block key={i} p={[-w / 2 + ((i + 1) * w) / divisions, 0, .13]} s={[.045, h, .045]} color={palette.charcoal}/>
    )}
    <Block p={[0, 0, .13]} s={[w, .045, .045]} color={palette.charcoal}/>
    <Block p={[0, -h / 2 - .11, .03]} s={[w + .42, .13, .32]} color={palette.stone}/>
    <Block p={[0, h / 2 + .11, .02]} s={[w + .32, .1, .24]} color={palette.pale}/>
  </group>;
}

function DoorUnit({ p, height = 2.25, width = 1.15, double = false }:
  { p: Vec3; height?: number; width?: number; double?: boolean }) {
  const w = double ? width * 2 : width;
  return <group position={p}>
    <Block p={[0, height / 2, 0]} s={[w + .22, height + .16, .18]} color={palette.stone}/>
    <Block p={[0, height / 2, .12]} s={[w, height, .08]} color={palette.timber}/>
    {[-1, 1].map(n => <Block key={n} p={[n * w * .22, height / 2, .17]} s={[.035, height * .78, .025]} color="#b99969"/>)}
    <Block p={[double ? 0 : w * .3, height / 2, .2]} s={[.035, height * .88, .035]} color="#b99969"/>
    <mesh position={[w * .37, height * .48, .24]}><sphereGeometry args={[.055, 14, 14]}/><meshStandardMaterial color={palette.gold} metalness={.72} roughness={.22}/></mesh>
  </group>;
}

function Shrub({ p, scale = 1 }: { p: Vec3; scale?: number }) {
  return <group position={p} scale={scale}>
    <mesh position={[0, .3, 0]} castShadow><icosahedronGeometry args={[.38, 1]}/><meshStandardMaterial color={palette.darkGreen} roughness={1}/></mesh>
    <mesh position={[.24, .23, .08]} castShadow><icosahedronGeometry args={[.27, 1]}/><meshStandardMaterial color={palette.lightGreen} roughness={1}/></mesh>
    <mesh position={[-.2, .2, -.1]} castShadow><icosahedronGeometry args={[.23, 1]}/><meshStandardMaterial color="#617750" roughness={1}/></mesh>
  </group>;
}

function Tree({ p, scale = 1 }: { p: Vec3; scale?: number }) {
  return <group position={p} scale={scale}>
    <mesh position={[0, 1.05, 0]} castShadow><cylinderGeometry args={[.12, .2, 2.1, 9]}/><meshStandardMaterial color="#6c533a"/></mesh>
    <mesh position={[0, 2.35, 0]} castShadow><icosahedronGeometry args={[.95, 1]}/><meshStandardMaterial color="#526b49" roughness={1}/></mesh>
    <mesh position={[.5, 2.12, .1]} castShadow><icosahedronGeometry args={[.62, 1]}/><meshStandardMaterial color="#73845b" roughness={1}/></mesh>
    <mesh position={[-.42, 2.05, -.08]} castShadow><icosahedronGeometry args={[.58, 1]}/><meshStandardMaterial color="#647950" roughness={1}/></mesh>
  </group>;
}

function WallLight({ p }: { p: Vec3 }) {
  return <group position={p}>
    <Block p={[0, 0, 0]} s={[.2, .3, .13]} color={palette.gold} metalness={.35}/>
    <mesh position={[0, -.1, .09]}><boxGeometry args={[.12, .1, .05]}/><meshStandardMaterial color="#ffe2a6" emissive="#e5ba6f" emissiveIntensity={1.1}/></mesh>
    <pointLight position={[0, -.18, .28]} color="#f4d39a" intensity={.8} distance={2.5}/>
  </group>;
}

function Pergola({ x, z, width, depth, height = 2.8 }: { x: number; z: number; width: number; depth: number; height?: number }) {
  const left = x - width / 2;
  return <group>
    {[-1, 1].map(n => <Block key={n} p={[x + n * width / 2, height / 2, z + depth / 2]} s={[.16, height, .16]} color={palette.timber}/>)}
    <Block p={[x, height, z + depth / 2]} s={[width + .2, .16, .18]} color={palette.timber}/>
    {Array.from({ length: 7 }, (_, i) => <Block key={i} p={[left + (i * width) / 6, height + .08, z]} s={[.12, .14, depth + .25]} color={palette.timber}/>)}
    <Block p={[x, height + .05, z - depth / 2]} s={[width + .2, .14, .18]} color={palette.timber}/>
  </group>;
}

function SolarArray({ x, z, width = 2.2, count = 3 }: { x: number; z: number; width?: number; count?: number }) {
  return <group>
    {Array.from({ length: count }, (_, i) => <group key={i} position={[x + i * (width + .16), 3.58, z]} rotation={[-.18, 0, 0]}>
      <Block p={[0, 0, 0]} s={[width, .055, 1.25]} color="#223e4a" roughness={.26} metalness={.42}/>
      {[-.32, 0, .32].map(y => <Block key={y} p={[0, .035, y]} s={[width * .96, .012, .018]} color="#9cb1b4" roughness={.22} metalness={.35}/>)}
    </group>)}
  </group>;
}

function FamilyHouse() {
  return <group>
    {/* Plot, stepped plinth and main bungalow mass */}
    <Block p={[0, -.12, 0]} s={[20, .18, 17]} color={palette.lawn}/>
    <Block p={[0, .015, 0]} s={[12.7, .24, 10.2]} color="#b8b3a8"/>
    <Block p={[0, .16, 0]} s={[12.2, .12, 9.8]} color="#ddd5c6"/>
    <Block p={[0, 1.67, -.35]} s={[11.8, 2.9, 9.2]} color={palette.plaster}/>
    <Block p={[-3.65, 1.65, 4.28]} s={[4.2, 2.8, .22]} color="#d7d0c3"/>
    <Block p={[3.5, 1.65, 4.28]} s={[4.15, 2.8, .22]} color={palette.pale}/>
    <Block p={[0, 3.23, -.35]} s={[12.55, .28, 9.85]} color={palette.roof}/>
    <Block p={[0, 3.39, 4.3]} s={[12.45, .12, .24]} color="#444c46"/>
    <Block p={[0, 3.39, -5.02]} s={[12.45, .12, .24]} color="#444c46"/>
    <Block p={[-6.18, 3.39, -.35]} s={[.18, .12, 9.5]} color="#444c46"/>
    <Block p={[6.18, 3.39, -.35]} s={[.18, .12, 9.5]} color="#444c46"/>
    {/* Distinct entrance and glazed family living room */}
    <WindowUnit p={[-3.85, 1.9, 4.42]} w={2.35} h={1.55} divisions={2}/>
    <WindowUnit p={[-.65, 1.9, 4.42]} w={2.45} h={1.55} divisions={3}/>
    <DoorUnit p={[2.2, .46, 4.42]} height={2.3} width={1.25}/>
    <WindowUnit p={[4.7, 1.88, 4.42]} w={1.65} h={1.5} divisions={2}/>
    <WindowUnit p={[6.02, 1.75, -.55]} w={2.1} h={1.35} side/>
    {/* Stone entrance pier, feature bands and subtle facade fins */}
    <Block p={[3.55, 1.62, 4.43]} s={[.48, 2.95, .34]} color={palette.stone}/>
    <Block p={[-5.55, 1.6, 4.43]} s={[.16, 2.8, .28]} color={palette.gold}/>
    {[-5.15, -4.88, -4.61, -4.34].map(x => <Block key={x} p={[x, 1.67, 4.47]} s={[.075, 2.45, .16]} color={palette.timber}/>)}
    {/* Timber entrance canopy and outdoor family patio */}
    <Block p={[2.2, 2.78, 4.98]} s={[3.3, .16, 1.35]} color={palette.timber}/>
    <Block p={[2.2, 2.67, 5.63]} s={[3.25, .08, .12]} color={palette.charcoal}/>
    <Block p={[2.2, .28, 5.12]} s={[3.8, .16, 2.1]} color="#b8b2a5"/>
    {[-1.5, -.6, .3, 1.2].map(n => <Block key={n} p={[n, .22, 6.35]} s={[.68, .1, .52]} color="#ded8ca"/>)}
    <Pergola x={-3.7} z={4.8} width={3.1} depth={2.4} height={2.65}/>
    {/* Service door, side glazing and screened utility area */}
    <DoorUnit p={[-5.96, .42, -2.4]} height={2.05} width={.9}/>
    <Block p={[6.15, .72, -2.8]} s={[.9, .78, .38]} color="#d1cec4"/>
    {[-.26, -.1, .06, .22].map(x => <Block key={x} p={[6.15 + x, .72, -2.58]} s={[.025, .55, .025]} color="#7a8178"/>)}
    {/* Front wall lights and driveway */}
    <WallLight p={[-2.25, 2.3, 4.5}/><WallLight p={[4.95, 2.3, 4.5}/>
    <Block p={[-5.2, .02, 6.45]} s={[4.3, .1, 4.6]} color="#aaa99e"/>
    <Block p={[5.25, .02, 6.8]} s={[4.1, .1, 5.2]} color="#aaa99e"/>
    <Block p={[5.25, .1, 7.4]} s={[4.1, .08, .16]} color="#d4cdbc"/>
    {[-1, 0, 1].map(n => <Block key={n} p={[n * .9, .12, 7.1]} s={[.68, .12, .54]} color="#e0d9ca"/>)}
    {/* Roof equipment and solar panels */}
    <Block p={[-4.65, 3.54, -1.8]} s={[.8, .32, .75]} color="#c8c6bd"/>
    <SolarArray x={-3.8} z={-2.8} width={1.65} count={3}/>
    {/* Garden beds, trees and low boundary wall */}
    {[-5.3, 5.4].map(x => <Shrub key={x} p={[x, .08, 5.15]} scale={1.1}/>)}
    <Tree p={[-8.4, 0, -5.3]} scale={1.05}/><Tree p={[8.2, 0, -5.4]} scale={.95}/>
    <Block p={[-8.45, .45, 1]} s={[.22, .9, 8]} color="#b9b3a4"/>
    <Block p={[8.45, .45, 1]} s={[.22, .9, 8]} color="#b9b3a4"/>
  </group>;
}

function ExecutiveHouse() {
  return <group>
    {/* Split-volume composition with a raised private wing */}
    <Block p={[0, -.12, 0]} s={[23, .18, 18]} color={palette.lawn}/>
    <Block p={[0, .02, 0]} s={[15.8, .24, 12.2]} color="#b8b2a4"/>
    <Block p={[-2.25, 1.58, -.55]} s={[10.5, 2.85, 10.5]} color="#dedbd3"/>
    <Block p={[4.35, 1.85, -1.2]} s={[6.8, 3.4, 8.6]} color="#c9c5bb"/>
    <Block p={[-2.25, 3.15, -.55]} s={[11.1, .28, 11.1]} color="#272d2b"/>
    <Block p={[4.35, 3.72, -1.2]} s={[7.35, .28, 9.1]} color="#202725"/>
    <Block p={[4.35, 3.9, 3.35]} s={[7.35, .1, .2]} color={palette.gold}/>
    <Block p={[-2.25, 3.3, 4.85]} s={[10.8, .14, .2]} color="#414943"/>
    {/* Wide living glazing and framed entry */}
    <WindowUnit p={[-4.7, 1.85, 4.76]} w={2.45} h={1.65} divisions={2}/>
    <WindowUnit p={[-1.35, 1.85, 4.76]} w={2.55} h={1.65} divisions={3}/>
    <DoorUnit p={[2.15, .45, 3.18]} height={2.35} width={1.35}/>
    <WindowUnit p={[5.85, 2.02, 3.22]} w={2.35} h={1.85} divisions={2}/>
    <WindowUnit p={[7.82, 2.05, -1.15]} w={2.45} h={1.85} side/>
    {/* Deep stone entrance frame and metal fins to shade the west-facing glass */}
    <Block p={[1.25, 1.68, 3.22]} s={[.52, 3.25, .36]} color={palette.stone}/>
    <Block p={[3.05, 1.7, 3.24]} s={[.22, 3.15, .3]} color={palette.gold}/>
    {[-.1, .38, .86, 1.34].map(n => <Block key={n} p={[6.8 + n * .12, 2, 3.35]} s={[.09, 2.9, .26]} color={palette.timber}/>)}
    {/* Floating canopy and covered outdoor lounge */}
    <Block p={[2.2, 3.04, 4.25]} s={[5.25, .17, 2.45]} color={palette.charcoal}/>
    {[-.1, 1.55, 3.2].map(x => <Block key={x} p={[x, 1.6, 5.2]} s={[.16, 3.1, .16]} color={palette.stone}/>)}
    <Block p={[2.2, .08, 5.5]} s={[7.1, .14, 4.2]} color="#aca99e"/>
    <Block p={[2.2, .17, 7.65]} s={[6.5, .08, .12]} color="#d8d0c0"/>
    <Pergola x={-5.7} z={4.1} width={3.2} depth={3.1} height={2.85}/>
    {/* Decorative horizontal reveal and wall sconces */}
    <Block p={[-2.25, 2.65, 4.91]} s={[10.5, .06, .07]} color={palette.gold}/>
    <WallLight p={[-5.85, 2.1, 4.9}/><WallLight p={[5.8, 2.6, 3.28}/>
    {/* Reflecting pool, paving and solar panels */}
    <Block p={[-5.7, .06, 6.5]} s={[3.7, .14, 2.8]} color="#72817d" roughness={.2}/>
    <Block p={[-5.7, .15, 6.5]} s={[3.2, .035, 2.35]} color="#42616a" roughness={.12} metalness={.2}/>
    <Block p={[6.8, .02, 6.1]} s={[4.3, .1, 3.8]} color="#aaa99e"/>
    <SolarArray x={-1.4} z={-2.65} width={1.8} count={3}/>
    <Tree p={[-9.4, 0, -6]} scale={1.1}/><Tree p={[9.5, 0, -6]} scale={1.15}/>
    <Shrub p={[-7, .08, 5.3]} scale={1.1}/><Shrub p={[7.5, .08, 5.3]} scale={1.1}/>
    <Block p={[-9.5, .45, 1]} s={[.22, .9, 9]} color="#b9b3a4"/>
    <Block p={[9.5, .45, 1]} s={[.22, .9, 9]} color="#b9b3a4"/>
  </group>;
}

function SignatureHouse() {
  return <group>
    {/* Two-storey estate home with a strong horizontal upper volume */}
    <Block p={[0, -.12, 0]} s={[27, .18, 21]} color={palette.lawn}/>
    <Block p={[0, .02, 0]} s={[18.5, .25, 14]} color="#b8b2a4"/>
    <Block p={[-1.2, 1.62, -.65]} s={[14.2, 2.95, 12]} color="#dedbd2"/>
    <Block p={[3.3, 4.58, -1.1]} s={[10.2, 2.9, 8.8]} color="#c7c4ba"/>
    <Block p={[-1.2, 3.22, -.65]} s={[14.8, .3, 12.7]} color="#202725"/>
    <Block p={[3.3, 6.08, -1.1]} s={[10.9, .3, 9.45]} color="#202725"/>
    <Block p={[3.3, 6.25, 3.58]} s={[10.5, .1, .22]} color={palette.gold}/>
    {/* Ground floor entertainment frontage and upper bedroom glazing */}
    <WindowUnit p={[-5.4, 1.92, 5.48]} w={2.85} h={1.72} divisions={3}/>
    <WindowUnit p={[-1.75, 1.92, 5.48]} w={2.8} h={1.72} divisions={3}/>
    <DoorUnit p={[2.05, .45, 5.48]} height={2.4} width={1.55} double/>
    <WindowUnit p={[5.5, 1.95, 5.48]} w={2.35} h={1.7} divisions={2}/>
    <WindowUnit p={[1.45, 4.76, 3.46]} w={3.3} h={1.9} divisions={3}/>
    <WindowUnit p={[5.3, 4.76, 3.46]} w={3.1} h={1.9} divisions={3}/>
    <WindowUnit p={[8.48, 4.65, -1]} w={2.7} h={1.65} side/>
    {/* Upper balcony with framed glass balustrade */}
    <Block p={[3.35, 3.22, 4.02]} s={[10.7, .18, 2.25]} color="#aaa99e"/>
    <Block p={[3.35, 3.85, 5.02]} s={[10.4, .08, .08]} color={palette.charcoal}/>
    <Block p={[3.35, 3.5, 4.92]} s={[10.25, .62, .055]} color="#91a9a8" roughness={.2} metalness={.25}/>
    {Array.from({ length: 12 }, (_, i) => <Block key={i} p={[-1.55 + i * .89, 3.55, 4.98]} s={[.035, .7, .06]} color="#d4d2ca" roughness={.3}/>)}
    {/* Deep entry portal, stone-clad feature wall and privacy fins */}
    <Block p={[-.1, 1.7, 5.62]} s={[.52, 3.2, .42]} color={palette.stone}/>
    <Block p={[4.5, 1.62, 5.62]} s={[.6, 3, .42]} color={palette.stone}/>
    <Block p={[3.3, 3.1, 6.05]} s={[5.2, .18, 2.1]} color={palette.charcoal}/>
    {[-3.9, -3.5, -3.1, -2.7].map(x => <Block key={x} p={[x, 1.6, 5.67]} s={[.09, 2.8, .18]} color={palette.timber}/>)}
    {/* Ground floor garage wing with ribbed sectional door */}
    <Block p={[7.4, 1.45, -6.83]} s={[5.3, 2.65, .2]} color="#d3cec2"/>
    <Block p={[7.4, 1.36, -6.69]} s={[4.45, 2.15, .12]} color="#555e59"/>
    {Array.from({ length: 9 }, (_, i) => <Block key={i} p={[7.4, .42 + i * .23, -6.61]} s={[4.35, .035, .035]} color="#b4b5ac"/>)}
    {/* Side colonnade, covered entertainment terrace and timber pergola */}
    {[-1, 1].map(n => <Block key={n} p={[n * 7.35, 1.5, 6.45]} s={[.22, 3, .22]} color={palette.stone}/>)}
    <Block p={[0, .08, 7.2]} s={[11.5, .14, 4.1]} color="#aaa99e"/>
    <Pergola x={-4.25} z={6.3} width={5.4} depth={3.6} height={3.05}/>
    {/* Broad steps, driveway, lighting and garden */}
    {[-1, 0, 1].map(n => <Block key={n} p={[2.8 + n * .8, .14, 7.65]} s={[.68, .13, .48]} color="#e1dbcc"/>)}
    <Block p={[7.4, .02, -8.9]} s={[7.4, .1, 4.1]} color="#aaa99e"/>
    <WallLight p={[-5.1, 2.3, 5.63}/><WallLight p={[5.55, 2.25, 5.63}/>
    <SolarArray x={-2.8} z={-3.15} width={1.75} count={3}/>
    <Tree p={[-11, 0, -7]} scale={1.15}/><Tree p={[11, 0, -8]} scale={1.1}/>
    {[-7, 7].map(x => <Shrub key={x} p={[x, .08, 6.4]} scale={1.15}/>)}
    <Block p={[-10.5, .48, 1]} s={[.22, .95, 10]} color="#b9b3a4"/>
    <Block p={[10.5, .48, 1]} s={[.22, .95, 10]} color="#b9b3a4"/>
  </group>;
}

function Model({ type }: { type: HouseType }) {
  return <group position={[0, -.65, 0]}>
    {type === "b" ? <FamilyHouse/> : type === "c" ? <ExecutiveHouse/> : <SignatureHouse/>}
  </group>;
}

export default function HouseTypeViewer({ type }: { type: HouseType }) {
  const camera = useMemo(() => type === "d" ? [21, 12, 23] as Vec3 : type === "c" ? [19, 10, 21] as Vec3 : [17, 9, 19] as Vec3, [type]);
  return <div className="starter-viewer">
    <Canvas shadows dpr={[1, 1.5]} camera={{ position: camera, fov: 36 }}>
      <color attach="background" args={["#d9d6cc"]}/>
      <ambientLight intensity={.72}/>
      <directionalLight position={[10, 15, 9]} intensity={2.1} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048}/>
      <Suspense fallback={null}>
        <Model type={type}/>
        <ContactShadows position={[0, -.52, 0]} opacity={.42} scale={33} blur={2.8}/>
        <Environment preset="city"/>
      </Suspense>
      <OrbitControls makeDefault target={[0, 1.7, 0]} minDistance={9} maxDistance={36} maxPolarAngle={Math.PI / 2.02} enableDamping dampingFactor={.08}/>
    </Canvas>
    <div className="viewer-hint"><RotateCcw size={14}/> Drag to rotate · Scroll to zoom</div>
  </div>;
}
