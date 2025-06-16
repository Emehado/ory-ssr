import type { UiNode } from "@ory/client-fetch";
import type { DetailedHTMLProps, InputHTMLAttributes } from "react";

const NodeInput = ({ node }: { node: UiNode }) => {
  const attrs = node.attributes as DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;

  // Handle hidden fields (like CSRF token)
  if (attrs.type === "hidden") {
    return (
      <input
        type="hidden"
        name={attrs.name}
        value={attrs.value}
      />
    );
  }

  return (
    <>
      <div>
        <label
          htmlFor={attrs.name}
          className="block text-sm/6 font-medium text-gray-900"
        >
          {node.meta.label?.text}
        </label>
        <div className="mt-2">
          <input
            defaultValue={attrs.value}
            id={attrs.name}
            name={attrs.name}
            type={attrs.type}
            autoComplete={attrs.autoComplete}
            required={attrs.required}
            placeholder={node.meta.label?.text}
            disabled={attrs.disabled}
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
        </div>
      </div>
      {node.messages?.map((m) => (
        <p key={m.text} className="text-sm text-red-600">
          {m.text}
        </p>
      ))}
    </>
  );
};

export default NodeInput;
