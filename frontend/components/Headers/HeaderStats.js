import React from "react";

export default function HeaderStats({ headerText }) {
  return (
    <>
      {/* Header */}
      <div className="relative bg-blue-800 md:pt-32 pb-32 pt-12">
        <div className="text-4xl text-white text-center font-semibold">
          {headerText}
        </div>
      </div>
    </>
  );
}
