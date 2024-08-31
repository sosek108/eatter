import React, { FunctionComponent, PropsWithChildren } from 'react';

type Props = PropsWithChildren & {};

const H1: FunctionComponent<Props> = ({ children }) => {
  return <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">{children}</h1>;
};

export default H1;
