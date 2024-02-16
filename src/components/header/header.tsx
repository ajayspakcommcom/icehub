import React from 'react';
import style from './header.module.scss';
import { Container, Grid } from '@mui/material';
import Image from 'next/image';

import dynamic from 'next/dynamic';
const Notification = dynamic(() => import('@/components/notification/notification'));

interface HeaderProps {
    //title?: string;
}


const Header: React.FC<HeaderProps> = () => {
    return (
        <header className={style['header-wrapper']}>
            <Container>
                <Grid container>
                    <Grid item xs={3} className={style['flex-v-center']}>
                        <Image src={require('../../../public/images/feed-logo.png')} alt="Logo" layout="responsive responsive-img" />
                    </Grid>
                    <Grid item xs={6} className={style['flex-v-center']}>
                        <span className={style.test}>asdasd</span>
                    </Grid>
                    <Grid item xs={3} className={`${style['flex-v-center']} ${style['flex-h-end']}`}>
                        <Notification />
                    </Grid>
                </Grid>
            </Container>
        </header>
    );
};

export default React.memo(Header);
