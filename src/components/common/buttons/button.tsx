import React, { FC, ButtonHTMLAttributes, useEffect } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    // Additional props specific to your Button component
    primary?: boolean;
}

const Button: FC<ButtonProps> = ({ primary, ...props }) => {
    const buttonClassName = primary ? 'primary-button' : 'secondary-button';
    return <button className={buttonClassName} {...props} />;
};

export default React.memo(Button);

