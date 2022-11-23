import { useRouter } from "next/router";
import styles from "./index.module.scss";

const CardList = ({ data, handleDelete }) => {
  const { asPath, push } = useRouter();

  const ItemList = ({ index, brand, price, id, model }) => {
    return (
      <tr className={styles.Table__Items}>
        <td>{index}</td>
        <td>{brand}</td>
        <td>{model}</td>
        <td>{price}</td>
        <td>
          <button
            id={id}
            onClick={({ target }) => push(`${asPath}/update/${target.id}`)}
          >
            Update
          </button>
          <button id={id} onClick={handleDelete}>
            Delete
          </button>
        </td>
      </tr>
    );
  };
  return (
    <div className={styles?.Card}>
      <table className={styles?.Table}>
        <thead className={styles?.Table__Head}>
          <tr>
            <th>Id</th>
            <th>Brand</th>
            <th>Model</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className={styles?.Table__Body}>
          {data?.map((dt, index) => (
            <ItemList
              key={index}
              index={index + 1}
              brand={dt?.brand}
              model={dt?.model}
              price={dt?.price}
              id={dt?.id}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CardList;
