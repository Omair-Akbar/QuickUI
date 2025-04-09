"use client";

import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  Environment,
  useAnimations,
} from "@react-three/drei";
import com1 from "@/public/com1.png"
import com2 from "@/public/com2.png"
import com3 from "@/public/com3.png"
import Image from "next/image";


function RobotModel({ mousePosition }:{mousePosition:any}) {
  const group = useRef();
  const { scene, animations } = useGLTF("/landingPageRobot.glb", true);
  const { actions, mixer } = useAnimations(animations, group);
  const modelRef = useRef();

  useEffect(() => {
    if (animations.length > 0) {
      const animationNames = Object.keys(actions);

      if (animationNames.length > 0) {
        const action = actions[animationNames[0]];
        if (action) {
          action.reset().fadeIn(0.5).play();
        }
      } else {
        animations.forEach((clip, index) => {
          const action = mixer.clipAction(clip);
          action.reset().fadeIn(0.5).play();
        });
      }
    }
  }, [scene, animations, actions, mixer]);

  useFrame((state, delta) => {
    if (mixer) {
      mixer.update(delta);
    }

    if (modelRef.current && mousePosition) {
      const targetRotationY =
        (mousePosition.x / window.innerWidth - 0.5) * Math.PI * 0.5;
      const targetRotationX =
        (mousePosition.y / window.innerHeight - 0.5) * Math.PI * 0.25;

      modelRef.current.rotation.y +=
        (targetRotationY - modelRef.current.rotation.y) * 0.05;
      modelRef.current.rotation.x +=
        (targetRotationX - modelRef.current.rotation.x) * 0.05;
    }
  });

  return (
    <group ref={group}>
      <primitive
        ref={modelRef}
        object={scene}
        scale={2.4}
        position={[0, -1, 0]}
      />
    </group>
  );
}

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e:any) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section
      id="hero-section"
      className="relative pt-24 pb-16 md:pt-32 md:pb-24"
    >
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#6E00FF]/30 blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-[#6E00FF]/30 blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Build <span className="text-[#6E00FF]">faster</span> with premium
              React & Next.js templates
            </h1>
            <p className="mt-6 text-gray-400 text-lg md:text-xl">
              Discover high-quality, customizable templates built by expert
              developers. Save time and launch your projects in minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-8">
              <Button className="bg-[#6E00FF] hover:bg-[#6E00FF]/80 text-white text-lg py-6 px-8">
                Browse Templates
              </Button>
              <Button
                variant="outline"
                className="border-[#6E00FF] text-white hover:bg-[#6E00FF]/10 text-lg py-6 px-8"
              >
                Sell Your Templates
              </Button>
            </div>

            <div className="mt-12 grid grid-cols-5 gap-y-4 items-center">
              <div className="col-span-5 md:col-span-2 text-sm text-white/50 mb-2 md:mb-0">
                Trusted by top developers from
              </div>
              <div className="col-span-5 md:col-span-3 flex flex-wrap justify-center lg:justify-start items-center gap-6">
                <Image
                  src={com1}
                  alt="NeoStack Inc."
                  className="h-8 w-8 opacity-50 hover:opacity-100 transition-all duration-500 ease-in-out hover:scale-105 hover:drop-shadow-[0_0_10px_#6E00FF]"
                />
                <Image
                  src={com3}
                  alt="CodeNova Labs"
                  className="h-8 w-8 opacity-50 hover:opacity-100 transition-all duration-500 ease-in-out hover:scale-105 hover:drop-shadow-[0_0_10px_#6E00FF]"
                />
                <Image
                  src={com2}
                  alt="PixelCraft Studio"
                  className="h-8 w-8 opacity-50 hover:opacity-100 transition-all duration-500 ease-in-out hover:scale-105 
             filter invert brightness-200 contrast-100 
             hover:drop-shadow-[0_0_12px_white]"
                />
                
              </div>
            </div>
          </div>

          <div
            id="robot-container"
            className="h-[400px] md:h-[500px] lg:h-[600px] w-full relative"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-[#6E00FF]/20 to-transparent rounded-full blur-md"></div>
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
              <ambientLight intensity={0.5} />
              <spotLight
                position={[10, 10, 10]}
                angle={0.15}
                penumbra={1}
                intensity={1}
                castShadow
              />
              <RobotModel mousePosition={mousePosition} />
              <Environment preset={"sunset"} />
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                enableRotate={false}
              />
            </Canvas>
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#121212] to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
