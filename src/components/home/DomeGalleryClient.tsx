"use client";

import dynamic from "next/dynamic";

const DomeGallery = dynamic(
  () => import("../../../react-bits/src/ts-tailwind/Components/DomeGallery/DomeGallery"),
  { ssr: false }
);

export default function DomeGalleryClient() {
  return <DomeGallery />;
}