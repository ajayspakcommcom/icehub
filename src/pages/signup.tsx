import * as React from 'react';
import dynamic from 'next/dynamic';
import Image from "next/image";
import BannerCarouselImage from "@/models/BannerCarouselImage";

const BannerCarousel = dynamic(() => import('@/components/carousel/banner-carousel'));
const FormHeading = dynamic(() => import('@/components/form-heading/form-heading'));
const FormFooter = dynamic(() => import('@/components/form-footer/form-footer'));
const SignupForm = dynamic(() => import('@/components/signup/SignupForm'), { ssr: false });

const images: BannerCarouselImage[] = [
  { id: 1, imageUrl: '1.png' },
  { id: 2, imageUrl: '1.png' },
  { id: 3, imageUrl: '1.png' },
];

export default function ComboBox() {
  return (
    <>

      <div className="login-wrapper">
        <div>
          <BannerCarousel images={images} />
        </div>
        <div>
          <div className="login-form-wrapper">
            <Image src={require('../../public/images/logo.png')} alt="Description of the image" className="responsive-img center" />
            <FormHeading heading={'Get Registered'} />
            <SignupForm />
            <FormFooter linkText={'Sign In'} linkUrl={'/login'} />
          </div>
        </div>
      </div>
    </>
  );
}
