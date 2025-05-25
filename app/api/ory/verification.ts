import { oryFetchJson } from ".";

export const getVerificationFlow = async (flowId: string, cookie: string) => {
  return oryFetchJson(`/self-service/verification/flows?id=${flowId}`, {
    method: "GET",
    headers: {
      cookie,
    },
  });
};
