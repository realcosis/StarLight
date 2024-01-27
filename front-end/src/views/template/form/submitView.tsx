import { ReactEventHandler, ReactNode } from 'react';

type SubmitProps = {
    className?: string;
    type?: 'submit' | 'reset' | 'button';
    children: ReactNode;
    click: ReactEventHandler<HTMLButtonElement>;
}

export const SubmitView = (props: SubmitProps) => {
    const { className, type = 'submit', children, click } = props;

    return <>
        <button onClick={ evt => click(evt) } type={ type } className={ 'mb-[20px] py-[12px] px-[32px] outline-none border-[3px] border-[#2a9cde] rounded-[5px] bg-[#0f7dbc] text-white uppercase text-[16px] leading-[1] box-shadow-input transition-colors duration-[0.1s] ease-linear font-ubuntu font-bold hover:bg-[#2a9cde] hover:border-[#53bdf9] ' + className }>
            { children }
        </button>
    </>;
}