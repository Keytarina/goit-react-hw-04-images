import PropTypes from 'prop-types';
import { useState } from 'react';
import { Modal } from './Modal/Modal';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ image  }) => {
    const [showModal, setShowModal] = useState(false);
    
    //Функція-toggle модального вікна
    const toggleModal = () => {
        setShowModal(prevState => !prevState);
    };

    return (
        <li className={css.ImageGalleryItem}>
            <img 
                className={css.ImageGalleryItem_image}
                src={image.webformatURL} 
                alt={image.tags} 
                onClick={() => toggleModal()}
            />
            {showModal && (
                <Modal onClose={toggleModal}>
                    <img src={image.largeImageURL} alt={image.tags} />
                </Modal>
            )}
        </li>
    )
}

ImageGalleryItem.propTypes = {
    image: PropTypes.array.isRequired,
};