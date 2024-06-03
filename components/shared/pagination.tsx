"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import clsx from "clsx";
import Link from "next/link";
import { generatePagination } from "@/lib/utils";
import { usePathname, useSearchParams } from "next/navigation";

export function Pagination({ totalPages }: { readonly totalPages: number }) {
  // NOTE: comment in this code when you get to this point in the course
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") ?? "1");
  const allPages = generatePagination(currentPage, totalPages);


  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathName}?${params.toString()}`;
  };

  

  return (
    <div className="join">
      <div className="inline-flex">
        <PaginationArrow direction="left" href={createPageURL(currentPage - 1)} isDisabled={currentPage <= 1} />

        {allPages?.map((page, index) => {
          let position: "first" | "last" | "single" | "middle" | undefined;

          if (index === 0) position = "first";
          if (index === allPages.length - 1) position = "last";
          if (allPages.length === 1) position = "single";
          if (page === "...") position = "middle";

          return (
            <PaginationNumber
              key={page}
              href={createPageURL(page)}
              page={page}
              position={position}
              isActive={currentPage === page}
            />
          );
        })}

        <PaginationArrow
          direction="right"
          href={createPageURL(currentPage + 1)}
          isDisabled={currentPage >= totalPages}
        />
      </div>
    </div>
  );
}

function PaginationNumber({
  page,
  href,
  isActive,
  position,
}: {
  page: number | string;
  href: string;
  position?: "first" | "last" | "middle" | "single";
  isActive: boolean;
}) {
  const className = clsx("join-item btn", {
    "rounded-l-md": position === "first" || position === "single",
    "rounded-r-md": position === "last" || position === "single",
    "z-10 bg-primary border-secondary text-white": isActive,
    "hover:bg-secondary": !isActive && position !== "middle",
    "text-gray-300": position === "middle",
  });

  return isActive || position === "middle" ? (
    <div className={className}>{page}</div>
  ) : (
    <Link href={href} className={className}>
      {page}
    </Link>
  );
}

function PaginationArrow({
  href,
  direction,
  isDisabled,
}: {
  href: string;
  direction: "left" | "right";
  isDisabled?: boolean;
}) {
  const className = clsx("btn  btn-primary  join-item", {
    "pointer-events-none ": isDisabled,
    "btn-outline border-secondary ": !isDisabled,
    "": direction === "left",
    "": direction === "right",
  });

  const icon = direction === "left" ? <ArrowLeftIcon className="w-4" /> : <ArrowRightIcon className="w-4" />;

  return isDisabled ? (
    <div className={className}>{icon}</div>
  ) : (
    <Link className={className} href={href}>
      {icon}
    </Link>
  );
}
