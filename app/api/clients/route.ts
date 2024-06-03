import { CreateClientSchema, DeleteClientSchema, TCreateClient, UpdateClientSchema } from "@/types/client.types";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";


const MAX_RESULTS = 8;

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const query = params.get("query") as string;
  const currentPage = Number(params.get("page")) || 1;


  const clients = await prisma.client.findMany({
    where: {
      name: {
        contains: query,
      },
    },
    skip: (currentPage - 1) * MAX_RESULTS,
    take: MAX_RESULTS,
    orderBy: {
      name: "asc",
    },
  });

  if (!clients) return NextResponse.json({ error: "Clients not found" });
  const totalClients = await prisma.client.count({
    where: {
      name: {
        contains: query,
      },
    },
  });
  const totalPages = Math.ceil(totalClients / MAX_RESULTS);
  if (clients.length === 0) return NextResponse.json({clients: []});
  return NextResponse.json({ clients, totalClients, totalPages });
}

export async function POST(request: Request) {
  const { cc, name, cellphone, address }: TCreateClient = await request.json();
  const validateFields = CreateClientSchema.safeParse({ cc, name, cellphone, address });
  if (!validateFields.success) {
    return NextResponse.json({ error: validateFields.error });
  }

  try {
    const newClient = await prisma.client.create({
      data: {
        cc,
        name,
        cellphone,
        address,
      },
    });
    return NextResponse.json({ newClient });
  } catch (error) {
    console.log(error);
  }
}

export async function PUT(request: NextRequest) {
  const { cc, name, cellphone, address } = await request.json();
  const params = request.nextUrl.searchParams;
  const id = params.get("id") as string;
  const validateFields = UpdateClientSchema.safeParse({ cc, name, cellphone, address });
  if (!validateFields.success) {
    return NextResponse.json({ error: validateFields.error });
  } else {
    try {
      const updatedClient = await prisma.client.update({
        where: {
          id,
        },
        data: {
          cc,
          name,
          cellphone,
          address,
        },
      });
      return NextResponse.json({ updatedClient });
    } catch (error) {
      console.log(error);
    }
  }
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  const validateFields = DeleteClientSchema.safeParse({ id });
  if (!validateFields.success) {
    return NextResponse.json({ error: validateFields.error });
  }

  try {
    const deletedClient = await prisma.client.delete({
      where: {
        id,
      },
    });
    return NextResponse.json({ deletedClient });
  } catch (error) {
    console.log(error);
  }
}
