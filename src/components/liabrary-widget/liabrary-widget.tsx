// Component.js
import React from 'react';
import style from './liabrary-widget.module.scss';
import Image from 'next/image';
import WidgetLiabrary from '@/models/WidgetLiabrary';

interface LiabraryWidgetProps {
    //title?: string;
}

const widgetLiabraryData: WidgetLiabrary[] = [
    { id: 1, heading: 'Link 1', text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam' },
    { id: 2, heading: 'Link 2', text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam' },
    { id: 3, heading: 'Link 3', text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam' },
    { id: 4, heading: 'Link 4', text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam' },
    { id: 5, heading: 'Link 5', text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam' }
];

const LiabraryWidget: React.FC<LiabraryWidgetProps> = () => {
    return (
        <div className={style['liabrary-wrapper']}>
            <strong>Library Widgets</strong>
            <ul>


                {widgetLiabraryData.map((item, index) =>
                    <li key={item.id}>
                        <Image src={require(`../../../public/images/feed/library.png`)} alt='' className='responsive-img' />
                        <div>
                            <strong>{item.heading}</strong>
                            <p>{item.text}</p>
                        </div>
                    </li>
                )}

            </ul>
        </div>
    );
}

export default React.memo(LiabraryWidget);
