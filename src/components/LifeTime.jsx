import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const LifeTime = () => {
  return (
    <div className="flex w-full flex-col items-start gap-2">
      <Label htmlFor="davr" className="ml-3 w-full text-left">
        Davirni Kiriting
      </Label>
      <Input
        id="davr"
        name="lifetime"
        placeholder="Davirni kiriting "
        type="text"
      />
    </div>
  );
};

export default LifeTime;
