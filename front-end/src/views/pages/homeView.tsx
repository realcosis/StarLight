import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setTitle } from '../../core/hooks/pages/setTitle';

export const HomeView = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('starlight-session') == null)
            return navigate('/login');

        setTitle('Home');
    }, []);

    if (localStorage.getItem('starlight-session') != null)
        return <>

        </>;
}