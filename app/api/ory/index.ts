import { FrontendApi, Configuration } from "@ory/client-fetch";

export const ory_sdk_url = import.meta.env.VITE_ORY_SDK_URL;

export const ory = new FrontendApi(
  new Configuration({
    basePath: ory_sdk_url,
    credentials: "include",
  })
);

const JSON_HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export const oryFetchJson = async (url: string, init: RequestInit = {}) => {
  return fetch(`${ory_sdk_url}/${url}`, {
    headers: {
      ...JSON_HEADERS,
      ...init.headers,
    },
    credentials: "include",
    ...init,
  });
};
