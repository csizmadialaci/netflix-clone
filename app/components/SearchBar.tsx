import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";

interface iAppProps {
  state: boolean;
  changeState: any;
  navbarChangeState: any;
}

export default function SearchBar({
  state,
  changeState,
  navbarChangeState,
}: iAppProps) {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (searchInput.trim()) {
      changeState(false);
      router.push(`/home/search/${encodeURIComponent(searchInput)}`);
    }
  };

  return (
    <>
      <Dialog open={state} onOpenChange={() => changeState(!state)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Search your favorite movies, series</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <form onSubmit={handleSubmit}>
              <input
                className="text-black p-2 mr-10 rounded-md w-[65%] md:w-[75%]"
                type="text"
                placeholder="Search..."
                name="searchInput"
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <Button
                onClick={() => {
                  navbarChangeState(false);
                }}
                className="absolute right-10 md:right-5"
                type="submit"
              >
                Search
              </Button>
            </form>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  );
}
