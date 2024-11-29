import { createContext } from "react";
import { ApiClient, DefaultApiClient } from "@components/Api/client";

export const ApiContext = createContext<ApiClient>(new DefaultApiClient());
