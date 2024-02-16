import React from 'react';
import style from './feed-filter.module.scss';
import Image from 'next/image';
import FilterTask from '@/models/FiterTask';

interface FeedProps {
    //title?: string;
}

const filterData: FilterTask[] = [
    {
        id: 1,
        imageType: 'blog.png',
        taskText: 'Blogs'
    },
    {
        id: 2,
        imageType: 'case-study.png',
        taskText: 'Case Study'
    },
    {
        id: 3,
        imageType: 'infographic.png',
        taskText: 'Infographics'
    },
    {
        id: 4,
        imageType: 'video.png',
        taskText: 'Videos'
    },
];

const FeedFilter: React.FC<FeedProps> = () => {
    return (
        <>
            <div className={style['feed-filter-wrapper']}>

                <div className={style['dropdown']}>
                    <ul>

                        {filterData.map((item, index) =>
                            <li key={item.id}>
                                <div className={index === 0 ? style['active'] : ''}>
                                    <div>
                                        <Image src={require(`../../../public/images/icons/${item.imageType}`)} alt='' className='responsive-img' />
                                    </div>
                                    <div><strong>{item.taskText}</strong></div>
                                </div>
                            </li>)}
                    </ul>
                </div>

            </div>
        </>
    );
};

export default React.memo(FeedFilter);
