import React ,{ useEffect } from 'react';
import { createPortal } from 'react-dom';
import './layout.css'

interface PropsType {
  uiqID: string
  text:string, 
  open:boolean,
  buttonColor: {
    cancelButton: string,
    confirmButton: string
  },
  handleConfirm:(arg:boolean, event?:any) => void,
  setConfirmModalOpen: (arg:boolean) => void
}

const ConfirmationModal = ( {uiqID, text, open, buttonColor, handleConfirm, setConfirmModalOpen}: PropsType ) => {
  
  useEffect(() => {
    const timerId = window.setTimeout(() => {
      setConfirmModalOpen(false);
    }, 55000);
    if (open) {
        timerId
    }
    return () => {
      window.clearTimeout(timerId);
    }
  }, [open]);
  
  return (
    open ?
    createPortal(
      <div data-testid='confirmation-modal'>
        <div className='modal '>
          <button onClick={() => handleConfirm(false)} className='modal__close'>&times;</button>
          <div className="confirm-content">
              <h4>CONFIRMATION!</h4>
              <div>
                <h2>{text}</h2>
                <p>Please click confirm or cancel button to continue</p>
              </div>
            </div>
            <div className="">
              <button data-testid='confirmation-cancel-button' className={`w-30 p-2 m-1 border-2 rounded-md md:w-36 ${buttonColor.cancelButton}`} onClick={() => handleConfirm(false)}>Cancel</button>
              <button data-testid='confirmation-confirm-button' className={`w-30 p-2 m-1 border-2 rounded-md md:w-36 text-white  ${buttonColor.confirmButton}`} onClick={() => handleConfirm(true)}>Confirm</button>
            </div>
        </div>
        <div 
          className="overlay" 
          onClick={() => handleConfirm(false)} 
        />
      </div>
      ,
    document.body, `confirmation-modal-${uiqID}`)
    : null
  )
}

  export default ConfirmationModal