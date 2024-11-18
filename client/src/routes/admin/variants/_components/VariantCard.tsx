import { Button } from "@/components/ui/button";
import { IVariant, IVariantOption } from "@/lib/types";
import { Pencil, Trash } from "lucide-react";

interface IVariantCardProps {
  variant: IVariant;
  onOpenUpdateModal: () => void;
  onOpenDeleteModal: () => void;
}

function VariantCard(props: IVariantCardProps) {
  return (
    <div className="flex flex-col gap-4 border border-border p-4 rounded-sm">
      <div className="flex flex-col gap-1">
        <div className="flex flex-row justify-between">
          <h4 className="text-2xl font-bold">{props.variant.name}</h4>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              onClick={props.onOpenUpdateModal}
              variant={"outline"}
              size={"icon"}
              className="shrink-0"
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              onClick={props.onOpenDeleteModal}
              variant={"outline"}
              size={"icon"}
              className="shrink-0"
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          Set the options for this variant
        </p>
      </div>

      {props.variant.options.map((option: IVariantOption) => (
        <div className="bg-muted p-2 rounded-sm" key={option.value}>
          <p className="text-sm">{option.label}</p>
          <p className="text-xs text-muted-foreground">{option.value}</p>
        </div>
      ))}
    </div>
  );
}

export default VariantCard;
