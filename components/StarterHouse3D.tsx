"use client";

import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import { RotateCcw } from "lucide-react";
import * as THREE from "three";

const plaster = "#e6dfd2";
const charcoal = "#252b2a";
const glazing = "#526a70";
const timber = "#76563b";

function WindowUnit({ position, width, height, rotation = 0 }: { position: [number, number, number]; width: number; height: number; rotation?: number }) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <mesh><boxGeometry args={[width, height, .08]}/><meshStandardMaterial color={glazing} metalness={.28} roughness={.2}/></mesh>
      <mesh position={[0, 0, .055]}><boxGeometry args={[width + .16, height + .16, .07]}/><meshStandardMaterial color={charcoal}/></mesh>
      <mesh position={[0, 0, .1]}><boxGeometry args={[width, height, .025]}/><meshStandardMaterial color={glazing} metalness={.25} roughness={.18}/></mesh>
      <mesh position={[0, 0, .12]}><boxGeometry args={[.045, height, .025]}/><meshStandardMaterial color={charcoal}/></mesh>
      <mesh position={[0, 0, .12]}><boxGeometry args={[width, .045, .025]}/><meshStandardMaterial color={charcoal}/></mesh>
      <mesh position={[0, height / 2 + .13, .02]}><boxGeometry args={[width + .28, .12, .22]}/><meshStandardMaterial color="#c9bda9"/></mesh>
    </group>
  );
}

