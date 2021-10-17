import React from 'react';
import { render } from '@testing-library/react';
import Input from '../components/Input';

describe('Input component', () => {
    const errors = {
        isInputValid: true,
    }
    it('change class according to the conditions', () => {
        const { getByTestId } = render(<Input errors={errors} />)
        const inputClassName = getByTestId('input').className;
        expect(inputClassName).toBe('correct-input');
    })
})