import { Component } from 'react';
import css from './index.module.css';
// import { AiOutlineClose } from 'react-icons/ai';

export class Modal extends Component {
  handleEsc = e => {
    if (e.code === 'Escape') this.props.closeModalBtn();
  };
  componentDidMount() {
    document.addEventListener('keydown', this.handleEsc);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEsc);
  }

  render() {
    const { closeModalBtn, modalImage } = this.props;
    return (
      <div className={css.Overlay} onClick={closeModalBtn}>
        <div className={css.Modal} onClick={e => e.stopPropagation()}>
          {/* <button
            type="button"
            className={css.btnClose}
            aria-label="Close"
            onClick={closeModalBtn}
          >
            <AiOutlineClose className={css.icon} />
          </button> */}
          <div className="modal-content">
            <div className="modal-body">
              <img src={modalImage} alt="" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
