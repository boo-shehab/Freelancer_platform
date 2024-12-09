const Container = ({ children ,paddingx=24 }) => {
  return (
    <div
      style={{
        maxWidth: 1800,
        margin: "auto",
        paddingLeft: paddingx,
        paddingRight: paddingx,
      }}
    >
      {children}
    </div>
  );
};

export default Container;
