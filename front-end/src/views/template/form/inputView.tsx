import { KeyboardEventHandler, MutableRefObject } from 'react';

type InputProps = {
    className?: string;
    type?: string;
    placeholder: string;
    readonly?: boolean;
    autofocus?: boolean;
    required?: boolean;
    inputRef: MutableRefObject<HTMLInputElement>;
    keyUp: KeyboardEventHandler<HTMLInputElement>;
}

export const InputView = (props: InputProps) => {
    const { className, inputRef, keyUp, type = 'text', placeholder, readonly = false, autofocus = false, required = true } = props;

    return <>
        <input ref={ inputRef } onKeyUp={ evt => keyUp(evt) } type={ type } placeholder={ placeholder } className={ 'mb-[20px] py-[5px] px-[12px] outline-none border-[3px] border-[#275d8e] rounded-[5px] bg-[#ccd8df] text-[16px] leading-[1.2] box-shadow-input transition-colors duration-[0.1s] ease-linear font-inter focus:bg-white focus:text-black ' + className } required={ required } autoFocus={ autofocus } readOnly={ readonly } />
    </>;
}