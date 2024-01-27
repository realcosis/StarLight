import { useEffect } from 'react';
import { useRouteError } from 'react-router-dom';
import { setTitle } from '../core/hooks/pages/setTitle';

export const Error = () => {
    const error: any = useRouteError();

    useEffect(() => {
        setTitle('Error');
        console.log(error);
    }, []);

    return <>
        
    </>;
}