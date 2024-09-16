import React from "react";
import { ExitIcon } from "@radix-ui/react-icons";
import { Button } from "../components/ui/button";
import { useAppStore } from "../lib/zustand";

export default function LogOut() {
  const setAdmin = useAppStore((state) => state.setAdmin);

  const handleLogout = () => {
    const checker = confirm("Tizimni ro'stan ham tark etmoqchimisiz? ");
    checker && setAdmin(null);
  };
  return (
    <div>
      <Button onClick={handleLogout} variant={"outline"} className="mr-3">
        Chiqish
        <ExitIcon className="ml-2" />
      </Button>
    </div>
  );
}
