import React, { useState, useEffect } from "react";
import { Modal } from 'components/Modal/Modal';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import imagesAPI from 'api/api';
import { ToastContainer, toast } from 'react-toastify';
import { ColorRing } from  'react-loader-spinner'
import 'react-toastify/dist/ReactToastify.css';
import css from 'components/App.module.css';

export const App = () => {
  const [searchValue, setSearchValue] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isEndCollection, setIsEndCollection] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [modalImageURL, setModalImageURL] = useState('');
  const [tags, setTags] = useState('');

  // async await
  useEffect((prevState) => {
    if(prevState.page !== page || prevState.searchValue !== searchValue) {
      setIsLoading(true);

      try {
        const response =  imagesAPI.getImages(searchValue, page);

        setImages(prevState => ([...prevState.images, ...response.hits]));

        if (!response.totalHits) {
          return toast.error(
            'Sorry, there are no images matching your search query. Please try again'
          );
        }

        const totalPages = Math.ceil(response.totalHits / 12);

        if (page === totalPages) {
          setIsEndCollection(true);
          toast.success('No more pictures');
        }
      } catch (error) {
        console.log('Error', error.message);
      } finally {
        setIsLoading(false);
      }
    }
  }, [ page, searchValue ]);

  const openModal = (url, tags) => {
    setIsShowModal(true);
    setModalImageURL(url);
    setTags(tags);
  };

  const closeModal = () => {
    setIsShowModal(false);
    setModalImageURL('');
    setTags('');
  };

  const formSubmitHandle = searchValue => {
    setSearchValue(searchValue);
    setImages([]);
    setPage(1)
  };

  const handleLoadMore = () => {
    setPage(prevState => (prevState.page + 1 ));
  }

  return (
    <div className={css.App}>
      {isShowModal && (
        <Modal onClose={closeModal}>
          <img src={modalImageURL} alt={tags} />
        </Modal>
      )}
      <Searchbar onSubmit={formSubmitHandle}/>
      {images.length > 0 && <ImageGallery images={images} onClick={openModal}/>}
      {images.length > 0 && !isEndCollection && <Button onClick={()=>{handleLoadMore()}}/>}
      {isLoading && <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={['#b8c480', '#B2A3B5', '#F4442E', '#51E5FF', '#429EA6']}
      />}
      <ToastContainer />
    </div>
  );
};
