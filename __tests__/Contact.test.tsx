import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Contact from '@/app/_components/Contact'

describe('Contact', () => {

    const mockContact = {
        id: 1,
        first_name: 'Alex',
        last_name: 'Wang',
        job: 'PM',
        description: 'this is description',
        deleteContact:() => jest.fn() 
    }
    it('renders Contact items', async () => {
        const { getByText, getByTestId } = render(<Contact {...mockContact}/>)
        expect(getByText(mockContact.first_name + " " + mockContact.last_name)).toBeInTheDocument()
        expect(getByText(mockContact.job)).toBeInTheDocument()
        expect(getByText(mockContact.description)).toBeInTheDocument()

        const testImage = document.querySelector("img") as HTMLImageElement
        expect(testImage.alt).toContain("mock avatar");
        await waitFor(() => {
            expect(screen.getByTestId('contact-edit-button')).toHaveAttribute('alt','Edit');
            expect(screen.getByTestId('contact-edit-button')).toHaveAttribute('src', '/_next/image?url=%2Fimg.jpg&w=96&q=75');
            expect(screen.getByTestId('contact-delete-button')).toHaveAttribute('alt','Delete');
            expect(screen.getByTestId('contact-delete-button')).toHaveAttribute('src','/_next/image?url=%2Fimg.jpg&w=96&q=75');
        });
    })

    it('renders click delete button should show confirmation modal', async () => {
        render(<Contact {...mockContact}/>)
        fireEvent.click(screen.getByTestId('contact-delete-button'))
        await waitFor(() => {
            expect(screen.getByTestId('confirmation-modal')).toBeInTheDocument()
        });
    })
})