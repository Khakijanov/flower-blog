"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { useAppStore } from "../lib/zustand";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { collectItem } from "../lib/my-utils";
import { Label } from "@/components/ui/label";

export function SelectCountry() {
  const flowers = useAppStore((state) => state.flowers);
  const country = flowers && collectItem(flowers, "country");
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const button = React.useRef(null);
  React.useEffect(() => {
    function changer() {
      let id = null;
      if (open && button) {
        id = setTimeout(() => {
          const element = document.querySelector(
            "[data-radix-popper-content-wrapper]",
          );
          console.log(button.current.offsetWidth);
          const listbox = element.querySelector("[role='listbox']");
          listbox.style.maxHeight = "173px";

          element.style.width = button.current.offsetWidth + "px";
          console.log(element.style.position);
        }, 1);
      }

      return () => {
        clearTimeout(id);
        id = null;
      };
    }

    changer();
  }, [open, button]);

  return (
    flowers && (
      <div className="flex w-full flex-col gap-1">
        <input
          className="sr-only"
          type="text"
          onChange={setValue}
          value={value}
          name="country"
        />
        <Label className="ml-2 text-left" onClick={() => setOpen(!open)}>
          Hudud*
        </Label>
        <Popover className="w-full" open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              ref={button}
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="justify-between"
            >
              {value
                ? country.find((country) => country === value)
                : "Hududni tanlang..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0">
            <Command>
              <CommandInput placeholder="Hududni qidirish..." />
              <CommandList>
                <CommandEmpty>Bunday hudud topilmadi.</CommandEmpty>
                <CommandGroup>
                  {country.map((country) => (
                    <CommandItem
                      key={country}
                      value={country}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === country ? "opacity-100" : "opacity-0",
                        )}
                      />
                      {country}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    )
  );
}
