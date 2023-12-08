import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
// import { Modal } from './modal/Modal';

export class App extends Component {
  state = {
    galery: null,
    page: 1,
    request: '',
    isLoading: false,
  };
  formSubmitHandler = data => {
    this.setState({
      request: data,
      galery: null,
      page: 1,
    });
  };

  render() {
    const { request, page } = this.state;
    return (
      <>
        <Searchbar formSubmit={this.formSubmitHandler} />
        {/* <ImageGallery galery={this.state.galery} /> */}
        <ToastContainer autoClose={1500} />
        <ImageGallery request={request} page={page} />
      </>
    );
  }
}
