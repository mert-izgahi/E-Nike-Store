import { useUploadImageMutation } from "@/redux/apis/storage.api";
import { useRef } from "react";
import { Button } from "../ui/button";
import { Image, Loader } from "lucide-react";
interface ImageFieldProps {
  value: string;
  onChange: (e: string) => void;
}

function ImageField(props: ImageFieldProps) {
  const [uploadImage, { isLoading: isUploading }] = useUploadImageMutation();

  const ref = useRef<HTMLInputElement>(null);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      if (file) {
        const formData = new FormData();
        formData.append("image", file);
        const result = await uploadImage({ args: formData }).unwrap();
        props.onChange(result.url);
      }
    }
  };

  return (
    <>
      <input
        ref={ref}
        hidden
        type="file"
        accept="image/*"
        disabled={isUploading}
        onChange={handleChange}
      />

      <div className="max-w-md w-full">
        <div
          className="w-full h-60 border border-dashed border-border rounded-md overflow-hidden bg-muted flex items-center justify-center bg-cover bg-center max-w-md"
          style={{
            backgroundImage: `url(${props.value})`,
          }}
        >
          <Button
            size={"icon"}
            type="button"
            variant={"secondary"}
            onClick={() => ref.current?.click()}
          >
            {isUploading ? (
              <Loader className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Image className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </>
  );
}

export default ImageField;
