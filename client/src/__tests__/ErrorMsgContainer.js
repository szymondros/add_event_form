import React from 'react';
import { render } from '@testing-library/react';
import ErrorMsgContainer from '../components/ErrorMsgContainer';

describe('ErrorMsgContainer component', () => {
    it('display error message when input is not valid', () => {
        const errors = {
            isInputValid: false,
        }
        const { getByTestId } = render(<ErrorMsgContainer errors={errors} />)
        const container = getByTestId('error-container');
        const span = getByTestId('error-span');
        expect(container).toBeTruthy();
        expect(span).toBeTruthy();
    })
})