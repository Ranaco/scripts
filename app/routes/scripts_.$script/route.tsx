import { useLoaderData } from "@remix-run/react";
import Main from "~/components/containers/main";
import Breadcrumbs from "~/components/navbar/breadcrumbms";
import Chips from "~/components/containers/chips";
import DB from "lib/supabase/db";
import { json, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { CodeBlock, obsidian } from "react-code-blocks";
import Markdown from "react-markdown";

export const meta: MetaFunction = ({ data }: { data: any }) => {
  return [
    {
      title: `${data.script.title} | CD`,
      description: data.script.description,
    },
  ];
};

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

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const db = new DB();

  const script = await db.fetchScript(params.script ?? "");

  return json({ script });
};

export default function PostRoute() {
  const { script } = useLoaderData<typeof loader>();
  const parsedUpdatedAt = new Date(
    Date.parse(script.updated_at)
  ).toLocaleString();

  return (
    <Main className="gap-6 mb-6">
      <div className="bg-surface rounded-lg p-6 shadow-lg flex flex-col gap-6">
        <div className="flex flex-row justify-between align-center">
          <span className="text-white text-2xl font-bold overflow-hidden text-ellipsis whitespace-nowrap">
            {script.title}
          </span>
          <span className="text-gray-400 nowrap overflow-hidden text-ellipsis whitespace-nowrap">
            {parsedUpdatedAt}
          </span>
        </div>
        <div className="flex flex-row justify-between w-full">
          <div className="flex flex-row gap-4">
            {script.tags.map((tag) => (
              <Chips key={tag}>{tag}</Chips>
            ))}
          </div>
          <div className="text-gray-400">
            <span>@{script.author.name}</span>
          </div>
        </div>
      </div>
      <div className="bg-surface rounded-lg p-6 shadow-lg flex flex-col gap-6">
        <Markdown>{script.description}</Markdown>
        <CodeBlock
          text={script.content.replaceAll("`", "")}
          language={script.lang}
          showLineNumbers={false}
          theme={obsidian}
        />
      </div>
    </Main>
  );
}
