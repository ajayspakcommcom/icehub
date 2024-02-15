import React from "react";
import styles from './form-heading.module.scss';

interface FormHeadingProps {
    heading: string;
}

const FormHeading: React.FC<FormHeadingProps> = ({ heading }) => {
    return (
        <div className={styles['form-heading-wrapper']}>
            <div></div>
            <div>
                <h2 className={styles['heading-text']}>{heading}</h2>
            </div>
            <div></div>
        </div>
    );
};

export default React.memo(FormHeading);
