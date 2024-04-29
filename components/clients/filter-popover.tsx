"use client"
import React, { useState } from 'react'

import Popover from "@/components/shared/popover";
import { ChevronDown } from 'lucide-react';

function FilterPopover() {
    const [openPopover, setOpenPopover] = useState(false);
  return (
    <Popover
      content={
        <div className="w-full p-2 bg-white rounded-md sm:w-40">
          <button className="flex items-center justify-start w-full p-2 space-x-2 text-sm text-left transition-all duration-75 rounded-md hover:bg-gray-100 active:bg-gray-200">
            Item 1
          </button>
          <button className="flex items-center justify-start w-full p-2 space-x-2 text-sm text-left transition-all duration-75 rounded-md hover:bg-gray-100 active:bg-gray-200">
            Item 2
          </button>
          <button className="flex items-center justify-start w-full p-2 space-x-2 text-sm text-left transition-all duration-75 rounded-md hover:bg-gray-100 active:bg-gray-200">
            Item 3
          </button>
        </div>
      }
      openPopover={openPopover}
      setOpenPopover={setOpenPopover}
    >
          <button
        type="button"
        onClick={() => setOpenPopover(!openPopover)}
        className="flex items-center justify-between px-4 py-2 transition-all duration-75 border border-gray-300 rounded-md w-36 hover:border-gray-800 focus:outline-none active:bg-gray-100"
      >
        <p className="text-gray-600">Filtros</p>
        <ChevronDown className={`h-4 w-4 text-gray-600 transition-all ${openPopover ? "rotate-180" : ""}`} />
      </button>
    </Popover>
  );
}

export default FilterPopover