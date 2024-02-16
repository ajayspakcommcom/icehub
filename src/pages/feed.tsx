"use client";
import React from "react";
import BannerCarouselImage from "@/models/BannerCarouselImage";
import Image from "next/image";
import dynamic from 'next/dynamic';
const Header = dynamic(() => import('@/components/header/header'));




export default function SignInOne() {

  return (
    <>
      <Header />
    </>
  );
}
