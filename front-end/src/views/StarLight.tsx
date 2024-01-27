import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export const StarLight = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (window.location.pathname == '/')
            navigate('/login');
    }, []);

    return <>
        <Outlet />
    </>;
}