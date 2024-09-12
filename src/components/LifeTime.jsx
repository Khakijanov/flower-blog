import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { period } from "../lib/my-utils";
import { Label } from "@/components/ui/label";

const LifeTime = () => {
  return (
    <div>
      <div className="mb-3">
        <Label className="ml-3">Davirni Kiriting (dan)</Label>
        <div className="flex gap-5">
          <Input placeholder="Davirni kiriting " type="number" />
          <Select>
            <SelectTrigger className="">
              <SelectValue placeholder="Davr" />
            </SelectTrigger>
            <SelectContent>
              {period.map((item) => {
                return (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <Label className="ml-3">Davirni Kiriting (gacha)</Label>
        <div className="flex gap-5">
          <Input placeholder="Davirni kiriting " type="number" />
          <Select>
            <SelectTrigger className="">
              <SelectValue placeholder="Davr" />
            </SelectTrigger>
            <SelectContent>
              {period.map((item) => {
                return (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default LifeTime;
