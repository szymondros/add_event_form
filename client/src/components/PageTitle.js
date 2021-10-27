import React from 'react';
import propTypes from 'prop-types';

const PageTitle = ({text}) => {
    return (
        <>
            <h1 className='page-title' data-testid='page-title'>{text}</h1>
        </>
    );
};

PageTitle.propTypes = {
    text: propTypes.string
}

export default PageTitle;