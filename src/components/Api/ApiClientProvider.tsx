import { type ReactNode, useMemo } from "react";
import { ApiContext } from "./ApiContext";
import { DefaultApiClient } from "./DefaultApiClient";

export function ApiClientProvider({
  children,
}: {
  children?: ReactNode | ReactNode[];
}) {
  const apiClient = useMemo(() => new DefaultApiClient(), []);

  return (
    <ApiContext.Provider value={apiClient}>{children}</ApiContext.Provider>
  );
}
