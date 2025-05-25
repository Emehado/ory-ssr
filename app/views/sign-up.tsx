import type { RegistrationFlow } from "@ory/client-fetch";
import { Link } from "react-router";
import SignUpForm from "~/components/auth/form";
import Header from "~/components/auth/header";
import OidcOptions from "~/components/auth/oidc-options";
import Divider from "~/components/divider";
import useUpdateFlowId from "~/hooks/use-update-flow-id";

export { signUpLoader as loader } from "~/loaders/auth/sign-up";

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
