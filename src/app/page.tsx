'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';

import { useState } from 'react';
import './globals.css';
import { ResultParticles } from './components/ResultParticles';
import { GachaMachine } from './components/GachaMachine';

export default function Page() {
  const [result, setResult] = useState<string | null>(null);
  const [trigger, setTrigger] = useState(false);

  const handleDraw = (value: string) => {
    setResult(value);
    setTrigger(true);
    setTimeout(() => setTrigger(false), 1500);
  };

  return (
    <div className="container">
      <div className="overlay">
        <h1 className="title">오늘의 메뉴 추천은?</h1>
        {result && <p className="result">👉 {result} 👈</p>}
        <p className="hint">(가챠 머신을 클릭해보세요)</p>
      </div>

      <Canvas shadows camera={{position: [0,  0,  10], fov: 10}}>
        <ambientLight intensity={0.7} />
        <pointLight position={[10, 10, 10]} />
        <Environment preset="sunset" />
        <OrbitControls />
        <GachaMachine onDraw={handleDraw} />
        {trigger ? <ResultParticles trigger={trigger} /> : null}
      </Canvas>
    </div>
  );
}
