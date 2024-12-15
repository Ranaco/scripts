import * as React from "react";
import { MetaFunction } from "@remix-run/react";
import NavTile from "~/components/tiles/nav-tile";
import Main from "~/components/containers/main";

export const meta: MetaFunction = () => {
  return [
    {
      title: "Scripts | CD",
      description: "Scripts curated and used by devs @CodeDecoders 🙂",
    },
  ];
};

const Home: React.FC = () => {
  return (
    <Main className="gap-4">
      <NavTile
        title="Scripts"
        url="/scripts"
        description="Scripts curated and used by devs @CodeDecoders 🙂. These contain homemade scripts that are used in the regular workflow by us."
      />
      <NavTile
        title="Commands"
        url="/commands"
        description="Linux and custom commands crafted in house. Contains some tricky stuffs as well 😉."
      />
    </Main>
  );
};

export default Home;
