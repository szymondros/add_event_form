import React from 'react';

const ErrorMsgContainer = ({errors, name}) => {
    return (
        <div className="error-msg-wrapper">
            {
                errors.isInputValid ? <></> : <span>{errors?.errorMessage}</span>
            }
        </div>
    );
};

export default ErrorMsgContainer;