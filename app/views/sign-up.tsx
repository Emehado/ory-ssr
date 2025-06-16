import type { RegistrationFlow } from "@ory/client-fetch";
import { Link, redirect } from "react-router";
import SignUpForm from "~/components/auth/form";
import Header from "~/components/auth/header";
import OidcOptions from "~/components/auth/oidc-options";
import Divider from "~/components/divider";
import useUpdateFlowId from "~/hooks/use-update-flow-id";

export { signUpLoader as loader } from "~/loaders/auth/sign-up";

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const flow = formData.get("flow") as string;

  // Build the request body from form data
  const body: any = {
    method: "password",
    flow: flow,
  };

  // Add all form fields to the body
  for (const [key, value] of formData.entries()) {
    if (key !== "flow") {
      body[key] = value;
    }
  }

  try {
    // Submit directly to Ory's action endpoint
    const response = await fetch(
      `${
        import.meta.env.VITE_ORY_BASE_URL
      }/self-service/registration?flow=${flow}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Cookie: request.headers.get("cookie") || "",
        },
        credentials: "include",
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();

    alert(JSON.stringify(data));
    // If successful, we'll have a session
    if (response.ok && data.session) {
      return redirect("/");
    }

    // If there's an error, the flow will be updated with error messages
    // Redirect back to sign-up with the same flow ID to see the errors
    return redirect(`/sign-up?flow=${flow}`);
  } catch (error) {
    console.error("Registration error:", error);
    // For network errors, create a new flow
    return redirect("/sign-up");
  }
}

const SignUp = ({ loaderData }: { loaderData: RegistrationFlow }) => {
  useUpdateFlowId(loaderData?.id);

  return (
    <>
      <div className="bg-gray-50 h-screen pb-96">
        <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
          <Header title="Create a new account" />
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
            <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
              <SignUpForm flowData={loaderData} />
              <div>
                <Divider>Or Sign In with</Divider>
                <OidcOptions />
              </div>
            </div>
            <p className="mt-10 text-center text-sm/6 text-gray-500">
              Already have an account?{" "}
              <Link
                to={"/login"}
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Sign in here.
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
