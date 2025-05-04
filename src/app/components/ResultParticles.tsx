// components/ResultParticles.tsx
import { useEffect, useMemo } from "react";
import * as THREE from "three";

export function ResultParticles({ trigger }: { trigger: boolean }) {
  const count = 150;
  const radius = 1;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * 2 * Math.PI;
      const r = Math.random() * radius;
      arr[i * 3] = Math.cos(angle) * r;
      arr[i * 3 + 1] = Math.random() * 2;
      arr[i * 3 + 2] = Math.sin(angle) * r;
    }
    return arr;
  }, [trigger]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  useEffect(() => {
    if (trigger) {
      setTimeout(() => {}, 1500);
    }
  }, [trigger]);

  return (
    <points geometry={geometry}>
      <pointsMaterial color="hotpink" size={0.1} />
    </points>
  );
}
