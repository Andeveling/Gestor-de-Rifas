import { IClient } from "@/types";
import React from "react";
import { Phone, User, ChevronRight, Copy } from "lucide-react";
import { toast } from "sonner";

export const ClientCard = ({ client }: { client: Pick<IClient, "name" | "cellphone"> }) => {
  const { name, cellphone } = client;
    const copyToClipboard = () => {
      toast.success("Celular copiado al portapapeles");
    navigator.clipboard.writeText(cellphone);
  };
  return (
    <div className="h-24 p-0 m-0 border shadow-xl card w-80 border-primary bg-base-100">
      <div className="flex flex-row items-center gap-4 p-4 card-body">
        <div className="avatar placeholder ">
          <div className="mask mask-squircle w-14 bg-neutral text-neutral-content">
            <span className="text-xl">{name[0]}</span>
          </div>
        </div>
        <div>
          <h2 className="card-title">
            <User className="w-4 h-4" /> {name}
          </h2>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4" /> <p>{cellphone}</p>
            <Copy className="w-4 h-4 cursor-pointer" onClick={copyToClipboard}>
              
            </Copy>
          </div>
        </div>
        <div className="absolute right-2 top-8">
          <ChevronRight className="w-8 h-8 text-primary" />
        </div>
      </div>
    </div>
  );
};
