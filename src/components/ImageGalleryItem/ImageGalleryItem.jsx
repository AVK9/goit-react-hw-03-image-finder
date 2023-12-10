import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({
  webformatURL,
  tags,
  largeImageURL,
  showModal,
}) => {
  const handleClick = () => {
    showModal(largeImageURL);
  };
  return (
    <li className={css.ImageGalleryItem} onClick={handleClick}>
      <img
        src={webformatURL}
        alt={tags}
        loading="lazy"
        className={css.ImageGalleryItemImage}
      />
    </li>
  );
};
