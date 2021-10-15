import React from 'react';
import ErrorMsgContainer from './ErrorMsgContainer';

const Input = ({label, name, type, placeholder, errors, onChangeHandler, validationHandler, value}) => {
    return (
        <>
            <label htmlFor={name}>{label}</label>
            <input type={type}
                   name={name}
                   value={value}
                   autoComplete='nope'
                   className={errors?.isInputValid ? 'correct-input' : 'error-input'}
                   id={name}
                   placeholder={placeholder}
                   onChange={(e) => onChangeHandler(e)}
                   onBlur={(e) => validationHandler(e)}
            />
            <ErrorMsgContainer errors={errors} name='firstName'/>
        </>
    );
};

export default Input;