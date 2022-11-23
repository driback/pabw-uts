import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import InputComp from "./InputComp";
import { updateData, createData } from "../../helper/api";
import { useMutation, useQueryClient } from "react-query";
import styles from "./index.module.scss";

const Form = ({ ids, ctaName = "Add", data }) => {
  const { asPath } = useRouter();
  const isTrue = asPath.split("/").includes("update");

  const carBrand = useRef();
  const carModel = useRef();
  const carPrice = useRef();

  useEffect(() => {
    if (isTrue) {
      carBrand.current.value = data?.brand;
      carModel.current.value = data?.model;
      carPrice.current.value = data?.price;
    }
  }, [data?.brand, data?.model, data?.price, isTrue]);

  const queryClient = useQueryClient();

  const { mutate, error, isSuccess } = useMutation(createData, {
    onMutate: async (newData) => {
      await queryClient.cancelQueries("mobil");

      const prevData = queryClient.getQueryData("mobil");

      await queryClient.setQueryData("mobil", (prev) => {
        return [
          ...prev,
          {
            ...newData,
            brand: newData?.brand,
            model: newData?.model,
            price: newData?.price,
          },
        ];
      });

      return { prevData };
    },
    onError: (error, newData, context) => {
      queryClient.setQueryData("mobilnew", context.prevData);
      console.log(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries("mobil");
    },
  });

  const {
    mutate: updateItem,
    error: updateError,
    isSuccess: updateSuccess,
  } = useMutation(updateData, {
    onSuccess: () => {
      queryClient.invalidateQueries("mobil");
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const inputBrand = carBrand.current.value;
    const inputModel = carModel.current.value;
    const inputPrice = carPrice.current.value;

    if (!inputBrand || !inputPrice) {
      return;
    }

    if (ids === "undefined" || ids === undefined) {
      const data = mutate({
        brand: inputBrand,
        model: inputModel,
        price: inputPrice,
      });
      console.log(data);
      if (error) console.log(error);
      event.target.reset();
      return;
    }

    updateItem({
      id: ids,
      brand: inputBrand,
      model: inputModel,
      price: inputPrice,
    });

    if (updateError) console.log(updateError);
    return;
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.form__Title}>Create Data</h2>

      {ids ? (
        <InputComp
          styles={styles}
          cap="Id"
          placeholder={ids}
          val={ids}
          dis={true}
        />
      ) : null}

      <InputComp
        styles={styles}
        cap="Brand"
        placeholder="Honda"
        refe={carBrand}
      />
      <InputComp
        styles={styles}
        cap="Model"
        placeholder="Accord"
        refe={carModel}
      />
      <InputComp
        styles={styles}
        cap="Price"
        placeholder="10000"
        refe={carPrice}
      />

      <button className={styles.form__Button} disabled={updateSuccess}>
        {isSuccess || updateSuccess ? "Sucess" : ctaName}
      </button>
    </form>
  );
};

export default Form;
