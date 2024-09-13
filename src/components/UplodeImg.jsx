import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { buttonVariants } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircleIcon } from "lucide-react";
import { PlusCircledIcon, PlusIcon, UpdateIcon } from "@radix-ui/react-icons";
import { useRef, useState } from "react";
import { uplodeIMG } from "../request";
import { toast } from "sonner";
import { allowImgSize } from "../lib/my-utils";

const UplodeImg = () => {
  const [value, setValue] = useState(null);
  const urlInput = useRef(null);
  const handleUplodeImg = (image, type = "local") => {
    if (type === "url") {
      setValue(image);
    } else {
      if (image.size >= allowImgSize) {
        toast.error("rasim hajmi 5 mb dan katta bo'lmasligi kerek");
      } else {
        toast.promise(uplodeIMG(image), {
          loading: "Rasim yuklanmoqda...",
          success: (url) => {
            setValue(url);
            return `rasim yuklandi`;
          },
          error: "Nimadir hatolik",
        });
      }
    }

    uplodeIMG(image)
      .then((res) => console.log(res))
      .catch(({ message }) => console.log(message));
  };
  return (
    <div className="w-full">
      <Label>Rasim yuklang</Label>
      <Tabs defaultValue="local" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger className="w-full" value="local">
            Local
          </TabsTrigger>
          <TabsTrigger className="w-full" value="url">
            Url
          </TabsTrigger>
        </TabsList>
        <TabsContent value="local">
          <Label className="mb-5 block">
            <span
              className={`${buttonVariants({ variant: "outline" })} w-full`}
            >
              {!value ? <PlusCircledIcon /> : <UpdateIcon />}
            </span>
            <Input
              accept="image/*"
              onChange={({ target: { files } }) => handleUplodeImg(files[0])}
              type="file"
              className="sr-only"
              placeholder="rasim yuklash"
            />
          </Label>

          {value && <img src={value} alt="img" />}
        </TabsContent>
        <TabsContent value="url">
          <Label htmlFor="url">Havola</Label>
          <div className="flex gap-5">
            <Input
              ref={urlInput}
              name="file"
              type="url"
              id="url"
              placeholder="Rasim uchun havola"
            />
            <Button
              onClick={() => handleUplodeImg(urlInput.current)}
              type="button"
            >
              <PlusIcon />
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UplodeImg;
