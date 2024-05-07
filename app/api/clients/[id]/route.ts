import prisma from "@/lib/prisma";
import { DeleteClientSchema } from "@/types/client.types";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const validateFields = DeleteClientSchema.safeParse({ id: params.id });
    if (!validateFields.success) {
      return NextResponse.json({ error: validateFields.error });
    }

    if (!params.id) {
      return NextResponse.json({ error: "Client not found" });
    }

    const client = await prisma.client.findUnique({ where: { id: params.id } });
    if (!client) {
      return NextResponse.json({ error: "Client not found" });
    }

    return NextResponse.json({ client });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
