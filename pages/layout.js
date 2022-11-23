import Navbar from "../components/Navbar";

const Layout = ({ children }) => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
