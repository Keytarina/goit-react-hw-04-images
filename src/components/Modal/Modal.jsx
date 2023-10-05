import PropTypes from 'prop-types';
import css from './Modal.module.css';
import { Component } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
    //Вішаемо слухача на подію 'keydown' при монтуванні компонента модального вікна
    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyEsc);
    }
    //Видаляємо слухач на подію 'keydown' при розмонтуванні компонента модального вікна
    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyEsc);
    }
    //Метод закриття модального вікна по Escape
    handleKeyEsc = (event) => {
        if(event.code === 'Escape') {
            this.props.onClose();
        }
    }
    //Метод закриття модального по кліку на backdrop
    handleBackdropClick = event => {
        if (event.target === event.currentTarget) {
            this.props.onClose();
        }
    };
    render() {
        return createPortal(
            <div className={css.Overlay} onClick={this.handleBackdropClick}>
                <div className={css.Modal}>{this.props.children}</div>
            </div>,
            modalRoot
        )
    }
}

Modal.propTypes = {
    onCLose: PropTypes.func,
    children: PropTypes.node.isRequired,
};