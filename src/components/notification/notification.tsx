import React from 'react';
import style from './notification.module.scss';
import Image from 'next/image';
import PendingTask from '@/models/PendingTask';

import dynamic from 'next/dynamic';
const ViewMoreButton = dynamic(() => import('@/components/view-more/view-more'));

interface NotificationProps {
    //title?: string;
}


const notificationData: PendingTask[] = [
    {
        id: 1,
        imageType: 'blog.png',
        taskName: 'Create a Blog',
        taskContent: 'Lorem Ipsum'
    },
    {
        id: 2,
        imageType: 'case-study.png',
        taskName: 'Creata a Case Study',
        taskContent: 'Lorem Ipsum'
    },
    {
        id: 3,
        imageType: 'infographic.png',
        taskName: 'Create a Infrographic',
        taskContent: 'Lorem Ipsum'
    },
    {
        id: 4,
        imageType: 'video.png',
        taskName: 'Create a Video',
        taskContent: 'Lorem Ipsum'
    },
];


const Notification: React.FC<NotificationProps> = () => {
    return (
        <>
            <div className={style['notification-wrapper']}>
                <Image src={require('../../../public/images/icons/notification.svg')} alt='' />

                <div className={style['dropdown']}>
                    <strong>Assigned Task</strong>
                    <ul>

                        {notificationData.map((item, index) =>
                            <li key={item.id}>
                                <div>
                                    <Image src={require(`../../../public/images/icons/${item.imageType}`)} alt='' className='responsive-img' />
                                </div>
                                <div>
                                    <div>
                                        <strong>{item.taskName}</strong>
                                        <p>{item.taskContent}</p>
                                    </div>
                                </div>
                                <div>
                                    <Image src={require('../../../public/images/icons/edit.png')} alt='' className='responsive-img' />
                                </div>
                            </li>
                        )}
                    </ul>

                    <ViewMoreButton linkUrl={'/login'} />

                </div>

            </div>
        </>
    );
};

export default React.memo(Notification);
