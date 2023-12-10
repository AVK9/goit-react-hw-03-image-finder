import { Component } from 'react';
import css from './Modal.module.css';
import { AiOutlineClose } from 'react-icons/ai';

export class Modal extends Component {
  handleEsc = e => {
    if (e.code === 'Escape') this.props.toggleModal();
    console.log('Press');
  };
  componentDidMount() {
    document.addEventListener('keydown', this.handleEsc);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEsc);
  }

  render() {
    const { children, closeModalBtn, modalImage } = this.props;
    return (
      <div className={css.Overlay}>
        <div className={css.Modal}>
          <button
            type="button"
            className={css.btnClose}
            aria-label="Close"
            onClick={closeModalBtn}
          >
            <AiOutlineClose className={css.icon} />
          </button>
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title"> Modal</h1>
            </div>
            <div className="modal-body">
              {children}
              <img src={modalImage} alt="" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
