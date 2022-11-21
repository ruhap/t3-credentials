import React from "react";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen">
      <main className="w-12/12 mx-auto flex flex-col p-2 md:w-8/12 md:p-4 xl:w-10/12">
        {children}
      </main>
    </div>
  );
};

export default Layout;
