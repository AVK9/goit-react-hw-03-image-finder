import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from '../components/Modal/Modal';

export class App extends Component {
  state = {
    request: '',
    page: 1,
    isShowModal: false,
    modalImage: '',
  };
  formSubmitHandler = data => {
    this.setState({
      request: data,
    });
  };
  showModal = modalImage => {
    this.setState({ isShowModal: true, modalImage: modalImage });
  };
  closeModalBtn = () => {
    this.setState({ isShowModal: false });
  };
  // toggleModal = () => {
  //   this.setState(prev => ({
  //     isShowModal: !prev.isShowModal,
  //   }));
  // };

  render() {
    const { request, page, isShowModal, modalImage } = this.state;
    return (
      <>
        <ToastContainer autoClose={1500} />
        <Searchbar formSubmit={this.formSubmitHandler} />
        <ImageGallery
          request={request}
          page={page}
          showModal={this.showModal}
        />
        {isShowModal && (
          <Modal
            // toggleModal={this.toggleModal}
            closeModalBtn={this.closeModalBtn}
            modalImage={modalImage}
          />
        )}
      </>
    );
  }
}
