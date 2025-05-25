import { redirect } from "react-router";
import { getVerificationFlow } from "~/api/ory/verification";

export async function verificationLoader({ request }: { request: Request }) {
  const flowId = new URL(request.url).searchParams.get("flow");
  const cookie = request.headers.get("cookie") || "";

  if (!flowId) {
    throw new Response("Flow ID is required", {
      status: 400,
      statusText: "Bad Request",
    });
  }

  const res = await getVerificationFlow(flowId, cookie);

  if (res.status === 200) {
    const flowData = await res.json();
    return flowData;
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
