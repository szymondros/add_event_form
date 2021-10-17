import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import Form from '../modules/Form';

describe('Form component', () => {

    it('should display form elements', () => {
        const { getByLabelText, getByRole } = render(<Form />)
        expect(getByLabelText(/first name/i)).toBeTruthy();
        expect(getByLabelText(/last name/i)).toBeTruthy();
        expect(getByLabelText(/e-mail address/i)).toBeTruthy();
        expect(getByLabelText(/date/i)).toBeTruthy();
        expect(getByRole('button')).toBeTruthy();
    })

    it('change input class to "error-input" after blur when value is empty', () => {
        const { queryAllByTestId } = render(<Form />);
        const inputs = queryAllByTestId('input');
        inputs.forEach((el) => {
            fireEvent.blur(el);
            expect(el.className).toBe('error-input');
        })
    })

    it('change input class to "correct-input" after blur when value is not empty', () => {
        const { getByLabelText } = render(<Form />);
        const textInput = getByLabelText(/first name/i);
        fireEvent.change(textInput, { target: { value: "john"}});
        setTimeout(() => {
            expect(textInput.className).toBe('correct-input');
        })
    })

    it('call function every time when input is blured', () => {
        const { queryAllByTestId } = render(<Form />);
        const blurValidationHandler = jest.fn();
        const inputs = queryAllByTestId('input');
        inputs.forEach( input => {
            fireEvent.blur(input);
        })
        setTimeout(() => {
            expect(blurValidationHandler).toBeCalledTimes(inputs.length);
        })
    })

    it('call function on submit', () => {
        const { getByRole } = render(<Form />);
        const btn = getByRole('button');
        const eventCreateHandler = jest.fn();
        fireEvent.click(btn);
        setTimeout(() => {
            expect(eventCreateHandler).toBeCalled();
        })
    })

})