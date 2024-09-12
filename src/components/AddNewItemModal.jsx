import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getFormData } from "../lib/my-utils/index";
import { useAppStore } from "../lib/zustand";
import SelectCategory from "./SelectCategory";
import SelectColor from "./SelectColor";
import { SelectCountry } from "./SelectCountry";
import LifeTime from "./LifeTime";
import UplodeImg from "./UplodeImg";

export default function AddNewItemModal() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const result = getFormData(e.target);
  };

  const addItemModal = useAppStore((state) => state.addItemModal);
  const setAddItemModal = useAppStore((state) => state.setAddItemModal);

  return (
    <Dialog open={addItemModal} onOpenChange={setAddItemModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ma'lumot qo'shish</DialogTitle>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <Label htmlFor="name" className="ml-2">
                Gul nomi*
              </Label>
              <Input id="name" placeholder="Gul nomini kiriting" name="name" />
            </div>
            <div className="mb-3">
              <Label htmlFor="price" className="ml-2">
                Narxi*
              </Label>
              <Input
                id="price"
                placeholder="Gul narxini kiriting"
                name="price"
              />
            </div>
            <div className="mb-3 flex items-center justify-between">
              <SelectCategory />
              <SelectColor />
            </div>
            <div className="mb-3">
              <SelectCountry />
            </div>
            <div className="mb-3">
              <div className="grid w-full gap-1.5">
                <Label htmlFor="summary" className="ml-2">
                  Gul haqida
                </Label>
                <Textarea
                  placeholder="Gul haqida malumot kiriting "
                  id="summary"
                />
              </div>
            </div>
            <div className="mb-3 grid w-full max-w-sm items-center gap-1.5">
              <Label className="ml-2" htmlFor="smell">
                Hidi
              </Label>
              <Input type="text" id="smell" placeholder="hidni kirgizing" />
            </div>
            <div>
              <LifeTime />
            </div>
            <UplodeImg />
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
