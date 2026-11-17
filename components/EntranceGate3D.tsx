"use client";

import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, OrbitControls, Text } from "@react-three/drei";
import { Suspense } from "react";

function GateStructure() {
  const wall="#c8c0ad", stone="#55534b", gold="#d9b66d", black="#202523";
  return (
  <group position={[0,-.5,0]}>
    <mesh position={[0,-.12,0]} receiveShadow><boxGeometry args={[30,.22,15]}/><meshStandardMaterial color="#777d68"/></mesh>
    <mesh position={[0,.02,5.5]} receiveShadow><boxGeometry args={[30,.18,4]}/><meshStandardMaterial color="#8c8d83"/></mesh>
    {/* boundary walls and piers */}
    <mesh position={[-11,1.4,0]} castShadow><boxGeometry args={[7,2.8,.65]}/><meshStandardMaterial color={wall}/></mesh>
    <mesh position={[11,1.4,0]} castShadow><boxGeometry args={[7,2.8,.65]}/><meshStandardMaterial color={wall}/></mesh>
    <mesh position={[-6.8,1.6,0]} castShadow><boxGeometry args={[.8,3.2,1.2]}/><meshStandardMaterial color={stone}/></mesh>
    <mesh position={[6.8,1.6,0]} castShadow><boxGeometry args={[.8,3.2,1.2]}/><meshStandardMaterial color={stone}/></mesh>
    {/* central overhead portal */}
    <mesh position={[0,4.4,0]} castShadow><boxGeometry args={[14,.8,2.4]}/><meshStandardMaterial color={stone}/></mesh>
    <mesh position={[-6.6,2.4,0]} castShadow><boxGeometry args={[.8,4.8,2.4]}/><meshStandardMaterial color={stone}/></mesh>
    <mesh position={[6.6,2.4,0]} castShadow><boxGeometry args={[.8,4.8,2.4]}/><meshStandardMaterial color={stone}/></mesh>
    <mesh position={[0,4.82,0]}><boxGeometry args={[14.4,.12,2.7]}/><meshStandardMaterial color={gold} metalness={.25}/></mesh>
    {/* signage monument on right */}
    <mesh position={[9.2,1.75,-.15]} castShadow><boxGeometry args={[4.3,3.5,1.15]}/><meshStandardMaterial color={stone}/></mesh>
    <mesh position={[9.2,1.75,.46]}><boxGeometry args={[3.75,2.95,.035]}/><meshStandardMaterial color="#333630"/></mesh>
    <Text position={[9.2,2.05,.51]} fontSize={.38} maxWidth={3.7} textAlign="center" color={gold} anchorX="center" anchorY="middle">LOZIKHEYi</Text>
    <Text position={[9.2,1.58,.51]} fontSize={.16} letterSpacing={.24} textAlign="center" color="#e9e1d0" anchorX="center" anchorY="middle">ESTATE</Text>
    <Text position={[9.2,1.3,.51]} fontSize={.1} letterSpacing={.3} textAlign="center" color={gold} anchorX="center" anchorY="middle">BULAWAYO</Text>
    {/* vertical metal sliding gates */}
    {Array.from({length:22},(_,i)=><mesh key={i} position={[-5.35+i*.49,1.55,.22]} castShadow><boxGeometry args={[.075,2.65,.14]}/><meshStandardMaterial color={black} metalness={.7} roughness={.35}/></mesh>)}
    <mesh position={[-.15,2.92,.22]}><boxGeometry args={[10.7,.12,.18]}/><meshStandardMaterial color={black} metalness={.7}/></mesh>
    {/* guard cabin */}
    <mesh position={[-9.2,1.4,-3.3]} castShadow><boxGeometry args={[3.4,2.8,3.2]}/><meshStandardMaterial color={wall}/></mesh>
    <mesh position={[-9.2,2.9,-3.3]}><boxGeometry args={[3.65,.18,3.45]}/><meshStandardMaterial color={black}/></mesh>
    <mesh position={[-9.2,1.75,-1.66]}><boxGeometry args={[2.5,1.1,.08]}/><meshStandardMaterial color="#33484a" metalness={.25} roughness={.18}/></mesh>
    {/* raised barrier */}
    <mesh position={[-5.6,1.4,-2.4]} rotation={[0,0,-.22]}><boxGeometry args={[4.3,.12,.12]}/><meshStandardMaterial color="#eee7d7"/></mesh>
    {/* entrance lighting */}
    {[-6.6,6.6,9.2,-9.2].map((x,i)=><pointLight key={i} position={[x,3.5,i===3?-3:1]} color="#f4cb79" intensity={i===2?18:8} distance={7}/>)}
    <mesh position={[0,.02,7.6]}><boxGeometry args={[7,.05,2.4]}/><meshStandardMaterial color="#b4ad9d"/></mesh>
    <mesh position={[9.2,.03,2.8]}><boxGeometry args={[5,.06,2.5]}/><meshStandardMaterial color="#a39d8d"/></mesh>
  </group>;
}

export default function EntranceGate3D() {
 return (
 <div className="entrance-viewer"><Canvas shadows dpr={[1,1.5]} camera={{position:[18,9,20],fov:37}}><color attach="background" args={["#b7b5a9"]}/><fog attach="fog" args={["#b7b5a9",32,75]}/><ambientLight intensity={.8}/><directionalLight position={[10,16,8]} intensity={2.1} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048}/><Suspense fallback={null}><GateStructure/><ContactShadows position={[0,-.35,0]} opacity={.45} scale={35} blur={3}/><Environment preset="city"/></Suspense><OrbitControls makeDefault target={[0,2,0]} minDistance={12} maxDistance={40} maxPolarAngle={Math.PI/2.05} enableDamping/></Canvas><div className="entrance-viewer-label">ILLUSTRATIVE ENTRANCE DESIGN · NOT APPROVED DRAWINGS</div></div>;
}