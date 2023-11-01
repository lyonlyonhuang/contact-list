import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '@/app/_components/Header'


describe('Header', () => {
    it('render header Contact List',  () => {
        render(<Header />)
        const myElem = screen.getByText('Contact List') 
        expect(myElem).toBeInTheDocument() 
    })
})