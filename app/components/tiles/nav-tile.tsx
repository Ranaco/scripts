import * as React from "react";
import { Link } from "@remix-run/react";
import { motion } from "motion/react";

interface NavTileProps {
  title: string;
  url: string;
  description: string;
}

const NaavTile: React.FC<NavTileProps> = ({ title, url, description }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <Link
      className="flex flex-col gap-2 w-full text-2xl border-1 border-gray-500 border-dotted border max-h-[70px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      to={url}
    >
      <motion.div
        whileHover={{
          scale: 1.1,
          x: 50,
          y: -50,
        }}
        className="flex flex-col gap-2 w-full text-2xl border-1 border-white border-solid border p-4 bg-black"
      >
        <div>
          <span className="text-white max-w-[100px] overflow-hidden text-ellipsis">
            {title}
          </span>
        </div>
        {isHovered && (
          <motion.span
            className="text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {description}
          </motion.span>
        )}
      </motion.div>
    </Link>
  );
};

export default NaavTile;
