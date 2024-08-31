import React, { FunctionComponent, PropsWithChildren } from 'react';
import Navigation from '@/components/layout/navigation';
import Content from '@/components/layout/content';

type Props = PropsWithChildren & {};

const Layout: FunctionComponent<Props> = ({ children }) => {
  return (
    <>
      <Navigation />
      <Content>{children}</Content>
    </>
  );
};

export default Layout;
