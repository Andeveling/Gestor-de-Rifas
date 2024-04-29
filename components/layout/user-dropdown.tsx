"use client";

import Popover from "@/components/shared/popover";
import { LogOut, Users, BookOpen } from "lucide-react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode, useState } from "react";

export default function UserDropdown({ session }: { session: Session }) {
  const { email, image } = session?.user || {};
  const [openPopover, setOpenPopover] = useState(false);

  if (!email) return null;

  return (
    <div className="relative inline-block text-left">
      <Popover
        content={
          <div className="w-full p-2 rounded-md bg-base-100 sm:w-56">
            <div className="p-2">
              {session?.user?.name && (
                <p className="text-sm font-medium truncate">{session?.user?.name}</p>
              )}
              <p className="text-sm truncate">{session?.user?.email}</p>
            </div>

            <ButtonNavLink icon={<Users className="w-4 h-4" />} text="Clientes" href="/clients" />
            <ButtonNavLink icon={<BookOpen className="w-4 h-4" />} text="Rifas" href="/raffles" />

            <button
              type="button"
              className="relative flex items-center justify-start w-full p-2 space-x-2 text-sm text-left transition-all duration-75 rounded-md hover:bg-gray-100"
              onClick={() => signOut()}
            >
              <LogOut className="w-4 h-4" />
              <p className="text-sm">Logout</p>
            </button>
          </div>
        }
        align="end"
        openPopover={openPopover}
        setOpenPopover={setOpenPopover}
      >
        <button type="button" onClick={() => setOpenPopover(!openPopover)} className="avatar">
          <div className="w-12 rounded-full ring ring-primary ring-offset-1 ring-offset-base-100">
            <Image
              alt={email}
              src={image || `https://avatars.dicebear.com/api/micah/${email}.svg`}
              width={40}
              height={40}
            />
          </div>
          <span className="sr-only">popover</span>
        </button>
      </Popover>
    </div>
  );
}

const ButtonNavLink = ({ icon, text,href }: { icon: ReactNode; text: string, href: string }) => {
  return (
    <Link href={href} className="relative flex items-center justify-start w-full p-2 space-x-2 text-sm text-left transition-all duration-75 rounded-md cursor-not-allowed hover:bg-gray-100">
      {icon}
      <p className="text-sm">{text}</p>
    </Link>
  );
};
