import type { UiNode } from "@ory/client-fetch";
import type React from "react";

const SubmitButton = ({ node }: { node: UiNode }) => {
  const attributes = node.attributes as React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >;
  return (
    <button
      disabled={attributes.disabled}
      name={attributes.name}
      value={attributes.value}
      type={attributes.type}
      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      {node.meta.label?.text}
    </button>
  );
};

export default SubmitButton;
