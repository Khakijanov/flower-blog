"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { useAppStore } from "../lib/zustand";
import { collectItem } from "../lib/my-utils";
import { Label } from "@/components/ui/label";
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

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

export function SelectCountry() {
  const flowers = useAppStore((state) => state.flowers);
  console.log(flowers);
  const countryis = flowers && collectItem(flowers, "country");
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    flowers && (
      <div className="flex flex-col items-start gap-1">
        <Label className="ml-2 cursor-pointer" onClick={() => setOpen(!open)}>
          Hududni tanlang
        </Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between"
            >
              {value
                ? countryis.find((country) => country === value)
                : "Davlatni tanlang..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Hududni qidirish" />
              <CommandList>
                <CommandEmpty>Bunday davlat topilmadi.</CommandEmpty>
                <CommandGroup>
                  {countryis.map((country) => (
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
