import styles from "./index.module.scss";

const PopDelete = ({ handleCancel, handleDelete, deleting }) => {
  return (
    <div className={styles?.Delete}>
      <div className={styles?.Delete__Box}>
        <h5 className={styles?.Delete__Title}>Yakinkah?</h5>
        <div className={styles?.Delete__Cta}>
          <button className={styles?.Delete__Cancel} onClick={handleCancel}>
            Cancel
          </button>
          <button className={styles?.Delete__Del} onClick={handleDelete}>
            {deleting}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopDelete;
