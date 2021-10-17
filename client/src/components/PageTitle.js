import React from 'react';

const PageTitle = ({text}) => {
    return (
        <>
            <h1 className='page-title' data-testid='page-title'>{text}</h1>
        </>
    );
};

export default PageTitle;