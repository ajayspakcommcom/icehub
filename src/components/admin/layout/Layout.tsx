import React, { FC, ReactNode } from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material';
import dynamic from 'next/dynamic';

const AdminHeader = dynamic(() => import('@/components/admin/layout/Header'));
const AdminFooter = dynamic(() => import('@/components/admin/layout/Footer'));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

interface LayoutProps {
    children?: ReactNode;
}
const AdminLayout: FC<LayoutProps> = ({ children }) => {

    return (
        <>

            <Box sx={{ display: 'flex' }}>
                <AdminHeader />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <DrawerHeader />
                    <main>{children}</main>
                    <AdminFooter />
                </Box>
            </Box>


        </>
    );
};

export default React.memo(AdminLayout);
