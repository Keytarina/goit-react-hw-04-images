import React, { useState, useEffect } from 'react';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import imagesAPI from 'api/api';
import { ToastContainer, toast } from 'react-toastify';
import { ColorRing } from 'react-loader-spinner';

import 'react-toastify/dist/ReactToastify.css';
import css from 'components/App.module.css';

export const App = () => {
  const [searchValue, setSearchValue] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isEndCollection, setIsEndCollection] = useState(false);

  useEffect(() => {
    if (searchValue === '') {
      return;
    }
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await imagesAPI.getImages(searchValue, page);
        setImages(prevState => [...prevState, ...response.hits]);
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
    };
    fetchData();
  }, [searchValue, page]);

  const formSubmitHandle = searchValue => {
    setSearchValue(searchValue);
    setImages([]);
    setPage(1);
    setIsEndCollection(false);
  };

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <div className={css.App}>
      <ToastContainer />
      <Searchbar onSubmit={formSubmitHandle} />
      <ImageGallery images={images} />
      {images.length > 0 && !isEndCollection && (
        <Button onClick={handleLoadMore} />
      )}
      {isLoading && (
        <Loader>
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={['#b8c480', '#B2A3B5', '#F4442E', '#51E5FF', '#429EA6']}
          />
        </Loader>
      )}
    </div>
  );
};