function Shrub({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  return <group position={position} scale={scale}>
    <mesh position={[0,.35,0]} castShadow><icosahedronGeometry args={[.42,1]}/><meshStandardMaterial color="#536b48" roughness={1}/></mesh>
    <mesh position={[.24,.27,.08]} castShadow><icosahedronGeometry args={[.3,1]}/><meshStandardMaterial color="#71835a" roughness={1}/></mesh>
  </group>;
}

function HouseModel() {
  return (
    <group position={[0, -.65, 0]}>
      {/* landscaped plot and low plinth */}
      <mesh position={[0,-.12,0]} receiveShadow><boxGeometry args={[17,.18,15]}/><meshStandardMaterial color="#738064" roughness={1}/></mesh>
      <mesh position={[0,.05,0]} receiveShadow><boxGeometry args={[9.6,.24,8.2]}/><meshStandardMaterial color="#aaa69b"/></mesh>
      <mesh position={[0,.19,0]} receiveShadow><boxGeometry args={[9.25,.12,7.9]}/><meshStandardMaterial color="#d0c6b4"/></mesh>

      {/* external walls: front facade has actual door and window openings */}
      <mesh position={[0,1.57,-3.78]} castShadow receiveShadow><boxGeometry args={[9.1,2.65,.24]}/><meshStandardMaterial color={plaster}/></mesh>
      <mesh position={[-4.43,1.57,0]} castShadow receiveShadow><boxGeometry args={[.24,2.65,7.8]}/><meshStandardMaterial color={plaster}/></mesh>
      <mesh position={[4.43,1.57,0]} castShadow receiveShadow><boxGeometry args={[.24,2.65,7.8]}/><meshStandardMaterial color={plaster}/></mesh>
      <mesh position={[-3.2,1.57,3.78]} castShadow><boxGeometry args={[2.5,2.65,.24]}/><meshStandardMaterial color={plaster}/></mesh>
      <mesh position={[3.05,1.57,3.78]} castShadow><boxGeometry args={[2.75,2.65,.24]}/><meshStandardMaterial color={plaster}/></mesh>
      <mesh position={[-.08,2.77,3.78]}><boxGeometry args={[3.85,.25,.24]}/><meshStandardMaterial color={plaster}/></mesh>

      {/* roof slab, overhang and parapet */}
      <mesh position={[0,2.98,0]} castShadow><boxGeometry args={[9.85,.28,8.65]}/><meshStandardMaterial color={charcoal} roughness={.7}/></mesh>
      <mesh position={[0,3.17,-4.12]}><boxGeometry args={[9.7,.28,.16]}/><meshStandardMaterial color={charcoal}/></mesh>
      <mesh position={[-4.72,3.17,0]}><boxGeometry args={[.16,.28,8.3]}/><meshStandardMaterial color={charcoal}/></mesh>
      <mesh position={[4.72,3.17,0]}><boxGeometry args={[.16,.28,8.3]}/><meshStandardMaterial color={charcoal}/></mesh>
      <mesh position={[0,2.89,0]}><boxGeometry args={[10.1,.1,8.9]}/><meshStandardMaterial color="#343a37"/></mesh>

      {/* entrance recess, timber door and porch canopy */}
      <mesh position={[-.08,1.35,3.93]} castShadow><boxGeometry args={[1.48,2.22,.12]}/><meshStandardMaterial color={timber} roughness={.6}/></mesh>
      <mesh position={[-.55,1.35,4.01]}><boxGeometry args={[.035,2.1,.025]}/><meshStandardMaterial color="#b18a5e"/></mesh>
      <mesh position={[.38,1.35,4.02]}><sphereGeometry args={[.045,16,16]}/><meshStandardMaterial color="#d4b36b" metalness={.75}/></mesh>
      <mesh position={[-.08,2.55,4.22]} castShadow><boxGeometry args={[2.15,.16,1.55]}/><meshStandardMaterial color="#b8a17b"/></mesh>
      <mesh position={[-.08,2.43,4.85]}><boxGeometry args={[2.15,.08,.12]}/><meshStandardMaterial color={charcoal}/></mesh>
      <mesh position={[-.08,.32,4.38]} receiveShadow><boxGeometry args={[2.6,.16,1.85]}/><meshStandardMaterial color="#a7a49a"/></mesh>
      <mesh position={[-.08,.42,5.22]}><boxGeometry args={[2.8,.08,.16]}/><meshStandardMaterial color="#d2c8b6"/></mesh>

      {/* front windows with dark aluminium frames */}
      <WindowUnit position={[-3.05,1.72,3.94]} width={1.8} height={1.35}/>
      <WindowUnit position={[3.05,1.72,3.94]} width={1.95} height={1.35}/>
      {/* side windows */}
      <WindowUnit position={[4.56,1.72,-.85]} width={1.75} height={1.25} rotation={Math.PI/2}/>
      <WindowUnit position={[-4.56,1.72,-.85]} width={1.45} height={1.2} rotation={-Math.PI/2}/>

      {/* contrasting stone-texture feature pier and vertical fins */}
      <mesh position={[4.08,1.55,3.93]} castShadow><boxGeometry args={[.72,2.7,.34]}/><meshStandardMaterial color="#a99a82" roughness={1}/></mesh>
      <mesh position={[-4.12,1.55,3.93]} castShadow><boxGeometry args={[.22,2.85,.34]}/><meshStandardMaterial color="#b89961"/></mesh>
      <mesh position={[1.92,1.5,3.96]}><boxGeometry args={[.1,2.5,.12]}/><meshStandardMaterial color="#b89961"/></mesh>

      {/* timber pergola over one side of the front patio */}
      {[-3.8,-2.85,-1.9].map(x => <mesh key={x} position={[x,2.55,4.55]}><boxGeometry args={[.12,.12,2.1]}/><meshStandardMaterial color={timber}/></mesh>)}
      <mesh position={[-2.85,2.65,4.55]}><boxGeometry args={[2.1,.14,.14]}/><meshStandardMaterial color={timber}/></mesh>
      <mesh position={[-2.85,2.65,5.45]}><boxGeometry args={[2.1,.14,.14]}/><meshStandardMaterial color={timber}/></mesh>

      {/* front path and planted beds */}
      {[-1,0,1].map((x,i) => <mesh key={x} position={[x*.78,-.005,6.15+i*.55]}><boxGeometry args={[.65,.07,.42]}/><meshStandardMaterial color="#c8c1b1"/></mesh>)}
      <mesh position={[-3.05,.02,4.65]}><boxGeometry args={[2.4,.12,1.05]}/><meshStandardMaterial color="#8b806b"/></mesh>
      <mesh position={[3.1,.02,4.65]}><boxGeometry args={[2.3,.12,1.05]}/><meshStandardMaterial color="#8b806b"/></mesh>
      <Shrub position={[-3.65,.08,4.55]} scale={.8}/>
      <Shrub position={[-2.65,.08,4.55]} scale={.72}/>
      <Shrub position={[2.55,.08,4.55]} scale={.72}/>
      <Shrub position={[3.55,.08,4.55]} scale={.8}/>
      <Shrub position={[-5.5,.02,-3.8]} scale={1.15}/>
      <Shrub position={[5.5,.02,-3.8]} scale={1.15}/>
      {/* driveway apron */}
      <mesh position={[5.1,-.015,5.45]}><boxGeometry args={[3.3,.08,3.8]}/><meshStandardMaterial color="#aaa99e"/></mesh>
    </group>
  );
}

export default function StarterHouse3D() {
  return (
    <div className="starter-viewer">
      <Canvas shadows dpr={[1, 1.75]} camera={{ position: [13, 8.2, 14], fov: 36 }}>
        <color attach="background" args={["#d9d6cc"]}/>
        <ambientLight intensity={.8}/>
        <directionalLight position={[8,12,7]} intensity={2.2} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048}/>
        <Suspense fallback={null}>
          <HouseModel/>
          <ContactShadows position={[0,-.54,0]} opacity={.42} scale={21} blur={2.6} far={5}/>
          <Environment preset="city"/>
        </Suspense>
        <OrbitControls makeDefault minDistance={8} maxDistance={25} maxPolarAngle={Math.PI/2.02} target={[0,1.1,0]} enableDamping dampingFactor={.08}/>
      </Canvas>
      <div className="viewer-hint"><RotateCcw size={14}/> Drag to rotate · Scroll to zoom</div>
    </div>
  );
}
