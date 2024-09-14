import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { buttonVariants } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircleIcon } from "lucide-react";
import { PlusCircledIcon, PlusIcon, UpdateIcon } from "@radix-ui/react-icons";
import { useEffect, useRef, useState } from "react";
import { uplodeIMG } from "../request";
import { toast } from "sonner";
import { allowImgSize } from "../lib/my-utils";
import FlowerImg from "../images/photo-1713423826277-46c52a8438d5.jpg";

const UplodeImg = () => {
  const [value, setValue] = useState(null);
  const urlInput = useRef(null);
  const [showImage, setShowImage] = useState(false);
  const handleUplodeImg = (image, type = "local") => {
    if (type === "url") {
      if (image !== value) {
        toast.loading("rasim yuklanmoqda");
        setValue(image);
      } else {
        toast.info("bu rasim allaqachon yuklangan");
      }
    } else {
      if (image.size >= allowImgSize) {
        toast.error("rasim hajmi 5 mb dan katta bo'lmasligi kerek");
      } else {
        toast.loading("rasim yuklanmoqda");
        uplodeIMG(image)
          .then((res) => setValue(res))
          .catch(({ message }) => toast.error(message));
      }
    }

    uplodeIMG(image)
      .then((res) => console.log(res))
      .catch(({ message }) => console.log(message));
  };

  useEffect(() => {
    setShowImage(true);
    setValue(FlowerImg);
  }, []);
  return (
    <div className="w-full">
      <Label>Rasim yuklang</Label>
      <Tabs defaultValue="default" className="mb-5 w-full">
        <TabsList className="w-full">
          <TabsTrigger className="w-full" value="local">
            Local
          </TabsTrigger>
          <TabsTrigger className="w-full" value="url">
            Url
          </TabsTrigger>
          <TabsTrigger className="w-full" value="default">
            default
          </TabsTrigger>
        </TabsList>
        <TabsContent value="local">
          <Label className="">
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
        </TabsContent>
        <TabsContent value="url">
          <Label htmlFor="url">Havola</Label>
          <div className="flex gap-5">
            <Input
              ref={urlInput}
              defaultValue={value && value != value ? value : ""}
              name="file"
              type="url"
              id="url"
              placeholder="Rasim uchun havola"
            />

            <Button
              onClick={() => handleUplodeImg(urlInput?.current.value, "url")}
              type="button"
            >
              {value ? <UpdateIcon /> : <PlusIcon />}
            </Button>
          </div>
        </TabsContent>
        <TabsContent value="default">
          <Button
            className="w-full"
            onClick={() => setValue(FlowerImg)}
            type="button"
            variant={"secondary"}
          >
            defult rasim qo'yish
          </Button>
        </TabsContent>
      </Tabs>
      {value && showImage && (
        <img
          src={value}
          alt="img"
          onLoad={() => {
            toast.dismiss();
            toast.success("rasim muvofaqiyatli yuklandi");
          }}
          className="w-full rounded-lg"
        />
      )}
    </div>
  );
};

export default UplodeImg;
