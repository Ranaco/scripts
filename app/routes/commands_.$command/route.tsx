import { useParams } from "@remix-run/react";
import Main from "~/components/containers/main";
import Breadcrumbs from "~/components/navbar/breadcrumbms";

export const handle = {
  breadcrumb: (url?: string) => {
    if (!url) return null;

    const breadcrumbs = url.split("/").filter(Boolean);

    return (
      <>
        {breadcrumbs.map((breadcrumb, index) => {
          const breadcrumbUrl = `/${breadcrumbs.slice(0, index + 1).join("/")}`;
          return (
            <Breadcrumbs key={index} title={breadcrumb} url={breadcrumbUrl} />
          );
        })}
      </>
    );
  },
};

export default function PostRoute() {
  const params = useParams();

  return <Main>Command {params.script}</Main>;
}
