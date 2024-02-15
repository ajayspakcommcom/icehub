import React from "react";
import Link from "next/link";
import style from './form-footer.module.scss';

interface FormHeadingProps {
    linkText?: string;
    linkUrl?: string;
}

const FormFooter: React.FC<FormHeadingProps> = ({ linkText, linkUrl }) => {
    return (
        <div className={style['links']}>
            <p>Don’t have an account? <Link href={linkUrl!} title=""> {linkText} </Link> </p>
            <ul>
                <li><Link href="" title=""> About </Link></li>
                <li><span></span></li>
                <li><Link href="" title=""> Privacy & Terms </Link></li>
            </ul>
        </div>
    );
};

export default React.memo(FormFooter);
