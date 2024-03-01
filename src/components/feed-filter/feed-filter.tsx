import React from 'react';
import style from './feed-filter.module.scss';
import Image from 'next/image';
import FilterTask from '@/models/FiterTask';

interface FeedProps {
    //title?: string;
    setSelectedFilter: (id: string) => void;
}

const filterData: FilterTask[] = [
    {
        id: '65d734098abbb6154ff8afea',
        imageType: 'blog.png',
        taskText: 'Blogs'
    },
    {
        id: '65d734678abbb6154ff8aff0',
        imageType: 'case-study.png',
        taskText: 'Case Study'
    },
    {
        id: '65d7345d8abbb6154ff8afec',
        imageType: 'infographic.png',
        taskText: 'Infographics'
    },
    {
        id: '65d734618abbb6154ff8afee',
        imageType: 'video.png',
        taskText: 'Videos'
    },
];

const FeedFilter: React.FC<FeedProps> = ({ setSelectedFilter }) => {

    const [selectedIndex, setSelectedIndex] = React.useState<string>('65d734098abbb6154ff8afea');

    const handleFilterSelection = (id: string) => {
        setSelectedFilter(id);
        setSelectedIndex(id);
    };


    return (
        <>
            <div className={style['feed-filter-wrapper']}>

                <div className={style['dropdown']}>
                    <ul>

                        {filterData.map((item, index) =>
                            <li key={item.id} onClick={() => handleFilterSelection(item.id!)}>
                                <div className={item.id === selectedIndex ? style['active'] : ''}>
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
