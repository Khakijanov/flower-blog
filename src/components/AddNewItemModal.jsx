import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { getFormData, validation } from "../lib/my-utils/index";
import { useAppStore } from "../lib/zustand";
import SelectCategory from "./SelectCategory";
import SelectColor from "./SelectColor";
import { SelectCountry } from "./SelectCountry";
import LifeTime from "./LifeTime";
import UplodeImg from "./UplodeImg";
import Summary from "./Summary";
import { toast } from "sonner";

export default function AddNewItemModal() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const result = getFormData(e.target);
    const { checker, errorMessage } = validation(result);
    if (checker) {
      toast.warning(errorMessage);
    }
  };

  const addItemModal = useAppStore((state) => state.addItemModal);
  const setAddItemModal = useAppStore((state) => state.setAddItemModal);

  return (
    <Dialog open={addItemModal} onOpenChange={setAddItemModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ma'lumot qo'shish</DialogTitle>

          <form onSubmit={handleSubmit}>
            <div className="flex max-h-80 w-full flex-col gap-2 overflow-y-scroll px-1">
              <div className="mb-3">
                <Label htmlFor="name" className="ml-2">
                  Gul nomi*
                </Label>
                <Input
                  id="name"
                  placeholder="Gul nomini kiriting"
                  name="name"
                />
              </div>
              <div className="mb-3 flex w-full flex-col items-start gap-2">
                <Label htmlFor="price" className="ml-2">
                  Narxi*
                </Label>
                <Input
                  min="0"
                  id="price"
                  placeholder="Gul narxini kiriting"
                  name="price"
                  type="text"
                />
              </div>
              <div className="mb-3 flex items-center justify-between gap-5">
                <SelectCategory />
                <SelectColor />
              </div>
              <div className="mb-3">
                <SelectCountry />
              </div>
              <div className="mb-3">
                <Summary />
              </div>
              <div className="mb-3 grid items-center gap-1.5">
                <Label className="ml-2 text-left" htmlFor="smell">
                  Hidi
                </Label>
                <Input
                  type="text"
                  name="smell"
                  id="smell"
                  placeholder="hidni kirgizing"
                />
              </div>

              <LifeTime />

              <div>
                <UplodeImg />
              </div>
              <div className="flex w-full justify-end gap-5 px-5">
                <Button
                  onClick={setAddItemModal}
                  variant="outline"
                  type="button"
                >
                  Bekor qilish
                </Button>
                <Button type="submit">Tasdiqlash</Button>
              </div>
            </div>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
