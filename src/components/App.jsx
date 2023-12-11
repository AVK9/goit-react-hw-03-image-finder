import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';

export class App extends Component {
  state = {
    request: '',
    page: 1,
    isShowModal: false,
    // modalImage: '',
  };
  formSubmitHandler = data => {
    this.setState({
      request: data,
    });
  };
  // showModal = modalImage => {
  //   this.setState({ isShowModal: true, modalImage: modalImage });
  // };
  // closeModalBtn = () => {
  //   this.setState({ isShowModal: false });
  // };
  // toggleModal = () => {
  //   this.setState(prev => ({
  //     isShowModal: !prev.isShowModal,
  //   }));
  // };
  // , modalImage
  render() {
    const { request, page, isShowModal } = this.state;
    return (
      <>
        <ToastContainer autoClose={1500} />
        <Searchbar formSubmit={this.formSubmitHandler} />
        <ImageGallery
          request={request}
          page={page}
          // showModal={this.showModal}
        />
        {isShowModal && (
          <Modal

          // closeModalBtn={this.closeModalBtn}
          // modalImage={modalImage}
          />
        )}
      </>
    );
  }
}
