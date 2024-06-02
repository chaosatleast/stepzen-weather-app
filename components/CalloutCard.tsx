import React from "react";

function CalloutCard({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="h-auto  w-aut0 p-4 "
      style={{
        background:
          "linear-gradient(45deg, rgba( 255, 255, 255, 0) 10%, rgba( 255, 255, 255, 0.1) 90%)",
        boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
        backdropFilter: "blur( 100px )",
        borderRadius: "10px",
        border: "1px solid rgba( 255, 255, 255, 0.18 )",
      }}
    >
      {children}
    </div>
  );
}

export default CalloutCard;
