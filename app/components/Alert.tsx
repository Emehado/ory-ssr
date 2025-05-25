import {
  CheckCircleIcon,
  XMarkIcon,
  XCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/20/solid";
import type { UiTextTypeEnum } from "@ory/client-fetch";
import classNames from "classnames";

export interface AlertProps {
  title: string;
  variant: UiTextTypeEnum;
  onClose?: () => void;
}

export default function Alert({ title, variant, onClose }: AlertProps) {
  const getIcon = () => {
    switch (variant) {
      case "success":
        return (
          <CheckCircleIcon
            aria-hidden="true"
            className="size-5 text-green-400"
          />
        );
      case "error":
        return (
          <XCircleIcon aria-hidden="true" className="size-5 text-red-400" />
        );

      case "info":
        return (
          <InformationCircleIcon
            aria-hidden="true"
            className="size-5 text-blue-400"
          />
        );
      default:
        return (
          <CheckCircleIcon
            aria-hidden="true"
            className="size-5 text-green-400"
          />
        );
    }
  };

  const mainClasses = classNames("rounded-md p-4", {
    "bg-green-50": variant === "success",
    "bg-red-50": variant === "error",
    "bg-blue-50": variant === "info",
  });

  const textClasses = classNames("text-sm font-medium", {
    "text-green-800": variant === "success",
    "text-red-800": variant === "error",
    "text-blue-800": variant === "info",
  });

  const closeButtonClasses = classNames(
    "inline-flex rounded-md  p-1.5  focus:outline-none focus:ring-2  focus:ring-offset-2 ",
    {
      "focus:ring-green-600 text-green-500 hover:bg-green-100 bg-green-50 focus:ring-offset-green-50":
        variant === "success",
      "focus:ring-red-600 text-red-500 hover:bg-red-100 bg-red-50 focus:ring-offset-red-50":
        variant === "error",
      "focus:ring-blue-600 text-blue-500 hover:bg-blue-100 bg-blue-50 focus:ring-offset-blue-50":
        variant === "info",
    }
  );

  return (
    <div className={mainClasses}>
      <div className="flex">
        <div className="shrink-0">{getIcon()}</div>
        <div className="ml-3">
          <p className={textClasses}>{title}</p>
        </div>
        {onClose && (
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button type="button" className={closeButtonClasses}>
                <span className="sr-only">Dismiss</span>
                <XMarkIcon aria-hidden="true" className="size-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
