import React from 'react';
import ErrorMsgContainer from './ErrorMsgContainer';
import propTypes from "prop-types";

const Input = ({label, name, type, placeholder, errors, onChangeHandler, validationHandler, value}) => {
    return (
        <>
            <label htmlFor={name}>{label}</label>
            <input data-testid="input"
                   type={type}
                   name={name}
                   value={value}
                   autoComplete='nope'
                   className={errors?.isInputValid ? 'correct-input' : 'error-input'}
                   id={name}
                   placeholder={placeholder}
                   onChange={(e) => onChangeHandler(e)}
                   onBlur={(e) => validationHandler(e)}
            />
            <ErrorMsgContainer errors={errors} />
        </>
    );
};

Input.propTypes = {
    label: propTypes.string,
    name: propTypes.string,
    type: propTypes.string,
    placeholder: propTypes.string,
    errors: propTypes.object,
    onChangeHandler: propTypes.func,
    validationHandler: propTypes.func,
    value: propTypes.string
}

export default Input;