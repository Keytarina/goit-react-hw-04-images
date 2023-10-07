import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem'

export const ImageGallery = ({ images }) => {
    return (
        <ul className={css.ImageGallery}>
            {images.map(image => (
                <ImageGalleryItem 
                    key={image.id} 
                    image={image}
                />
            ))}
        </ul>
    )
}

ImageGalleryItem.propTypes = {
    images: PropTypes.array,
};