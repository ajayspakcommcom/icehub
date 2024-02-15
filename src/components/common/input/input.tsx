import React, { FC, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    // Additional props specific to your Input component
}

const Input: FC<InputProps> = ({...props}) => {
    return <input className="custom-input" {...props} />;
};

export default Input;
