import { useEffect, useState } from "react";
import { useAppStore } from "../lib/zustand";
import { getFlowers, refreshToken } from "../request";
import { collectItem, getFormData, limit } from "../lib/my-utils";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  PlusIcon,
  ResetIcon,
  SliderIcon,
  UpdateIcon,
} from "@radix-ui/react-icons";
import { Button } from "../components/ui/button";
import AddNewItemModal from "../components/AddNewItemModal";
import MyPagination from "../components/MyPagination";
import Filters from "../components/Filters";
import FilterByCountry from "../components/FilterByCountry";
import FilterByColors from "../components/FilterByColor";

export default function Home() {
  const [category, setCategory] = useState("");
  const [skip, setSkip] = useState(0);
  console.log(skip);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(false);
  const flowers = useAppStore((state) => state.flowers);
  const setFlowers = useAppStore((state) => state.setFlowers);
  const admin = useAppStore((state) => state.admin);
  const setAdmin = useAppStore((state) => state.setAdmin);
  const setAddItemModal = useAppStore((state) => state.setAddItemModal);

  const reset = () => {
    setCategory("");
  };
  const handleFilter = (e) => {
    e.preventDefault();
    const result = getFormData(e.target);
    console.log(result);
  };
  useEffect(() => {
    setLoading(true);
    getFlowers(admin?.access_token, { skip, limit, category })
      .then(({ data, total }) => {
        setTotal(total);
        setFlowers(data);
      })
      .catch(({ message }) => {
        if (message === "403") {
          refreshToken(admin?.refresh_token)
            .then(({ access_token }) => {
              setAdmin({ ...admin, access_token });
            })
            .catch(() => {
              toast.info("Tizimga qayta kiring!");
              setAdmin(null);
            });
        }
      })
      .finally(() => setLoading(false));
  }, [admin, skip, category]);

  return (
    <>
      <div className="base-container">
        <div className="mb-5 flex items-center justify-between border-b py-5">
          <h2 className="h2">Boshqaruv paneli</h2>
          <Button onClick={setAddItemModal}>
            Qo'shish
            <PlusIcon className="ml-2" />
          </Button>
        </div>
        {flowers && (
          <form onSubmit={handleFilter}>
            <Filters categories={collectItem(flowers, "category")} />
            <FilterByCountry countries={collectItem(flowers, "country")} />
            <FilterByColors colors={collectItem(flowers, "color")} />
            <div className="flex gap-2">
              <Button type="reset" variant={"outline"} onClick={() => reset()}>
                Tozalash
                <ResetIcon className="ml-3" />
              </Button>
              <Button type="submit">
                Saralash
                <SliderIcon className="ml-3" />
              </Button>
            </div>
          </form>
        )}
        <Table>
          {flowers && <TableCaption>Gullar haqida ma'lumot.</TableCaption>}
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Id</TableHead>
              <TableHead>Gul Nomi</TableHead>
              <TableHead>Turkumi</TableHead>
              <TableHead>Rangi</TableHead>
              <TableHead className="text-right">Narxi</TableHead>
            </TableRow>
          </TableHeader>
          {!loading && (
            <TableBody>
              {flowers?.map(({ name, id, category, color, price }) => {
                return (
                  <TableRow key={id}>
                    <TableCell className="font-medium">{id}</TableCell>
                    <TableCell>{name}</TableCell>
                    <TableCell>{category}</TableCell>
                    <TableCell>
                      {" "}
                      <span
                        style={{ backgroundColor: color }}
                        className="block h-4 w-4 rounded-full border"
                      ></span>
                    </TableCell>
                    <TableCell className="text-right">$ {price}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          )}
        </Table>
        {loading && (
          <div className="mt-60 flex w-full items-center justify-center gap-3 font-bold">
            <UpdateIcon className="animate-spin" />
            <h3>Yuklanmoqda...</h3>
          </div>
        )}
      </div>

      <AddNewItemModal />
      {flowers && (
        <MyPagination
          skip={skip}
          setSkip={setSkip}
          total={total}
          pageCount={Math.ceil(total / limit)}
        />
      )}
    </>
  );
}
