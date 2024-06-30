"use client";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Float, Environment } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Shapes() {
  return (
    <div className="row-span-1 row-start-1 -mt-9 aspect-square md:col-span-1 md:col-start-2 md:mt-0">
      <Canvas
        className="z-0"
        shadows
        gl={{ antialias: false }}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 25], fov: 30, near: 1, far: 40 }}
      >
        <Suspense fallback={null}>
          <Geometries />
          <ContactShadows
            position={[0, -3.5, 0]}
            opacity={0.65}
            scale={40}
            blur={1}
            far={9}
          />
          <Environment preset="studio" />
        </Suspense>
      </Canvas>
    </div>
  );
}

function Geometries() {
  const geometries = [
    {
      position: [0, 0, 0],
      r: 0.3,
      geometry: new THREE.IcosahedronGeometry(3), // gem
    },
    {
      position: [1, -0.75, 4],
      r: 0.3,
      geometry: new THREE.CapsuleGeometry(0.5, 1.6, 2, 16), // gem
    },
    {
      position: [-1.4, 2, -4],
      r: 0.3,
      geometry: new THREE.DodecahedronGeometry(1.6), // gem
    },
    {
      position: [-0.8, -0.75, 5],
      r: 0.3,
      geometry: new THREE.TorusGeometry(0.6, 0.25, 16, 32), // gem
    },
    {
      position: [1.6, 1.6, -4],
      r: 0.3,
      geometry: new THREE.OctahedronGeometry(1.5), // gem
    },
  ];

  const materials = [
    new THREE.MeshNormalMaterial(),
    new THREE.MeshStandardMaterial({
      color: "brown",
      roughness: 0.5,
      metalness: 0.5,
    }),
    new THREE.MeshStandardMaterial({
      color: "skyblue",
      roughness: 0.4,
      metalness: 0.5,
    }),
    new THREE.MeshStandardMaterial({
      color: "aqua",
      roughness: 0.7,
      metalness: 0.5,
    }),
    new THREE.MeshStandardMaterial({
      color: "lime",
      roughness: 0.3,
      metalness: 0.5,
    }),
    new THREE.MeshStandardMaterial({
      color: "tomato",
      roughness: 0.8,
      metalness: 0.5,
    }),
    new THREE.MeshStandardMaterial({
      color: "navy",
      metalness: 0.5,
      metalness: 0.9,
    }),
    new THREE.MeshStandardMaterial({
      color: "blueviolet",
      metalness: 0.5,
      roughness: 1,
    }),
  ];
  const soundEffects = [
    new Audio("/sounds/knock.ogg"),
    new Audio("/sounds/knock-2.ogg"),
    new Audio("/sounds/knock-3.ogg"),
  ];
  return geometries.map(({ position, r, geometry }) => (
    <Geometry
      key={JSON.stringify(position)}
      position={position.map((p) => p * 2)}
      geometry={geometry}
      soundEffects={soundEffects}
      materials={materials}
      r={r}
    />
  ));
}

function Geometry({ r, position, geometry, materials, soundEffects }) {
  const meshRef = useRef();
  const [visiable, setVisiable] = useState(false);
  const startingMaterial = getRandomMaterial();
  function getRandomMaterial() {
    return gsap.utils.random(materials);
  }
  function handleClick(e) {
    const mesh = e.object;
    gsap.utils.random(soundEffects).play();
    gsap.to(mesh.rotation, {
      x: `+=${gsap.utils.random(0, 2)}`,
      y: `+=${gsap.utils.random(0, 2)}`,
      z: `+=${gsap.utils.random(0, 2)}`,
      duration: gsap.utils.random(0.5, 1),
      ease: "elastic.out(1, 0.3)",
      yoyo: true,
    });
    mesh.material = getRandomMaterial();
  }
  const handlePointerOver = () => {
    document.body.style.cursor = "pointer";
  };
  const handlePointerOut = () => {
    document.body.style.cursor = "default";
  };
  useEffect(() => {
    let ctx = gsap.context(() => {
      setVisiable(true);
      gsap.from(meshRef.current.scale, {
        x: 0,
        y: 0,
        z: 0,
        duration: 1,
        ease: "elastic.out(1, 0.3)",
        yoyo: true,
        delay: 0.3,
      });
    });
    return () => ctx.revert();
  }, []);
  return (
    <group position={position} ref={meshRef}>
      <Float speed={5 * r} rotationIntensity={6 * r} floatIntensity={5 * r}>
        <mesh
          geometry={geometry}
          onClick={handleClick}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
          visiable={visiable}
          material={startingMaterial}
        />
      </Float>
    </group>
  );
}
