import React, { Component } from "react";
import { Modal } from 'components/Modal/Modal';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import imagesAPI from 'api/api';
import { ToastContainer, toast } from 'react-toastify';
import { ColorRing } from  'react-loader-spinner'
import 'react-toastify/dist/ReactToastify.css';
import css from 'components/App.module.css';

export class App extends Component {
  state = {
    searchValue: '',
    images: [],
    page: 1,
    isLoading: false,
    isEndCollection: false,
    isShowModal: false,
    modalImageURL: '',
    tags: '',
  };

  async componentDidUpdate(_, prevState) {
    const {page, searchValue} = this.state;
    if(prevState.page !== page || prevState.searchValue !== searchValue) {
      this.setState({ isLoading: true });

      try {
        const response = await imagesAPI.getImages(searchValue, page);

        this.setState(prevState => ({
          images: [...prevState.images, ...response.hits],
        }));

        if (!response.totalHits) {
          return toast.error(
            'Sorry, there are no images matching your search query. Please try again'
          );
        }

        const totalPages = Math.ceil(response.totalHits / 12);

        if (page === totalPages) {
          this.setState({ isEndCollection: true });
          toast.success('No more pictures');
        }
      } catch (error) {
        console.log('Error', error.message);
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  openModal = (url, tags) => {
    this.setState({
      isShowModal: true,
      modalImageURL: url,
      tags,
    });
  };

  closeModal = () => {
    this.setState({
      isShowModal: false,
      modalImageURL: '',
      tags: '',
    });
  };

  formSubmitHandle = searchValue => {
    this.setState({ searchValue, images: [], page: 1 });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  }

  render () {
    const { isShowModal, modalImageURL, tags, images, isLoading, isEndCollection } = this.state;
    return (
      <div className={css.App}>
        {console.log(this.state)}
        {isShowModal && (
          <Modal onClose={this.closeModal}>
            <img src={modalImageURL} alt={tags} />
          </Modal>
        )}
        <Searchbar onSubmit={this.formSubmitHandle}/>
        {images.length > 0 && <ImageGallery images={images} onClick={this.openModal}/>}
        {images.length > 0 && !isEndCollection && <Button onClick={()=>{this.handleLoadMore()}}/>}
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
  }
};
