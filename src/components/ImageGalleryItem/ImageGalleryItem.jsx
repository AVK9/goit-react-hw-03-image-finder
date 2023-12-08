import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ previewURL, tags }) => (
  <li className={css.ImageGalleryItem}>
    <img src={previewURL} alt={tags} className={css.ImageGalleryItemImage} />
  </li>
);
