import React, { useEffect } from 'react';
import './notification.css';

const Notify = ({ message, type, closeMessage }) => {

    useEffect(() => {
        const interval = setTimeout(() => {
            closeMessage();
        }, 5000);

        return () => {
            clearInterval(interval);
        }
    }, [closeMessage]);
    return (
        <>
            <div className={type === "success" ? "operation-message-wrapper success-type-only" : "operation-message-wrapper danger-type-only"}>
                <p>{message}</p>
                <button onClick={closeMessage}><i className="fa fa-times"></i></button>
            </div>
        </>
    )
}

export default Notify;