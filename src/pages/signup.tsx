import * as React from 'react';
import dynamic from 'next/dynamic';
import Image from "next/image";
import BannerCarouselImage from "@/models/BannerCarouselImage";
import { getHomeList } from "@/services/home-banner";

const BannerCarousel = dynamic(() => import('@/components/carousel/banner-carousel'));
const FormHeading = dynamic(() => import('@/components/form-heading/form-heading'));
const FormFooter = dynamic(() => import('@/components/form-footer/form-footer'));
const SignupForm = dynamic(() => import('@/components/signup/SignupForm'), { ssr: false });

const images: BannerCarouselImage[] = [];

export default function ComboBox() {

  const [bannerCarousels, setBannerCarousels] = React.useState<BannerCarouselImage[]>([]);

  React.useEffect(() => {

    const fetchHomeDataList = async () => {

      try {

        const formData = new FormData();
        formData.append('type', 'LIST');
        const response = await getHomeList(formData, localStorage.getItem('token')!);
        const responseData = response.data.data;
        setBannerCarousels(responseData);
      } catch (error: any) {
        console.log('Error : ', error);
      };
      return () => console.log('');
    }

    fetchHomeDataList();


  }, []);

  return (
    <>

      <div className="login-wrapper">
        <div>
          <BannerCarousel images={bannerCarousels} />
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
