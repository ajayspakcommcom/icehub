import React, { useEffect } from 'react';
import Image from 'next/image';


import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import AnnouncementCarouselImage from '@/models/AnnouncementCarouselImage';
import { getAnnouncementList } from '@/services/announcement-banner';

interface AnnouncementBannerProps {
}

const AnnouncementBanner: React.FC<AnnouncementBannerProps> = () => {

    const [announcements, setAnnouncements] = React.useState<AnnouncementCarouselImage[]>([]);

    const setting = {
        showThumbs: false,
        showArrows: false,
        className: 'banner-carousel'
    };

    useEffect(() => {

        const fetchAnnouncementDataList = async () => {
            try {

                const formData = new FormData();
                formData.append('type', 'LIST');
                const response = await getAnnouncementList(formData, localStorage.getItem('token')!);
                const responseData = response.data.data;
                console.log('responseData', responseData);
                setAnnouncements(responseData);
            } catch (error: any) {
                console.log('Error', error);
            }
        };

        fetchAnnouncementDataList();

        return () => console.log('unbind carousel images');
    }, []);

    return (
        <>
            <div className={'announcement-banner-wrapper'}>
                <Carousel {...setting}>
                    {announcements.map((image: AnnouncementCarouselImage) => (
                        <a key={image._id} href={image.imgLink} target='_blank'>
                            <div className={`content`}>
                                <img key={image._id} src={image.imgUrl} />
                                <div className="text-part"><p>{image.heading}</p></div>
                            </div>
                        </a>
                    ))}
                </Carousel>

            </div>
        </>
    );
};

export default React.memo(AnnouncementBanner);
