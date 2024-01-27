import { useCallback, useEffect, useState, KeyboardEvent } from 'react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTexts } from '../../core/hooks/localization/getTexts';
import { setTitle } from '../../core/hooks/pages/setTitle';
import { postRequest } from '../../core/hooks/request/postRequest';
import { storeSession } from '../../core/hooks/session/storeSession';
import { flashMessages } from '../../core/hooks/messages/flashMessages';
import { readSettings } from '../../core/hooks/settings/readSettings';
import { InputView } from '../template/form/inputView';
import { SubmitView } from '../template/form/submitView';
import { SessionModels } from '@starlight/core';

export const LoginView = () => {
    const navigate = useNavigate();
    const username = useRef<HTMLInputElement>();
    const password = useRef<HTMLInputElement>();

    useEffect(() => {
        if (localStorage.getItem('starlight-session') != null)
            return navigate('/home');

        setTitle(getTexts('login', 'title'));
    }, []);

    const submit = useCallback(() => {
        postRequest<SessionModels>('users/login', {
            'username': username.current.value,
            'password': password.current.value
        }, {
            csrf: sessionStorage.getItem('csrf')
        })
        .then(res => {
            if (res.status == 'error' && typeof res.data == 'string') {
                flashMessages('error', res.data);
            } else if (res.status == 'success' && typeof res.data == 'object') {
                flashMessages('success', getTexts('login', 'success-login-message').replace('{0}', readSettings('hotel_name')));
                storeSession(res.data);
                navigate('/game/nitro');
            }
        });
    }, [username, password]);

    const keyUp = useCallback((evt: KeyboardEvent) => {
        if (evt.key != 'Enter')
            return;

        submit();
    }, [username, password]);

    return <>
        <div className="w-[411px] h-full top-0 left-0 absolute bg-[#fff] bg-opacity-75 dark:bg-[#000] dark:bg-opacity-75 flex flex-col items-center justify-center">
            <div className="relative w-[90%]">
                <div className="relative w-full h-[53px] bg-[#fff] dark:bg-[#000] rounded-t-[10px] flex items-center justify-around">
                    <InputView inputRef={ username } keyUp={ keyUp } placeholder="Username" />
                </div>
                <div className="relative w-full h-[53px] bg-[#fff] dark:bg-[#000] flex items-center justify-around">
                    <InputView inputRef={ password } keyUp={ keyUp } placeholder="Password" type="password" />
                </div>
                <SubmitView className="relative w-full h-[53px]" click={ () => submit() }>
                    Enter
                </SubmitView>
            </div>
        </div>
    </>;
}