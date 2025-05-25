import { oryFetchJson } from ".";
export const createLoginFlow = async () => {
  return oryFetchJson("/self-service/login/browser", {
    method: "GET",
  });
};

export const getLoginFlow = async (flowId: string, cookie: string) => {
  return oryFetchJson(`/self-service/login/flows?id=${flowId}`, {
    method: "GET",
    headers: {
      cookie,
    },
  });
};
