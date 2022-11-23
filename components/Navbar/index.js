import { useRouter } from "next/router";
import styles from "./index.module.scss";
const Navbar = () => {
  const { push } = useRouter();
  return (
    <header className={styles.Navbar}>
      <nav className={styles.Navbar__Links}>
        <div onClick={() => push("/utssatu")}>UTS 1</div>
        <div onClick={() => push("/utsdua")}>UTS 2</div>
      </nav>
    </header>
  );
};

export default Navbar;
