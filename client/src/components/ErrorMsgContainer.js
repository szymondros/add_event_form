import React from 'react';

const ErrorMsgContainer = ({errors}) => {
    return (
        <div className='error-msg-wrapper' data-testid='error-container'>
            {
                errors?.isInputValid ? <></> : <span data-testid='error-span'>{errors?.errorMessage}</span>
            }
        </div>
    );
};

export default ErrorMsgContainer;