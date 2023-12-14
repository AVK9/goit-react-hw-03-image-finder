import css from './Loader.module.css';
import { TailSpin } from 'react-loader-spinner';
export const Loader = () => {
  return (
    <div className={css.boxLoader}>
      <TailSpin
        height="150"
        width="150"
        color="#3f51b5"
        ariaLabel="tail-spin-loading"
        radius="2"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
      <p className={css.boxName}>Loading process, please wait </p>
    </div>
  );
};
