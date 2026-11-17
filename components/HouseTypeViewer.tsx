"use client";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import { RotateCcw } from "lucide-react";
import { useMemo } from "react";

type HouseType = "b" | "c" | "d";
const mat = { glass:"#405b61", frame:"#202a29", plaster:"#e7e0d3", stone:"#a99b83", timber:"#76563b", dark:"#252c2a", gold:"#b99b63", green:"#697b59" };
function Block({p,s,c,rz=0}:{p:[number,number,number];s:[number,number,number];c:string;rz?:number}) {
 return <mesh position={p} rotation={[0,0,rz]} castShadow receiveShadow><boxGeometry args={s}/><meshStandardMaterial color={c} roughness={c===mat.glass?.22:.82} metalness={c===mat.glass?.18:.05}/></mesh>;
}
function Window({p,w=1.8,h=1.35,vertical=false}:{p:[number,number,number];w?:number;h?:number;vertical?:boolean}) {
 return <group position={p} rotation={[0,vertical?Math.PI/2:0,0]}>
  <Block p={[0,0,0]} s={[w+.16,h+.16,.12]} c={mat.frame}/>
  <Block p={[0,0,.075]} s={[w,h,.035]} c={mat.glass}/>
  <Block p={[0,0,.105]} s={[.045,h,.025]} c={mat.frame}/>
  <Block p={[0,0,.105]} s={[w,.045,.025]} c={mat.frame}/>
  <Block p={[0,h/2+.12,0]} s={[w+.32,.1,.3]} c={mat.gold}/>
 </group>;
}
function Shrubs({x,z,scale=1}:{x:number;z:number;scale?:number}) {
 return <group position={[x,0,z]} scale={scale}>
  <mesh position={[0,.32,0]} castShadow><icosahedronGeometry args={[.38,1]}/><meshStandardMaterial color="#536b49"/></mesh>
  <mesh position={[.25,.25,.08]} castShadow><icosahedronGeometry args={[.27,1]}/><meshStandardMaterial color="#78865d"/></mesh>
 </group>;
}
function Tree({x,z}:{x:number;z:number}) {
 return <group position={[x,0,z]}><mesh position={[0,1,0]} castShadow><cylinderGeometry args={[.12,.18,2,8]}/><meshStandardMaterial color="#66513c"/></mesh><mesh position={[0,2.35,0]} castShadow><icosahedronGeometry args={[1.05,1]}/><meshStandardMaterial color="#586d4a"/></mesh><mesh position={[.55,2.15,.1]} castShadow><icosahedronGeometry args={[.65,1]}/><meshStandardMaterial color="#71835a"/></mesh></group>;
}
function FamilyHouse() {
 return <group>
  <Block p={[0,-.12,0]} s={[19,.18,16]} c="#77846b"/>
  <Block p={[0,.02,0]} s={[12.2,.22,9.6]} c="#c9c1b2"/>
  <Block p={[0,1.7,-.4]} s={[11.4,3.1,8.8]} c={mat.plaster}/>
  <Block p={[-3.4,1.65,4.05]} s={[4.2,2.95,.22]} c="#d5c9b6"/>
  <Block p={[3.6,1.65,4.05]} s={[3.9,2.95,.22]} c={mat.plaster}/>
  <Block p={[0,3.35,-.4]} s={[12,.28,9.4]} c={mat.dark}/>
  <Block p={[0,3.53,-4.9]} s={[11.8,.18,.18]} c="#414a43"/>
  <Block p={[0,3.53,4.1]} s={[11.8,.18,.18]} c="#414a43"/>
  <Block p={[4.4,1.55,4.2]} s={[.7,2.8,.36]} c={mat.stone}/>
  <Window p={[-3.5,1.9,4.2]} w={2.25} h={1.45}/>
  <Window p={[.1,1.95,4.2]} w={2.25} h={1.45}/>
  <Window p={[5.82,1.9,-.9]} w={2.1} h={1.35} vertical/>
  <Block p={[2.5,1.45,4.18]} s={[1.25,2.25,.18]} c={mat.timber}/>
  <Block p={[2.5,2.68,4.5]} s={[2.6,.16,1.2]} c={mat.timber}/>
  {[-4.3,-3.2,-2.1,-1].map(x=><Block key={x} p={[x,2.8,5.1]} s={[.1,.12,2]} c={mat.timber}/>)}
  <Block p={[0,.08,5.4]} s={[8,.15,2.8]} c="#bcb6a8"/>
  {[-1,0,1].map(n=><Block key={n} p={[n*.85,.18,7.1]} s={[.65,.12,.5]} c="#ddd6c7"/>)}
  <Block p={[-6,.05,1]} s={[2.4,.12,5]} c="#b3ad9d"/>
  {[-5,5].map(x=><Shrubs key={x} x={x} z={5} scale={1.1}/>)}
  <Tree x={-8} z={-5}/><Tree x={8} z={-5}/>
 </group>;
}
function ExecutiveHouse() {
 return <group>
  <Block p={[0,-.12,0]} s={[22,.18,17]} c="#75846c"/>
  <Block p={[0,.02,0]} s={[15,.24,11.5]} c="#c7c0b2"/>
  <Block p={[-2,1.65,-.4]} s={[9.5,3.1,10]} c="#d8d5cc"/>
  <Block p={[4.1,1.8,-1.2]} s={[6.4,3.4,7.8]} c="#c6c0b4"/>
  <Block p={[-2,3.32,-.4]} s={[10,.28,10.5]} c="#222a29"/>
  <Block p={[4.1,3.7,-1.2]} s={[7,.25,8.4]} c="#303a37"/>
  <Block p={[4.1,3.88,2.95]} s={[7.2,.12,.18]} c={mat.gold}/>
  <Block p={[-2,1.55,4.65]} s={[9.3,2.9,.2]} c={mat.plaster}/>
  <Window p={[-4.6,1.9,4.78]} w={2.5} h={1.55}/>
  <Window p={[-1.3,1.9,4.78]} w={2.6} h={1.55}/>
  <Window p={[5.2,2,-1.2]} w={2.8} h={1.8} vertical/>
  <Block p={[2.4,1.45,3.15]} s={[1.35,2.3,.2]} c={mat.timber}/>
  <Block p={[2.4,2.72,3.8]} s={[3.1,.14,1.5]} c={mat.dark}/>
  <Block p={[4.1,3.25,2.1]} s={[6.2,.14,2.8]} c="#b9a17c"/>
  {[-2.8,-1.4,0,1.4,2.8].map(x=><Block key={x} p={[x,2.75,3.45]} s={[.1,.12,1.5]} c={mat.timber}/>)}
  <Block p={[4.1,.08,4.7]} s={[7,.14,4.2]} c="#aaa99c"/>
  <Block p={[-5,.05,5.2]} s={[2.5,.12,3.1]} c="#8b806b"/>
  {[-6,-4].map(x=><Shrubs key={x} x={x} z={5.1}/>)}
  <Tree x={-9} z={-5}/><Tree x={9} z={-5}/>
  <Block p={[-5,.06,-6.5]} s={[4,.12,2]} c="#b5b09f"/>
 </group>;
}
function SignatureHouse() {
 return <group>
  <Block p={[0,-.12,0]} s={[25,.18,20]} c="#75846c"/>
  <Block p={[0,.02,0]} s={[18,.24,13.5]} c="#c9c1b3"/>
  <Block p={[-1,1.65,-.7]} s={[12,3.1,11.5]} c="#ddd8ce"/>
  <Block p={[3.8,4.45,-1.4]} s={[9,2.8,8.4]} c="#c8c3b8"/>
  <Block p={[-1,3.34,-.7]} s={[12.5,.3,12]} c="#222a29"/>
  <Block p={[3.8,5.92,-1.4]} s={[9.6,.28,9]} c="#202827"/>
  <Block p={[3.8,4.5,2.82]} s={[9.2,.12,.18]} c={mat.gold}/>
  <Block p={[3.8,3.15,2.6]} s={[8.5,.16,3.3]} c="#9b8a70"/>
  <Block p={[-1,1.6,5.05]} s={[11.8,2.9,.22]} c={mat.plaster}/>
  <Window p={[-4.2,1.9,5.18]} w={2.7} h={1.55}/>
  <Window p={[1.6,1.9,5.18]} w={2.4} h={1.55}/>
  <Window p={[3.8,4.6,2.9]} w={4.2} h={1.8}/>
  <Window p={[6.9,4.55,-1.4]} w={2.8} h={1.7} vertical/>
  <Block p={[-.2,1.45,5.2]} s={[1.5,2.3,.2]} c={mat.timber}/>
  <Block p={[-1,3.15,6.1]} s={[5,.18,2.5]} c={mat.dark}/>
  <Block p={[6,1.5,-6.4]} s={[4.5,2.9,.2]} c={mat.stone}/>
  <Block p={[6,3.05,-6.4]} s={[5,.2,1]} c={mat.dark}/>
  <Block p={[-6,.08,6.4]} s={[5,.16,4]} c="#aaa99e"/>
  <Block p={[5,.08,6.2]} s={[7,.16,4.2]} c="#b8b4a7"/>
  {[-2.8,-1.4,0,1.4,2.8].map(x=><Block key={x} p={[x,2.85,6.7]} s={[.12,.12,2]} c={mat.timber}/>)}
  <Block p={[0,.04,-8]} s={[5,.12,2]} c="#b3ad9d"/>
  <Tree x={-10} z={-7}/><Tree x={10} z={-7}/>
  {[-7,7].map(x=><Shrubs key={x} x={x} z={6}/>)}
 </group>;
}
function Model({type}:{type:HouseType}) {
 return <group position={[0,-.65,0]}>{type==="b"?<FamilyHouse/>:type==="c"?<ExecutiveHouse/>:<SignatureHouse/>}</group>;
}
export default function HouseTypeViewer({type}:{type:HouseType}) {
 const camera=useMemo(()=>type==="d"?[20,12,21] as [number,number,number]:type==="c"?[18,10,19] as [number,number,number]:[16,9,17] as [number,number,number],[type]);
 return <div className="starter-viewer"><Canvas shadows dpr={[1,1.5]} camera={{position:camera,fov:36}}><color attach="background" args={["#d9d6cc"]}/><ambientLight intensity={.72}/><directionalLight position={[10,15,9]} intensity={2.1} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048}/><Suspense fallback={null}><Model type={type}/><ContactShadows position={[0,-.52,0]} opacity={.42} scale={29} blur={2.8}/><Environment preset="city"/></Suspense><OrbitControls makeDefault target={[0,1.7,0]} minDistance={9} maxDistance={34} maxPolarAngle={Math.PI/2.02} enableDamping dampingFactor={.08}/></Canvas><div className="viewer-hint"><RotateCcw size={14}/> Drag to rotate · Scroll to zoom</div></div>;
}
