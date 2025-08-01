import { type ReactNode, useRef } from "react";
import { ApiContext } from "./ApiContext";
import { DefaultApiClient } from "./DefaultApiClient";

export function ApiClientProvider({
  children,
}: {
  children?: ReactNode | ReactNode[];
}) {
  const apiClient = useRef(new DefaultApiClient());

  return (
    <ApiContext.Provider value={apiClient.current}>
      {children}
    </ApiContext.Provider>
  );
}
