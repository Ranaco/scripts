import { Link } from "@remix-run/react";
import Main from "~/components/containers/main";
import Breadcrumbs from "~/components/navbar/breadcrumbms";

export const handle = {
  breadcrumb: () => <Breadcrumbs title="Commands" url="/commands" />,
};

export default function Scripts() {
  return (
    <Main>
      <Link to="/commands/find-file">Commands</Link>
    </Main>
  );
}
