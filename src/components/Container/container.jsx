const Container = ({ children }) => {
  return (
    <div
      style={{
        maxWidth: 1800,
        margin: "auto",
        paddingLeft: 24,
        paddingRight: 24,
      }}
    >
      {children}
    </div>
  );
};

export default Container;
