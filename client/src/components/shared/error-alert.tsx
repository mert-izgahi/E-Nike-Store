import { IApiError } from "@/lib/types";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { TriangleAlert } from "lucide-react";

interface ErrorAlertProps {
  error: IApiError;
}

function ErrorAlert(props: ErrorAlertProps) {
  return (
    <Alert className="border-red-600 rounded-sm">
      <TriangleAlert className="h-5 w-5 fill-red-600" />
      <AlertTitle className="text-red-600 font-semibold">
        {props.error.title}
      </AlertTitle>
      <AlertDescription className="text-red-600">{props.error.message}</AlertDescription>
    </Alert>
  );
}

export default ErrorAlert;
