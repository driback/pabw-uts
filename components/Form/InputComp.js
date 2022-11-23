const InputComp = ({ styles, cap, placeholder, refe, val, dis }) => {
  return (
    <div className={styles?.form__Input}>
      <label htmlFor={cap}>{cap}</label>
      <input
        type="text"
        name={cap}
        placeholder={placeholder}
        ref={refe}
        defaultValue={val}
        disabled={dis}
      />
    </div>
  );
};

export default InputComp;
