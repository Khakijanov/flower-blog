import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const FilterByColors = ({ colors }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("Rangni tanlang ");

  const handleFocus = () => {
    setOpen(!open);
  };
  return (
    <div className="pb-5">
      <div>
        <Label onClick={handleFocus} className="mb-3">
          Rang bo'yicha
        </Label>
        <Select
          name="color"
          open={open}
          onOpenChange={setOpen}
          onValueChange={setValue}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="rang bo'yicha">
              <div className="flex items-center gap-2">
                <span
                  style={{ backgroundColor: value }}
                  className="inline-block h-4 w-4 rounded-full"
                ></span>
                <span className="lowercase tracking-widest">{value}</span>
              </div>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>ranglar</SelectLabel>

              {colors?.map((color) => {
                return (
                  <SelectItem key={color} value={color}>
                    <div className="flex items-center gap-2">
                      <span
                        style={{ backgroundColor: color }}
                        className="inline-block h-4 w-4 rounded-full"
                      ></span>
                      <span className="lowercase tracking-widest">{color}</span>
                    </div>
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default FilterByColors;
