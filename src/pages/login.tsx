"use client";
import React from "react";
import BannerCarouselImage from "@/models/BannerCarouselImage";
import Image from "next/image";
import dynamic from 'next/dynamic';

const BannerCarousel = dynamic(() => import('@/components/carousel/banner-carousel'));
const LoginForm = dynamic(() => import('@/components/login/login'));
const FormHeading = dynamic(() => import('@/components/form-heading/form-heading'));
const FormFooter = dynamic(() => import('@/components/form-footer/form-footer'));


const images: BannerCarouselImage[] = [
  { id: 1, imageUrl: '1.png' },
  { id: 2, imageUrl: '1.png' },
  { id: 3, imageUrl: '1.png' },
];


export default function SignInOne() {

  return (
    <>
      <div className="login-wrapper">
        <div>
          <BannerCarousel images={images} />
        </div>
        <div>
          <div className="login-form-wrapper">
            <Image src={require('../../public/images/logo.png')} alt="Description of the image" className="responsive-img center" />
            <FormHeading heading={'Sign in'} />
            <LoginForm />
            <FormFooter linkText={'Sign Up'} linkUrl={'/signup'} />
          </div>
        </div>
      </div>
    </>
  );
}
