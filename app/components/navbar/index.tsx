import * as React from "react";
import Breadcrumbs from "./breadcrumbms";
import { useMatches, UIMatch } from "@remix-run/react";
import { AnimatePresence, motion } from "motion/react";

type BreadcrubsUIMatch = UIMatch & {
  handle: { breadcrumb: (url?: string) => string };
};

const Navbar: React.FC = () => {
  const matches: BreadcrubsUIMatch[] = useMatches() as BreadcrubsUIMatch[];

  return (
    <div className="flex flex-row items-center justify-start bg-black gap-4 sticky top-0 p-5 rounded-md shadow-lg">
      <Breadcrumbs title="CodeDecoders" url="https://codedecoders.io" isFirst />
      <Breadcrumbs title="Scripts | CD" url="/" />
      <AnimatePresence mode="popLayout">
        {matches
          .filter((match) => match.handle && match.handle.breadcrumb)
          .map((match) => (
            <motion.div
              key={match.pathname}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0, transition: { duration: 0.3 } }}
              exit={{ opacity: 0, x: 20, transition: { duration: 0.2 } }}
              className="breadcrumb flex flex-row gap-4"
            >
              {match.handle.breadcrumb(match.pathname)}
            </motion.div>
          ))}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
