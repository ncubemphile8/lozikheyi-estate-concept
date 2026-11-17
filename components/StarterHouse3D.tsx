"use client";

import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import { ArrowLeft, RotateCcw } from "lucide-react";

function HouseModel() {
  const wall = "#e8e1d4";
  const dark = "#242b2a";
  return (
    <group position={[0, -0.7, 0]}>
      {/* raised foundation and floor */}
      <mesh position={[0, 0.08, 0]} receiveShadow><boxGeometry args={[9.4, .28, 8.2]}/><meshStandardMaterial color="#a9a69d"/></mesh>
      <mesh position={[0, .25, 0]} receiveShadow><boxGeometry args={[9, .12, 7.8]}/><meshStandardMaterial color="#c8bda8"/></mesh>
      {/* main walls */}
      <mesh position={[0, 1.65, -3.7]} castShadow receiveShadow><boxGeometry args={[9, 2.7, .25]}/><meshStandardMaterial color={wall}/></mesh>
      <mesh position={[-4.37, 1.65, 0]} castShadow receiveShadow><boxGeometry args={[.25, 2.7, 7.5]}/><meshStandardMaterial color={wall}/></mesh>
      <mesh position={[4.37, 1.65, 0]} castShadow receiveShadow><boxGeometry args={[.25, 2.7, 7.5]}/><meshStandardMaterial color={wall}/></mesh>
      {/* front facade split around glazing and entry */}
      <mesh position={[-2.85, 1.65, 3.7]} castShadow><boxGeometry args={[3.3, 2.7, .25]}/><meshStandardMaterial color={wall}/></mesh>
      <mesh position={[2.95, 1.65, 3.7]} castShadow><boxGeometry args={[3.1, 2.7, .25]}/><meshStandardMaterial color={wall}/></mesh>
      <mesh position={[0, 2.7, 3.7]} castShadow><boxGeometry args={[2.5, .6, .25]}/><meshStandardMaterial color={wall}/></mesh>
      {/* flat roof slab and parapet */}
      <mesh position={[0, 3.12, 0]} castShadow><boxGeometry args={[9.5, .24, 8.3]}/><meshStandardMaterial color={dark}/></mesh>
      <mesh position={[0, 3.42, -3.95]}><boxGeometry args={[9.5, .42, .18]}/><meshStandardMaterial color={dark}/></mesh>
      <mesh position={[-4.62, 3.42, 0]}><boxGeometry args={[.18, .42, 8]}/><meshStandardMaterial color={dark}/></mesh>
      <mesh position={[4.62, 3.42, 0]}><boxGeometry args={[.18, .42, 8]}/><meshStandardMaterial color={dark}/></mesh>
      {/* entrance feature and door */}
      <mesh position={[0, 1.5, 3.86]} castShadow><boxGeometry args={[1.22, 2.35, .12]}/><meshStandardMaterial color="#5d4936"/></mesh>
      <mesh position={[.42, 1.5, 3.94]}><sphereGeometry args={[.045, 16, 16]}/><meshStandardMaterial color="#d6b66f" metalness={.7}/></mesh>
      <mesh position={[0, 2.9, 4.05]}><boxGeometry args={[2.2, .12, 1.1]}/><meshStandardMaterial color="#bca987"/></mesh>
      <mesh position={[0, 1.55, 4.43]}><boxGeometry args={[2.4, .08, 1.5]}/><meshStandardMaterial color="#77786e"/></mesh>
      {/* front windows */}
      <mesh position={[-2.45, 1.75, 3.86]}><boxGeometry args={[2.25, 1.45, .09]}/><meshStandardMaterial color="#344a50" metalness={.2} roughness={.18}/></mesh>
      <mesh position={[2.65, 1.75, 3.86]}><boxGeometry args={[2.25, 1.45, .09]}/><meshStandardMaterial color="#344a50" metalness={.2} roughness={.18}/></mesh>
      {[-2.45, 2.65].map(x => <mesh key={x} position={[x,1.75,3.93]}><boxGeometry args={[.055,1.55,.06]}/><meshStandardMaterial color="#242b2a"/></mesh>)}
      {/* side windows */}
      <mesh position={[4.52, 1.8, -.7]} rotation={[0,Math.PI/2,0]}><boxGeometry args={[1.8,1.2,.08]}/><meshStandardMaterial color="#344a50" metalness={.2} roughness={.18}/></mesh>
      <mesh position={[-4.52, 1.8, -.8]} rotation={[0,Math.PI/2,0]}><boxGeometry args={[1.8,1.2,.08]}/><meshStandardMaterial color="#344a50" metalness={.2} roughness={.18}/></mesh>
      {/* architectural accent fins */}
      <mesh position={[-3.9, 1.65, 3.9]}><boxGeometry args={[.18,2.9,.22]}/><meshStandardMaterial color="#b99a60"/></mesh>
      <mesh position={[3.95, 1.65, 3.9]}><boxGeometry args={[.18,2.9,.22]}/><meshStandardMaterial color="#b99a60"/></mesh>
      {/* lawn base */}
      <mesh position={[0,-.13,0]} receiveShadow><boxGeometry args={[15,.12,13]}/><meshStandardMaterial color="#69785a"/></mesh>
    </group>
  );
}

export default function StarterHouse3D() {
  return (
    <div className="starter-viewer">
      <Canvas shadows camera={{ position: [12, 8, 13], fov: 38 }}>
        <color attach="background" args={["#d9d6cc"]}/>
        <ambientLight intensity={1.1}/>
        <directionalLight position={[8,12,7]} intensity={2.1} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048}/>
        <Suspense fallback={null}>
          <HouseModel/>
          <ContactShadows position={[0,-.68,0]} opacity={.38} scale={19} blur={2.5} far={5}/>
          <Environment preset="city"/>
        </Suspense>
        <OrbitControls makeDefault minDistance={8} maxDistance={24} maxPolarAngle={Math.PI/2.05} target={[0,1,0]}/>
      </Canvas>
      <div className="viewer-hint"><RotateCcw size={14}/> Drag to rotate · Scroll to zoom</div>
    </div>
  );
}
