'use client';

import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import * as THREE from 'three';
import useSound from 'use-sound';

const restaurantList = ['🍜 라멘', '🍕 피자', '🥩 고기', '🍣 초밥', '🥗 샐러드'];

export function GachaMachine({ onDraw }: { onDraw: (result: string) => void }) {
  const { scene } = useGLTF('/gacha.glb');
  const ref = useRef<THREE.Group>(null!);
  const [shaking, setShaking] = useState(false);
  const [shakeTime, setShakeTime] = useState(0);
  const [play] = useSound('/pop.mp3', { volume: 0.7 });

  useFrame((_, delta) => {
    if (shaking) {
      setShakeTime((prev) => prev + delta);

      const t = shakeTime;
      ref.current.rotation.x = Math.sin(t * 20) * 0.05;
      ref.current.rotation.z = Math.sin(t * 30) * 0.05;

      if (shakeTime > 2) {
        setShaking(false);
        setShakeTime(0);

        const result = restaurantList[Math.floor(Math.random() * restaurantList.length)];
        play();
        onDraw(result);
      }
    }
  });

  const handleClick = () => {
    if (!shaking) {
      setShaking(true);
      setShakeTime(0);
    }
  };

  return (
    <group ref={ref} onClick={handleClick} scale={1.5} position={[-0.8, -0.5, 0]}>
      <primitive object={scene} />
    </group>
  );
}
