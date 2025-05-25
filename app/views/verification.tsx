import type { VerificationFlow } from "@ory/client-fetch";
import VerificationForm from "~/components/auth/form";
import Header from "~/components/auth/header";

export { verificationLoader as loader } from "~/loaders/auth/verification";

const Verification = ({ loaderData }: { loaderData: VerificationFlow }) => {
  return (
    <>
      <div className="bg-gray-50 h-screen pb-96">
        <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
          <Header title="Verify your account" />
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
            <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
              <VerificationForm flowData={loaderData} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Verification;
