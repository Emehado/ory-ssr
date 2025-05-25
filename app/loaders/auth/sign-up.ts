import { data, redirect } from "react-router";
import { createSignUpFlow, getSignUpFlow } from "~/api/ory/sign-up";

export async function signUpLoader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const flowId = url.searchParams.get("flow") || "";
  const cookie = request.headers.get("cookie") || "";
  let res: Response;

  if (flowId) {
    res = await getSignUpFlow(flowId, cookie);
  } else {
    res = await createSignUpFlow();
  }
  const flowData = await res.json();

  if (res.status === 200) {
    // Be sure to return response object so the cookie is set in the browser
    return data(flowData, res);
  }

  // Flow expired or cookie not set
  if (res.status === 410 || res.status === 403) {
    return redirect("/sign-up");
  }

  const errorData = await res.json();

  throw new Response(JSON.stringify(errorData), {
    status: res.status,
    statusText: res.statusText,
  });
}
