import * as React from "react";

interface ChipProps {
  children: string;
}

const Chips: React.FC<ChipProps> = ({ children }) => {
  return (
    <div className="bg-chip rounded-lg px-4 py-1 shadow-lg flex flex-col gap-4 text-gray-300">
      {children}
    </div>
  );
};

export default Chips;
