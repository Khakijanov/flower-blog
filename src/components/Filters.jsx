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

const Filters = ({ categories }) => {
  return (
    <div className="pb-5">
      <div>
        <Label className="mb-3">Saralash</Label>
        <Select name="category">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="turkum bo'yicha" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Turkumlar</SelectLabel>

              {categories.map((category) => {
                return (
                  <SelectItem key={category} value={category}>
                    {category}
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

export default Filters;
