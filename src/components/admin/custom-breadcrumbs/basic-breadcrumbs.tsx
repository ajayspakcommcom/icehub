import React, { MouseEvent } from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

interface BasicBreadcrumbsProps {
    links: { label: string, href: string }[]; // Array of objects containing label and href for each link
    currentPage: string; // Current page label
    onClick?: (label: string) => void; // Optional click handler
}

const BasicBreadcrumbs: React.FC<BasicBreadcrumbsProps> = ({ links, currentPage, onClick }) => {
    const handleClick = (event: MouseEvent<HTMLAnchorElement>, label: string) => {
        event.preventDefault();
        console.info(`You clicked the "${label}" breadcrumb.`);
        if (onClick) {
            onClick(label);
        }
    }

    return (
        <div className='basic-breadcrumbs-wrapper'>
            <Breadcrumbs aria-label="breadcrumb">
                {links.map((link, index) => (
                    <Link key={index} underline="hover" color="inherit" href={link.href} onClick={(e) => handleClick(e, link.label)}>{link.label}</Link>
                ))}
                <Typography color="text.primary">{currentPage}</Typography>
            </Breadcrumbs>
        </div>
    );
}

export default React.memo(BasicBreadcrumbs);
