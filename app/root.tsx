import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
  isRouteErrorResponse,
} from "@remix-run/react";
import type { LinksFunction, MetaFunction } from "@remix-run/node";

import "./tailwind.css";
import Navbar from "./components/navbar";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Anton&family=Mr+Bedfort&family=Dosis&family=Shadows+Into+Light&display=swap",
  },
];

export const meta: MetaFunction = () => [
  {
    title: "Scripts | CD",
    description: "Scripts curated and used by devs @CodeDecoders 😉",
  },
];

export default function App() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="flex flex-col h-screen w-screen max-w-screen-xl mx-auto items-start justify-start sm:mt-24 mt-14 overflow-x-hidden">
        <Navbar />
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return (
        <html lang="en">
          <head>
            <title>404 - Page Not Found</title>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link
              href="https://fonts.googleapis.com/css2?family=Anton&family=Mr+Bedfort&family=Rubik+Distressed&family=Shadows+Into+Light&display=swap"
              rel="stylesheet"
            />
          </head>
          <body
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
              backgroundColor: "#1a1a1a",
              width: "100%",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                backgroundImage: "url('/images/wallpaper.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                textAlign: "center",
              }}
            >
              <span
                style={{
                  fontSize: "13rem",
                  fontWeight: "800",
                  fontFamily: "Anton, sans-serif",
                }}
              >
                4
              </span>
              <span
                style={{
                  fontSize: "13rem",
                  fontFamily: "Anton, cursive",
                }}
              >
                0
              </span>
              <span
                style={{
                  fontSize: "3rem",
                  fontWeight: "300",
                  fontFamily: "'Mr Bedfort', sans-serif",
                }}
              >
                Four
              </span>
            </div>
          </body>
        </html>
      );
    }
  } else if (error instanceof Error) {
    return (
      <html lang="en">
        <head>
          <title>Application Error</title>
        </head>
        <body
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            textAlign: "center",
          }}
        >
          <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
            Something went wrong
          </h1>
          <p>{error.message}</p>
          <pre style={{ marginTop: "1rem", whiteSpace: "pre-wrap" }}>
            {error.stack}
          </pre>
        </body>
      </html>
    );
  } else {
    return (
      <html lang="en">
        <head>
          <title>Unknown Error</title>
        </head>
        <body
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            textAlign: "center",
          }}
        >
          <h1 style={{ fontSize: "2rem" }}>An unknown error occurred</h1>
        </body>
      </html>
    );
  }
}
