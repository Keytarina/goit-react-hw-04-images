import PropTypes from 'prop-types';
import css from './Modal.module.css';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ children, onClose}) => {
     //Після монтування компонента - додаємо слухача події keydown. При розмонтуванні - видаляємо цей слухач.    
    useEffect(() => {
        //Функція закриття модального вікна по Escape
        const handleKeyDown = event => {
            if(event.code === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', this.handleKeyEsc);
        //Видаляємо слухач на подію 'keydown' при розмонтуванні компонента модального вікна
        return () => {
            window.removeEventListener('keydown', this.handleKeyEsc);
        }
    }, [onClose]);
    //Метод закриття модального по кліку на backdrop
    const handleBackdropClick = event => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };
    return createPortal(
        <div className={css.Overlay} onClick={handleBackdropClick}>
            <div className={css.Modal}>{children}</div>
        </div>,
        modalRoot
    )
}

Modal.propTypes = {
    onCLose: PropTypes.func,
    children: PropTypes.node.isRequired,
};