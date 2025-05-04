'use client';

import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import * as THREE from 'three';

import { getRestaurant, Restaurant } from '../apis/getRestaurant';

export function GachaMachine({ onDraw }: { onDraw: (result: string) => void }) {
  const isFetching = useRef(false); 
  const restaurantResultRef = useRef<Restaurant | null>(null);

  const { scene } = useGLTF('/gacha.glb');
  const ref = useRef<THREE.Group>(null!);
  const [shaking, setShaking] = useState(false);
  const [shakeTime, setShakeTime] = useState(0);
  
  useFrame((_, delta) => {
    if (shaking) {
      setShakeTime((prev) => prev + delta);
  
      const t = shakeTime;
      ref.current.rotation.x = Math.sin(t * 20) * 0.05;
      ref.current.rotation.z = Math.sin(t * 30) * 0.05;
  
      if (shakeTime > 2) {
        setShaking(false);
        setShakeTime(0);
        isFetching.current = false;
  
        const result = restaurantResultRef.current;   // 여기서 보여줄 결과 반영!
        onDraw(result?.name ?? '아무거나');
      }
    }
  });
  
const handleClick = async () => {
  if (shaking || isFetching.current) return;
  isFetching.current = true;

  setShaking(true);
  setShakeTime(0);

  try {
    const data = await getRestaurant();
    restaurantResultRef.current = data; // 결과를 미리 저장해놓기
  } catch (error) {
    console.error(error);
    restaurantResultRef.current = { name: '아무거나', address: '아무거나', category_name: '아무거나' };
  }
};
  return (
    <group ref={ref} onClick={handleClick} scale={1.5} position={[-0.8, -0.5, 0]}>
      <primitive object={scene} />
    </group>
  );
}
