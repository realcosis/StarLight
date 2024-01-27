import { useEffect } from 'react';
import { setTitle } from '../../core/hooks/pages/setTitle';

export const NitroView = () => {
    useEffect(() => {
        setTitle('Nitro');
    }, [window.location.pathname]);

    return <iframe src="http://localhost/nitro.html?sso=realcosis" className="w-[calc(100%-80px)] h-full absolute right-0"></iframe>;
}