import React from 'react';

const PageContainer = ({children}) => {
    return (
        <div className='page-container'>
            {children}
        </div>
    );
};

export default PageContainer;