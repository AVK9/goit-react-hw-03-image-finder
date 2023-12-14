import { Component } from 'react';
import { toast } from 'react-toastify';
import css from './Searchbar.module.css';
import { Icon } from 'components/img/Icon';
// import { ReactComponent as MyIcon } from 'components/img/Icon';

export class Searchbar extends Component {
  state = {
    request: '',
  };
  handleChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
    // console.log('e :>> ', value);
  };
  handleSubmit = e => {
    e.preventDefault();

    if (this.state.request === '') {
      return toast.warn('Please enter your request!');
    }

    this.props.formSubmit(this.state.request.toLowerCase().trim());
    this.setState({ request: '' });
    // console.log(this.state);
  };

  render() {
    return (
      <>
        <header className={css.Searchbar}>
          <form className={css.SearchForm} onSubmit={this.handleSubmit}>
            <button type="submit" className={css.SearchFormButton}>
              <Icon id="search" className={css.icons} />
            </button>
            <input
              name="request"
              value={this.state.request}
              className={css.SearchFormInput}
              type="text"
              placeholder="Search images and photos"
              onChange={this.handleChange}
            />
          </form>
        </header>
      </>
    );
  }
}
