"use client";
import { useEffect, useRef, useState } from "react";

interface KakaoMapProps {
  lat: number;
  lng: number;
}

export function KakaoMap({ lat, lng }: KakaoMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkSdk = setInterval(() => {
      if (window.kakao && window.kakao.maps && window.kakao.maps.load) {
        clearInterval(checkSdk);
      }
    }, 100);
    return () => clearInterval(checkSdk);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!mapRef.current || !window.kakao?.maps?.load) return;

      window.kakao.maps.load(() => {
        const center = new window.kakao.maps.LatLng(lat, lng);

        const map = new window.kakao.maps.Map(mapRef.current, {
          center,
          level: 3,
        });

        new window.kakao.maps.Marker({
          map,
          position: center,
        });

        map.relayout(); 
        map.setCenter(center);
      });
    }, 500);

    return () => clearTimeout(timeout);
  }, [lat, lng]);

  return (
    <div
      ref={mapRef}
      style={{
        width: "300px",
        height: "240px",
        borderRadius: "12px",
        backgroundColor: "#f0f0f0",
      }}
    />
  );
}