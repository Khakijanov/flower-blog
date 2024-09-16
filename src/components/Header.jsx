// import { LogOutIcon } from "lucide-react";
// import { ModeToggle } from "./ToggleMode";
// import { Button } from "@/components/ui/button";
// import { useAppStore } from "../lib/zustand";

// export default function Header() {
//   const setAdmin = useAppStore((state) => state.setAdmin);

//   return (
//     <div className="border-b py-5">
//       <div className="base-container flex justify-between">
//         <h2 className="text-3xl font-bold">Gullar App</h2>
//         <div className="flex items-center gap-1">
//           <ModeToggle />
//           <Button
//             onClick={() => {
//               const checker = confirm("Tizimdan chiqmoqchimisiz?");

//               checker && setAdmin(null);
//             }}
//             variant="outline"
//             className="flex items-center gap-2"
//           >
//             Chiqish
//             <LogOutIcon className="h-4 w-4" />
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }
