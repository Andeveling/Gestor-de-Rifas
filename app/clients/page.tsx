import FilterPopover from "@/components/clients/filter-popover";
import { useState } from "react";


export default function ClientsPage() {
  return (
    <div className="z-10 w-full max-w-xl px-5 xl:px-0 ">
      <div className="grid w-full grid-cols-2 gap-5">
        <div>
          <h1 className="text-2xl font-bold">Clients</h1>
          <p className="text-sm">Total of clients 5</p>
        </div>
              <FilterPopover />
              
      </div>
    </div>
  );
}

const HeaderPage = () => {
  return <div></div>;
};
