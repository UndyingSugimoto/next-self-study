import * as React from "react";
import { NextComponentType, NextPageContext } from "next";

export default function App(
  Component: NextComponentType<NextPageContext, any, {}>,
  pageProps: any
) {
  return <Component {...pageProps} />;
}
