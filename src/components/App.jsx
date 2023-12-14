import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './ModalWin/index';

export class App extends Component {
  state = {
    request: '',
    page: 1,
    isShowModal: false,
    modalImage: '',
  };
  formSubmitHandler = data => {
    if (this.state.request !== data) {
      this.setState({
        request: data,
      });
    } else {
      toast.warn('This request is already running, please enter another one');
    }
  };
  showModal = modalImage => {
    this.setState({
      isShowModal: true,
      modalImage: modalImage,
    });
  };
  closeModalBtn = () => {
    this.setState({ isShowModal: false, modalImage: '' });
  };
  // toggleModal = () => {
  //   this.setState(prev => ({
  //     isShowModal: !prev.isShowModal,
  //   }));
  // };
  //
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
          <Modal closeModalBtn={this.closeModalBtn} modalImage={modalImage} />
        )}
      </>
    );
  }
}
