import { FrontendApi, Configuration } from "@ory/client-fetch";

export const ory_base_url =
  import.meta.env.ORY_BASE_URL || "http://127.0.0.1:4433";
export const ory_self_service_url =
  import.meta.env.ORY_SELF_SERVICE_URL || "http://127.0.0.1:4455";

export const ory = new FrontendApi(
  new Configuration({
    basePath: ory_base_url,
    credentials: "include",
  })
);

const JSON_HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export const oryFetchJson = async (url: string, init: RequestInit = {}) => {
  return fetch(`${ory_base_url}/${url}`, {
    headers: {
      ...JSON_HEADERS,
      ...init.headers,
    },
    credentials: "include",
    ...init,
  });
};
