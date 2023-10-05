import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem'

export const ImageGallery = ({ images, onClick }) => {
    return (
        <ul className={css.ImageGallery}>
            {images.map(item => (
                <ImageGalleryItem 
                    key={item.id} 
                    id={item.id}
                    webformatURL={item.webformatURL} 
                    largeImageURL={item.largeImageURL} 
                    altText={item.tags}
                    onClick={onClick}
                />
            ))}
        </ul>
    )
}

ImageGalleryItem.propTypes = {
    searchValue: PropTypes.string,
    images: PropTypes.array,
};