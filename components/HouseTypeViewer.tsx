"use client";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import { RotateCcw } from "lucide-react";
const designs = {
 b:{width:11,depth:9,height:3,wing:4.5,roof:"#343b38",wall:"#e5dfd2",accent:"#a88c60"},
 c:{width:13,depth:10,height:3.3,wing:5.5,roof:"#202a2d",wall:"#d8d5cc",accent:"#8d9690"},
 d:{width:16,depth:12,height:3.5,wing:7,roof:"#292e2d",wall:"#e4dfd3",accent:"#b99b63"}
} as const;
function Model({type}:{type:"b"|"c"|"d"}) {
 const d=designs[type]; const front=d.depth/2;
 return <group position={[0,-.65,0]}>
  <mesh position={[0,-.08,0]} receiveShadow><boxGeometry args={[d.width+6,.18,d.depth+6]}/><meshStandardMaterial color="#758367"/></mesh>
  <mesh position={[0,.08,0]}><boxGeometry args={[d.width,.25,d.depth]}/><meshStandardMaterial color="#bcb5a6"/></mesh>
  <mesh position={[0,d.height/2+.2,0]} castShadow><boxGeometry args={[d.width,d.height,d.depth]}/><meshStandardMaterial color={d.wall}/></mesh>
  <mesh position={[0,d.height+.42,0]} castShadow><boxGeometry args={[d.width+.45,.28,d.depth+.45]}/><meshStandardMaterial color={d.roof}/></mesh>
  <mesh position={[0,d.height+.62,-d.depth/2+.12]}><boxGeometry args={[d.width,.18,.18]}/><meshStandardMaterial color={d.roof}/></mesh>
  <mesh position={[-d.width/2+.12,d.height+.62,0]}><boxGeometry args={[.18,.18,d.depth]}/><meshStandardMaterial color={d.roof}/></mesh>
  <mesh position={[d.width/2-.12,d.height+.62,0]}><boxGeometry args={[.18,.18,d.depth]}/><meshStandardMaterial color={d.roof}/></mesh>
  <mesh position={[0,d.height/2+.22,front+.04]}><boxGeometry args={[d.wing,d.height*.68,.09]}/><meshStandardMaterial color="#40585e" metalness={.25} roughness={.18}/></mesh>
  <mesh position={[0,d.height/2+.22,front+.1]}><boxGeometry args={[.08,d.height*.72,.08]}/><meshStandardMaterial color="#202a2b"/></mesh>
  <mesh position={[-d.width*.29,d.height/2+.22,front+.07]}><boxGeometry args={[.1,d.height*.72,.08]}/><meshStandardMaterial color={d.accent}/></mesh>
  <mesh position={[d.width*.29,d.height/2+.22,front+.07]}><boxGeometry args={[.1,d.height*.72,.08]}/><meshStandardMaterial color={d.accent}/></mesh>
  <mesh position={[d.width*.29,1.25,front+.1]}><boxGeometry args={[1.25,2.25,.14]}/><meshStandardMaterial color="#76563b"/></mesh>
  <mesh position={[-d.width*.31,1.55,front+.08]}><boxGeometry args={[2.2,1.25,.08]}/><meshStandardMaterial color="#40585e" metalness={.25}/></mesh>
  <mesh position={[d.width*.43,1.5,0]} rotation={[0,Math.PI/2,0]}><boxGeometry args={[2.1,1.3,.08]}/><meshStandardMaterial color="#40585e" metalness={.2}/></mesh>
  {[-1,1].map(n=><mesh key={n} position={[n*(d.width/2+1),.3,front+1.4]}><icosahedronGeometry args={[.5,1]}/><meshStandardMaterial color="#526c48"/></mesh>)}
  <mesh position={[0,.25,front+1.3]}><boxGeometry args={[d.wing+1,.12,2.6]}/><meshStandardMaterial color="#aaa69a"/></mesh>
 </group>;
}
export default function HouseTypeViewer({type}:{type:"b"|"c"|"d"}) {
 return <div className="starter-viewer"><Canvas shadows dpr={[1,1.6]} camera={{position:[15,9,16],fov:37}}><color attach="background" args={["#d9d6cc"]}/><ambientLight intensity={.85}/><directionalLight position={[9,13,8]} intensity={2} castShadow/><Suspense fallback={null}><Model type={type}/><ContactShadows position={[0,-.52,0]} opacity={.4} scale={24} blur={2.5}/><Environment preset="city"/></Suspense><OrbitControls makeDefault target={[0,1.2,0]} minDistance={9} maxDistance={30} maxPolarAngle={Math.PI/2.02} enableDamping/></Canvas><div className="viewer-hint"><RotateCcw size={14}/> Drag to rotate · Scroll to zoom</div></div>;
}