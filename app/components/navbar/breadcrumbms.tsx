import * as React from "react";
import { Link, useLocation } from "@remix-run/react";

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

const Breadcrumbs: React.FC<{
  title: string;
  url: string;
  isFirst?: boolean;
}> = ({ title, url, isFirst = false }) => {
  const location = useLocation();
  const pathname = location.pathname.replaceAll("%20", " ");

  return (
    <div
      className={`${
        pathname === url ? "text-white" : "text-gray-500"
      } flex gap-4`}
    >
      {!isFirst && <span>/</span>}

      <Link
        to={url}
        target={isFirst ? "_blank" : ""}
        className="hover:underline underline-offset-4 flex gap-4"
        rel="noreferrer"
      >
        {capitalize(title.replaceAll("/", ""))}
      </Link>
    </div>
  );
};

export default Breadcrumbs;
