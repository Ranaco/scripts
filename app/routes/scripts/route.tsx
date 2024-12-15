import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import Main from "~/components/containers/main";
import Breadcrumbs from "~/components/navbar/breadcrumbms";
import DB from "lib/supabase/db";
import NavTile from "~/components/tiles/nav-tile";

export const handle = {
  breadcrumb: () => <Breadcrumbs title="Scripts" url="/scripts" />,
};

export const loader = async () => {
  const db = new DB();

  const scripts = await db.fetchScripts();

  return json({ scripts });
};

export default function Scripts() {
  const data = useLoaderData<typeof loader>();

  return (
    <Main className="flex flex-col sm:gap-4 gap-6">
      {data.scripts.map((script) => (
        <NavTile
          key={script.id}
          url={`/scripts/${script.title}`}
          title={script.title}
          description={script.author.name}
        />
      ))}
    </Main>
  );
}
