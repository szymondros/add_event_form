import React from 'react';
import { render } from '@testing-library/react';
import PageTitle from '../components/PageTitle';


describe('PageTitle component', () => {
    it('display any text from props', () => {
        const { getByTestId } = render(<PageTitle text='text for test' />);
        const title = getByTestId('page-title');
        expect(title.textContent).toBe('text for test');
    })
    it('should display title', () => {
        const textForTest = 'whatever';
        const { queryByText } = render(<PageTitle text={textForTest} />);
        expect(queryByText(textForTest)).toBeTruthy();
    })
    it('should display h1 element', () => {
        const { getByTestId } = render(<PageTitle />);
        const title = getByTestId('page-title');
        expect(title.tagName).toBe('H1');
    })
})
