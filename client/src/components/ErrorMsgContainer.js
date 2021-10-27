import React from 'react';
import propTypes from 'prop-types';

const ErrorMsgContainer = ({errors}) => {
    return (
        <div className='error-msg-wrapper' data-testid='error-container'>
            {
                errors?.isInputValid ? <></> : <span data-testid='error-span'>{errors?.errorMessage}</span>
            }
        </div>
    );
};

ErrorMsgContainer.propTypes = {
    errors: propTypes.object
}

export default ErrorMsgContainer;