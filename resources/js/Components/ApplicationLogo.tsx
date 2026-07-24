import { HTMLAttributes } from 'react';
import LOGO211 from '@/Assets/logo_211.webp'

export default function ApplicationLogo(props: HTMLAttributes<HTMLElement>) {
    return (
        <picture {...props}>
            <img
                src={LOGO211}
                alt="Logo del CBTIS 211"
                title="Logo del CBTIS 211"
                width="100"
                height="100"
                loading="eager"
                decoding="async"
                className="block w-full h-full "
            />
        </picture>
    );
}
