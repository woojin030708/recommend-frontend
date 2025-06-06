"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";

import { useState } from "react";
import "./globals.css";
import { ResultParticles } from "./components/ResultParticles";
import { GachaMachine } from "./components/GachaMachine";
import { KakaoMap } from "./map";

export default function Page() {
  const [selectedCategory, setSelectedCategory] = useState<string>("전체");
  const [result, setResult] = useState<string | null>(null);
  const [trigger, setTrigger] = useState(false);
  const [map, setMap] = useState({
    place: "http://place.map.kakao.com",
    x: 126.9572222,
    y: 37.4963538,
  });
  const handleDraw = (value: string) => {
    setResult(value?.name);
    setMap({
      place: value?.place,
      x: Number(value?.x),
      y: Number(value?.y),
    });
    setTrigger(true);
    setTimeout(() => setTrigger(false), 1500);
  };

  return (
    <div className="container">
      <div className="overlay">
        <h2 className="title">오늘의 숭실 추천은?</h2>

        <div className="category-list">
          {["전체", "한식", "일식", "중식", "간식"].map((category) => (
            <p
              key={category}
              className={`category ${
                selectedCategory === category ? "active" : ""
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </p>
          ))}
        </div>

        {result ? (
          <>
            <p className="result">
              👉{" "}
              <a href={map.place} target="_blank">
                {result}
              </a>{" "}
              👈
            </p>
          </>
        ) : null}
        <p className="hint">(가챠 머신을 클릭해보세요)</p>
      </div>
      <div className="map">
        <KakaoMap lat={map.y} lng={map.x} />
      </div>
      <Canvas shadows camera={{ position: [0, 0, 10], fov: 10 }}>
        <ambientLight intensity={0.7} />
        <pointLight position={[10, 10, 10]} />
        <Environment preset="sunset" />
        <OrbitControls />
        <GachaMachine onDraw={handleDraw} selectedCategory={selectedCategory} />
        {trigger ? <ResultParticles trigger={trigger} /> : null}
      </Canvas>
    </div>
  );
}
