import { GetApi } from 'api/api';
import { Component } from 'react';
// import { toast } from 'react-toastify';
import css from './ImageGallery.module.css';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Button } from '../Button/Button';
import { Loader } from '../Loader/Loader';

export class ImageGallery extends Component {
  state = {
    galery: [],
    page: 1,
    request: '',
    loading: false,
    error: null,
    total: 0,
    totaltot: 0,
  };
  componentDidUpdate(prevProps, prevState) {
    const { page } = this.state;
    const prevRequest = prevProps.request;
    const carrRequest = this.props.request;
    if (prevRequest !== carrRequest) {
      // console.log('Изменилось имя запроса');
      this.setState({ page: 1 });
    }

    if (prevRequest !== carrRequest || prevState.page !== page) {
      // console.log('Изменилось имя пакемона');

      this.setState({ request: carrRequest });
      this.getGalerys(carrRequest);
    }
  }

  getGalerys = async carrRequest => {
    this.setState({ loading: true });
    try {
      const { page, galery } = this.state;
      const response = await GetApi(carrRequest, page);
      this.setState({
        galery: [...galery, ...response.hits],
        total: response.hits.length,
        totaltot: response.totalHits,
      });
      console.log('response :>> ', response);
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
    }
  };
  clickLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { galery, loading, total, page, error, totaltot } = this.state;
    const { showModal, request } = this.props;
    //
    // console.log('galery :>> ', galery.length);
    return (
      <div>
        {total === 0 &&
          request !== '' &&
          ((
            <div className={css.boxMessage}>
              <p className={css.messageName}>
                Sorry, no images were found for your request, please try another
                request
              </p>
            </div>
          ) ||
            (error && (
              <div className={css.boxMessage}>
                <p className={css.messageName}>Error {error}</p>
              </div>
            )) ||
            (total === 0 && page !== 1 && (
              <div className={css.boxMessage}>
                <p className={css.messageName}>
                  There are no more pictures, please try another request
                </p>
              </div>
            )))}
        {loading && <Loader />}
        {!loading && (
          <ul className={css.ImageGallery}>
            {galery.length > 0 &&
              galery.map(({ webformatURL, tags, id, largeImageURL }) => (
                <ImageGalleryItem
                  webformatURL={webformatURL}
                  largeImageURL={largeImageURL}
                  tags={tags}
                  key={id}
                  showModal={showModal}
                />
              ))}
          </ul>
        )}

        {!loading && total >= 12 && <Button onClick={this.clickLoadMore} />}
        {total <= 12 && page === Math.ceil(totaltot / 12) && (
          <div className={css.messageFinish} hidden>
            🔴 We're sorry, but you've reached the end of search results.
          </div>
        )}
      </div>
    );
  }
}
