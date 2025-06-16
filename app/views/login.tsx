import { Link, useLoaderData, redirect } from "react-router";
import LoginForm from "~/components/auth/form";
import Header from "~/components/auth/header";
import OidcOptions from "~/components/auth/oidc-options";
import Divider from "~/components/divider";
import useUpdateFlowId from "~/hooks/use-update-flow-id";
import { loginLoader } from "~/loaders/auth/login";
import { ory } from "~/api/ory";

export { loginLoader as loader };

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const flow = formData.get("flow") as string;

  try {
    const response = await ory.updateLoginFlow({
      flow: flow,
      updateLoginFlowBody: {
        method: "password",
        identifier: formData.get("identifier") as string,
        password: formData.get("password") as string,
        csrf_token: formData.get("csrf_token") as string,
      },
      cookie: request.headers.get("cookie") || undefined,
    });

    // If successful, we'll have a session
    if (response.session) {
      // The SDK doesn't give us the raw response headers, so we need to
      // check the session differently. For now, just redirect to app
      return redirect("/");
    }
  } catch (error: any) {
    console.error("Login error:", error);

    // If it's a 400 error, the flow was updated with error messages
    if (error.response?.status === 400) {
      return redirect(`/login?flow=${flow}`);
    }

    // For other errors, create a new flow
    return redirect("/login");
  }

  // Shouldn't reach here, but just in case
  return redirect(`/login?flow=${flow}`);
}

export default function Login() {
  const loaderData = useLoaderData<typeof loginLoader>();
  useUpdateFlowId(loaderData?.id);

  return (
    <>
      <div className="bg-gray-50 h-screen pb-96">
        <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
          <Header title="Sign in to your account" />
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
            <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
              <LoginForm flowData={loaderData} />
              <div>
                <Divider>Or Sign In with</Divider>
                <OidcOptions />
              </div>
            </div>
            <p className="mt-10 text-center text-sm/6 text-gray-500">
              Don't have an account?{" "}
              <Link
                to="/sign-up"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Create a free account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
