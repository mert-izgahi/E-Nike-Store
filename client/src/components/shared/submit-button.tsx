import { Loader } from "lucide-react";
import { Button, ButtonProps } from "../ui/button";

interface SubmitButtonProps extends ButtonProps {
  loading?: boolean | undefined;
  type?: "submit" | "reset" | "button";
}

function SubmitButton(props: SubmitButtonProps) {
  const { loading, type = "submit", ...rest } = props;
  return (
    <Button type={type} {...rest} disabled={loading}>
      {loading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
      {props.children}
    </Button>
  );
}

export default SubmitButton;
