"use client";

import dynamic from "next/dynamic";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

const Beams = dynamic(
  () => import("../../../react-bits/src/ts-tailwind/Backgrounds/Beams/Beams"),
  { ssr: false }
);

export default function BeamsBackground({ className = "" }: { className?: string }) {
  const reduceMotion = usePrefersReducedMotion();
  return (
    <div className={className} aria-hidden>
      {reduceMotion ? (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-800 to-black opacity-70" />
      ) : (
        <Beams
          beamWidth={2.6}
          beamHeight={20}
          beamNumber={14}
          lightColor="#ffffff"
          speed={1.8}
          noiseIntensity={2.5}
          scale={0.33}
          rotation={231}
        />
      )}
    </div>
  );
}