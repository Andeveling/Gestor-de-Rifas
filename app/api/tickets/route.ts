import prisma from "@/lib/prisma";
import { CreateTicketSchema } from "@/types/tickets.types";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const { raffle } = await request.json();
  const tickets = await prisma.ticket.findMany({
    where: {
      raffleId: raffle,
    },
  });
  return NextResponse.json({ tickets });
};

export const POST = async (request: Request) => {
  const { number, raffle, status } = await request.json();

  const validateFields = CreateTicketSchema.safeParse({ number, raffle, status });
  if (!validateFields.success) {
    return NextResponse.json({ error: validateFields.error });
  }

  try {
    const newTicket = await prisma.ticket.create({
      data: {
        number,
        raffle: { connect: { id: raffle } },
        status,
      },
    });

    return NextResponse.json({ newTicket });
  } catch (error) {
    console.log(error);
  }
};
