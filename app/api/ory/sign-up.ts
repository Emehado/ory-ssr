import { oryFetchJson } from ".";
export const createSignUpFlow = async () => {
  return oryFetchJson("/self-service/registration/browser", {
    method: "GET",
  });
};

export const getSignUpFlow = async (flowId: string, cookie: string) => {
  return oryFetchJson(`/self-service/registration/flows?id=${flowId}`, {
    method: "GET",
    headers: {
      cookie,
    },
  });
};
