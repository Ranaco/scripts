import * as React from "react";

interface MainProps {
  children: React.ReactNode;
  className?: string;
}

const Main: React.FC<MainProps> = ({ children, className }) => {
  return (
    <main
      className={`w-[70%] sm:mx-auto mx-3 sm:mt-20 mt-10 flex flex-col ${className} select-none`}
    >
      {children}
    </main>
  );
};

export default Main;
