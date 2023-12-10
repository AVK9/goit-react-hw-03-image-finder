import { GetApi } from 'api/api';
import { Component } from 'react';
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
      console.log('Изменилось имя запроса');
      this.setState({ page: 1 });
    }

    if (prevRequest !== carrRequest || prevState.page !== page) {
      console.log('Изменилось имя пакемона');

      this.setState({ request: carrRequest });
      this.getGalerys(carrRequest);
    }
  }

  getGalerys = async carrRequest => {
    this.setState({ loading: true });
    try {
      const { page } = this.state;
      const response = await GetApi(carrRequest, page);
      this.setState({
        galery: response.hits,
        total: response.hits.length,
        totaltot: response.total,
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
    const { galery, loading, total, page, error } = this.state;
    const { request, showModal } = this.props;
    // console.log('galery :>> ', galery.length);
    return (
      <div>
        {(total === 0 && request !== '' && (
          <h1>
            Sorry, no images were found for your request, please try another
            request
          </h1>
        )) ||
          (loading && <h1>Loading, please wait...</h1>) ||
          (error && <h1>Error {error}</h1>) ||
          (total === 0 && page !== 1 && (
            <h1>There are no more pictures, please try another request</h1>
          )) ||
          (galery.length !== 0 && (
            <h1 className={css.title1}>
              Here's what we were able to find on request: "{request}"
            </h1>
          ))}
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
      </div>
    );
  }
}
