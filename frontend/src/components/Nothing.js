import React from "react";

export default function Nothing() {
  const nothingStyle = {
    color: "gray",
    textAlign: "center",
    marginTop: "40px"
  };

  return (
    <div className="nothing-message" style={nothingStyle}>
      Nothing to see here (╥﹏╥)
    </div>
  );
}
