import type { ReactNode } from "react";
import { Footer, Header } from "~components/ui";

type ContentWrapperProps = {
  children: ReactNode | ReactNode[];
};

export function ContentWrapper({ children }: ContentWrapperProps) {
  return (
    <div className="h-screen flex flex-col mx-auto px-3 max-w-[680px]">
      <Header className="mt-4 mb-8" />
      <main className="grow pb-8 border-b border-neutral-300 dark:border-neutral-700">
        {children}
      </main>
      <Footer className="py-4 text-center" />
    </div>
  );
}
