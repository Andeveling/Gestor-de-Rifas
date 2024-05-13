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

// Validar que el ticket no se repita en cada rifa
export const POST = async (request: Request) => {
  const { number, raffle, status } = await request.json();

  const validateFields = CreateTicketSchema.safeParse({ number, raffle, status });
  if (!validateFields.success) {
    return NextResponse.json({ error: validateFields.error }, { status: 400 });
  }

  try {
    const findRaffle = await prisma.raffle.findUnique({
      where: {
        id: raffle,
      },
      include: { tickets: true },
    });

    if (!findRaffle) return NextResponse.json({ error: "No se encontró la rifa" }, { status: 400 });

    for (const ticket of findRaffle.tickets) {
      if (ticket.number === number) {
        return NextResponse.json({ error: `El ticket ${number} ya existe` }, { status: 400 });
      }
    }

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
