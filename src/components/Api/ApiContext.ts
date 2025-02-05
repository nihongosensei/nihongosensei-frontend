import { createContext } from "react";
import type { ApiClient } from "./ApiClient";
import { DefaultApiClient } from "./DefaultApiClient";

export const ApiContext = createContext<ApiClient>(new DefaultApiClient());
