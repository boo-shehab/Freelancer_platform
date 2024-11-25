const Container = ({ children }) => {
  return (
    <div
      style={{
        maxWidth: 1800,
        margin: "auto",
        paddingLeft: 16,
        paddingRight: 16,
      }}
    >
      {children}
    </div>
  );
};

export default Container;
