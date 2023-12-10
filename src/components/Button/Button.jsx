import css from './Button.module.css';

export const Button = ({ onClick }) => (
  <div className={css.buttonBox}>
    <button className={css.Button} type="button" onClick={onClick}>
      Load more
    </button>
  </div>
);
