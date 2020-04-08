import React, { Component, MouseEvent, FunctionComponent, useRef, useEffect, useState } from "react";
import styles from './styles.css';
import { createUseStyles } from "react-jss";

export type ModalProps = {
    open: boolean,
    closeMethod: any
};


const useStyles = createUseStyles({
    modal: (props: any) => {
        const   modalWidth  = props.modalWidth,
                modalHeight = props.modalHeight;

        return {
            top: `calc(50% - ${modalHeight / 2}px)`,
            left: `calc(50% - ${modalWidth / 2}px)`,
        }
    }
})

export const Modal: FunctionComponent<ModalProps> = (props) => {
    const   [modalSize, setModalSize]   = useState({ modalWidth: 0, modalHeight: 0 }),
            modalRef                    = useRef(null),
            classes                     = useStyles({...props, ...modalSize});

    useEffect(() => {
        getModalSize();
        !props.open &&closeModal();
    }, [props.open]);

    function getModalSize() {
        setModalSize({
            modalWidth: modalRef.current.offsetWidth,
            modalHeight: modalRef.current.offsetHeight
        })
    }

    function closeModal() {
        props.closeMethod();
    }

    function handleClick(e: any) {
        e.target.className.includes('modalWrapper') && closeModal();
    }

    return (
        <div    className={`
                    ${styles.modalWrapper}
                    ${props.open ? styles.modalWrapperOpen : ''}
                `}
                onClick={(e) => handleClick(e)}>
            <div    className={`
                        ${styles.modal}
                        ${classes.modal}
                        ${props.open ? styles.modalOpen : ''}
                    `}
                    ref={modalRef}>
                {props.children}
            </div>
        </div>
    );
}

Modal.defaultProps = {
    open: false
};