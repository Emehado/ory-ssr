import { Link, useLoaderData } from "react-router";
import LoginForm from "~/components/auth/form";
import Header from "~/components/auth/header";
import OidcOptions from "~/components/auth/oidc-options";
import Divider from "~/components/divider";
import useUpdateFlowId from "~/hooks/use-update-flow-id";
import { loginLoader } from "~/loaders/auth/login";

export { loginLoader as loader };

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
