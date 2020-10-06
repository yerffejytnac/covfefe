import React, { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

export const Layout = ({ children }: Props) => <div>{children}</div>;
