import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { buttonVariants } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircleIcon } from "lucide-react";
import { PlusCircledIcon } from "@radix-ui/react-icons";

const UplodeImg = () => {
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
          <Label>
            <span
              className={`${buttonVariants({ variant: "outline" })} w-full`}
            >
              <PlusCircledIcon />
            </span>
            <Input
              type="file"
              className="sr-only"
              placeholder="rasim yuklash"
            />
          </Label>
        </TabsContent>
        <TabsContent value="url">
          <Label htmlFor="url">Havola</Label>
          <Input type="url" id="url" placeholder="Rasim uchun havola" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UplodeImg;
