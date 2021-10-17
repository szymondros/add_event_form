import React from 'react';
import { render } from '@testing-library/react';
import SubmitBtn from '../components/SubmitBtn';

describe('SubmitBtn component', () => {
    it('display button element with any text', () => {
        const { getByRole } = render(<SubmitBtn />);
        const btn = getByRole('button');
        expect(btn).toBeTruthy();
        expect(btn.textContent).toBeTruthy();
    })
})