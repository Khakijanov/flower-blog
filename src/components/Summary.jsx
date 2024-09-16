import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { summaryLimit } from "../lib/my-utils";
import { useState } from "react";
import { toast } from "sonner";

const Summary = () => {
  const [value, setValue] = useState("");
  const writer = (e) => {
    if (!(e.target.value.length > summaryLimit)) {
      setValue(e.target.value);
    } else {
      toast.dismiss();
      toast.info(`${summaryLimit}dan ortiq belgi yozish mumkin emas`);
    }
  };
  return (
    <div className="flex flex-col">
      <div className="flex w-full flex-col items-start gap-2">
        <Label htmlFor="summary" className="ml-2">
          Gul haqida
        </Label>
        <Textarea
          value={value}
          onChange={writer}
          placeholder="Gul haqida malumot kiriting "
          id="summary"
          name="summary"
        />
      </div>
      <span className="ml-auto block text-muted-foreground">
        {value.length} / {summaryLimit}
      </span>
    </div>
  );
};

export default Summary;
