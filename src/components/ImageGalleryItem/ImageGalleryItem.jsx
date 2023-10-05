import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ webformatURL, largeImageURL, altText, onClick  }) => {
    return (
        <li className={css.ImageGalleryItem}>
            <img 
                className={css.ImageGalleryItem_image}
                src={webformatURL} 
                alt={altText} 
                onClick={() => onClick(largeImageURL, altText)}
            />
        </li>
    )
}

ImageGalleryItem.propTypes = {
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    altText: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};