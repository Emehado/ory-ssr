import Alert from "../Alert";
import type { UiText } from "@ory/client-fetch";

const Message = ({ messages }: { messages: UiText[] }) => {
  return (
    <>
      {messages.map((m) => (
        <Alert key={m.text} variant={m.type} title={m.text} />
      ))}
    </>
  );
};

export default Message;
