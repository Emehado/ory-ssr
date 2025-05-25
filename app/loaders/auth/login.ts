import { data, redirect } from "react-router";
import { createLoginFlow, getLoginFlow } from "~/api/ory/login";

export async function loginLoader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const flowId = url.searchParams.get("flow");
  const cookie = request.headers.get("cookie") || "";

  const res: Response = flowId
    ? await getLoginFlow(flowId, cookie)
    : await createLoginFlow();

  if (res.status === 200) {
    const flowData = await res.json();
    // return response object alogn with flowdata so the cookie is set in the browser
    return data(flowData, res);
  }

  // Flow expired or cookie not set
  if (res.status === 410 || res.status === 403) {
    return redirect("/login");
  }
  const errorData = await res.json();

  throw new Response(JSON.stringify(errorData), {
    status: res.status,
    statusText: res.statusText,
  });
}
