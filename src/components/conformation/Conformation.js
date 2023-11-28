import React from 'react';
import './conformation.css';

const ConfirmationModal = ({ setConfirmBox, proceedFurther, message, btnName }) => {

    const cancelProcess = () => {
        return setConfirmBox(false);
    }

    return (
        <>
            <div className="confirmation-modal-wrapper">
                <div className="confirmation-modal-inner-wrapper">
                    <h3>CONFORMATION!</h3>
                    <p>{message}</p>
                    <div className="modals-action-btns">
                        <button onClick={proceedFurther} className="modal-proceed-btn">{btnName}</button>
                        <button onClick={cancelProcess} className="modal-cancel-btn">CANCEL</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ConfirmationModal;