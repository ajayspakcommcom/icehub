// Layout.tsx
import React, { FC, ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { Container } from '@mui/material';

const Header = dynamic(() => import('./Header'), {ssr: true});
const Footer = dynamic(() => import('./Footer'), { ssr: true });

interface LayoutProps {
    children: ReactNode;
}
const Index: FC<LayoutProps> = ({ children }) => {

    return (
        <>
            <main>{children}</main>
        </>
    );
};

export default React.memo(Index);
