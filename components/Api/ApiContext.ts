import { createContext } from "react";
import { DefaultApiClient } from "./DefaultApiClient";
import type { ApiClient } from "./ApiClient";

export const ApiContext = createContext<ApiClient>(new DefaultApiClient());
