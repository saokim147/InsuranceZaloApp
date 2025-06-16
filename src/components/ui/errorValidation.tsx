import { isNullOrEmpty } from "@/utils/common";

interface ErrorMessageProps {
  message?: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  if (isNullOrEmpty(message)) {
    return <></>;
  }
  return (
    <p className="h-5 text-sm mt-2 text-destructive font-semibold">
      {message ? message : null}
    </p>
  );
};

export default ErrorMessage;
