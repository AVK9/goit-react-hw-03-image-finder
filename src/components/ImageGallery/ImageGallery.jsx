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
    const { page, galery } = this.state;

    const prevRequest = prevProps.request;
    const carrRequest = this.props.request;
    console.log('prevRequest :>> ', prevRequest);
    console.log('carrRequest :>> ', carrRequest);
    if (prevRequest !== carrRequest) {
      const getGalerys = async carrRequest => {
        this.setState({ loading: true });
        try {
          const { page, request } = this.state;
          console.log('request :>> ', request);
          const response = await GetApi(carrRequest, page);
          this.setState({
            galery: [...response.hits],
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
      console.log('Изменилось имя запроса');
      // this.setState({ page: 1 });
      this.setState(prevState => ({
        galery: [],
        page: 1,
      }));
      getGalerys(carrRequest);
    }

    if (prevRequest !== carrRequest || prevState.page !== page) {
      const getGalerys = async carrRequest => {
        this.setState({ loading: true });
        try {
          const { page, galery, request } = this.state;
          console.log('request :>> ', request);
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
      console.log('Изменилось API');
      console.log('galery :>> ', galery);

      this.setState({ request: carrRequest });
      getGalerys(carrRequest);
    }
  }

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

        {!loading &&
          totaltot !== 0 &&
          galery.length < totaltot &&
          total >= 12 && <Button onClick={this.clickLoadMore} />}
        {totaltot !== 0 && galery.length === totaltot && (
          <div className={css.messageFinish} hidden>
            🔴 We're sorry, but you've reached the end of search results.
          </div>
        )}
      </div>
    );
  }
}
