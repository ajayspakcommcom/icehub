import React, { useState } from 'react';
import { useRouter } from 'next/router';

interface ViewMoreButtonProps {
    linkUrl: string;
}

const ViewMoreButton: React.FC<ViewMoreButtonProps> = ({ linkUrl }) => {

    const [link, setLink] = useState(linkUrl);
    const router = useRouter();


    const handleNavigation = (path: string) => {
        router.push(`${path}`);
    };

    return (
        <div>
            <p className='text-right view-more' onClick={() => handleNavigation(link)}>View more</p>
        </div>
    );
};

export default React.memo(ViewMoreButton);
