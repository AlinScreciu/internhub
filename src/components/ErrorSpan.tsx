import React from "react";
interface ErrorSpanProps {
  message?: string;
}
const ErrorSpan: React.FC<ErrorSpanProps> = ({ message }) => {
  return <span className="text-red-600">{message}</span>;
};

export default ErrorSpan;
