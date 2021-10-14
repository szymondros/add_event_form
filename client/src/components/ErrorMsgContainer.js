import React from 'react';
import {ErrorMessage} from "@hookform/error-message";

const ErrorMsgContainer = ({errors, name}) => {
    return (
        <div className="error-msg-wrapper">
            <ErrorMessage as={<div className={"error-message"}/>} errors={errors} name={name}/>
        </div>
    );
};

export default ErrorMsgContainer;