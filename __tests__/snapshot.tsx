import { render, screen } from '@testing-library/react'
import Home from '@/app/page'
import Contacts from '@/app/contact/page'
import Contact from '@/app/_components/Contact'
import Header from '@/app/_components/Header'
import ConfirmationModal from '@/app/_components/ConfirmationModal'

describe('Home', () => {
    it('renders homepage unchanged', () => {
        const { container } = render(<Home />)
        expect(container).toMatchSnapshot()
    })
})

describe('Contacts', () => {
    it('renders Contacts unchanged', () => {
        const { container } = render(<Contacts />)
        expect(container).toMatchSnapshot()
    })
})

describe('Contact', () => {
    const mockContact = {
        id: 1,
        first_name: 'Alex',
        last_name: 'Wang',
        job: 'PM',
        description: 'this is description',
        deleteContact:() => jest.fn() 
    }
    it('renders Contact unchanged', () => {
        const { container } = render(<Contact {...mockContact}/>)
        expect(container).toMatchSnapshot()
    })
})

describe('Header', () => {
    it('renders Header unchanged', () => {
        const { container } = render(<Header />)
        expect(container).toMatchSnapshot()
    })
})

describe('ConfirmationModal', () => {
    const mockModal = {
        uiqID: '1',
        text: 'Delete', 
        open:true,
        buttonColor: {
          cancelButton: 'border-2 border-red-500 text-red-500 hover:bg-red-100',
          confirmButton: 'border-2 border-red-500 bg-red-500 hover:bg-red-400'
        },
        handleConfirm:() => jest.fn() ,
        setConfirmModalOpen: () => jest.fn() 
    }
    it('renders ConfirmationModal unchanged', () => {
        const { container } = render(<ConfirmationModal 
            text={mockModal.text} 
            open={mockModal.open} 
            buttonColor={mockModal.buttonColor} 
            uiqID={mockModal.uiqID}
            handleConfirm={mockModal.handleConfirm}
            setConfirmModalOpen={mockModal.setConfirmModalOpen}
        />)
        expect(container).toMatchSnapshot()
    })
})