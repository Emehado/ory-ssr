import type { DetailedHTMLProps, InputHTMLAttributes } from "react";
import Message from "./message";
import SubmitButton from "./submit-button";
import NodeInput from "./node-input";
import type {
  LoginFlow,
  RegistrationFlow,
  VerificationFlow,
} from "@ory/client-fetch";
import { Link } from "react-router";

type LinkNode = React.JSX.IntrinsicElements["a"] &
  DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  >;

const Form = ({
  flowData,
}: {
  flowData: LoginFlow | RegistrationFlow | VerificationFlow;
}) => {
  const loaderData = flowData;
  return (
    <>
      {loaderData?.ui.messages && (
        <Message messages={loaderData?.ui.messages} />
      )}
      <form method="POST" action={loaderData.ui.action} className="space-y-6">
        {loaderData?.ui.nodes.map((node) => {
          const attrs = node.attributes as DetailedHTMLProps<
            InputHTMLAttributes<HTMLInputElement>,
            HTMLInputElement
          >;

          if (node.type === "a") {
            return (
              <div key={node.group + attrs.name}>
                <Link
                  to={(attrs as LinkNode).href || "#"}
                  className="text-sm font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  {node.meta.label?.text}
                </Link>
              </div>
            );
          }

          if (attrs.type === "submit") {
            return (
              <div key={node.group + attrs.name}>
                <SubmitButton node={node} />
              </div>
            );
          }

          return (
            <div key={node.group + attrs.name}>
              <NodeInput node={node} />
            </div>
          );
        })}
      </form>
    </>
  );
};

export default Form;
