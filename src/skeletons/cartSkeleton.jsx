const CartSkeleton = () => {
  return (
    <div className="cartContainer">

      {/* title skeleton */}
      <div className="skeleton text" style={{ width: "150px", height: "28px" }} />

      {[1, 2, 3].map((i) => (
        <div className="cartItem" key={i}>

          {/* image skeleton */}
          <div
            className="skeleton"
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "8px"
            }}
          />

          {/* text skeleton */}
          <div className="subCart" style={{ width: "100%" }}>
            <div className="skeleton text" style={{ width: "120px" }} />
            <div className="skeleton text" style={{ width: "90px" }} />
            <div className="skeleton text" style={{ width: "70px" }} />
          </div>

          {/* button skeleton */}
          <div
            className="skeleton button"
            style={{
              height: "35px",
              borderRadius: "6px",
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default CartSkeleton;