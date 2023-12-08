import { GetApi } from 'api/api';
import { Component } from 'react';
import css from './ImageGallery.module.css';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

export class ImageGallery extends Component {
  state = {
    galery: null,
    page: 1,
    request: '',
    loading: false,
  };
  componentDidUpdate(prevProps, prevState) {
    const prevRequest = prevProps.request;
    const carrRequest = this.props.request;

    if (prevRequest !== carrRequest) {
      console.log('Изменилось имя пакемона');
      this.setState({ loading: false });
      this.setState({ request: carrRequest });
      this.getGalerys(carrRequest);
    }
  }

  getGalerys = async carrRequest => {
    try {
      const { page } = this.state;
      const response = await GetApi(carrRequest, page);
      this.setState({ galery: response.hits });
      console.log('response :>> ', response.hits);
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ loading: true });
    }
  };

  render() {
    const { galery, loading } = this.state;
    const { request } = this.props;

    return (
      <div>
        <h1 className={css.title1}>
          Here's what we were able to find on request: "{request}"
        </h1>
        <ul className={css.ImageGallery}>
          {/* {loading && <div>Загружаем...</div>} */}
          {galery &&
            galery.map(({ previewURL, tags, id }) => (
              <ImageGalleryItem previewURL={previewURL} tags={tags} key={id} />
            ))}
        </ul>
      </div>
    );
  }
}
