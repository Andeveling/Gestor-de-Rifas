import prisma from "@/lib/prisma";
import { UpdateRaffleSchema } from "@/types/raffles.types";
import { NextResponse } from "next/server";

export const GET = async (request: Request, { params }: { params: { id: string } }) => {
  const raffle = await prisma.raffle.findUnique({ where: { id: params.id } });
  if (!raffle) return NextResponse.json({ error: "No se encontró el sorteo" });
  // console.log(raffle)
  return NextResponse.json(raffle);
};

export const DELETE = async (request: Request, { params }: { params: { id: string } }) => {
  try {
    const deleteTickets = prisma.ticket.deleteMany({ where: { raffleId: params.id } });
    const deleteRaffle = prisma.raffle.delete({ where: { id: params.id } });
    const transaction = await prisma.$transaction([deleteTickets, deleteRaffle]);
    if (!transaction) return NextResponse.json({ message: "No se pudo eliminar la rifa" }, { status: 400 });
    return NextResponse.json({ message: "Se elimino la rifa" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "No se pudo eliminar la rifa" }, { status: 400 });
  }
};

export const PUT = async (request: Request, { params }: { params: { id: string } }) => {
  const { name, description, priceForTicket, playDate, isActive } = await request.json();
  const validateFields = UpdateRaffleSchema.safeParse({ name, description, priceForTicket, playDate, isActive });
  if (!validateFields.success) {
    return NextResponse.json({ error: validateFields.error }, { status: 400 });
  } 

  try {
    const updatedRaffle = await prisma.raffle.update({
      where: {
        id: params.id,
      },
      data: {
        name,
        description,
        priceForTicket,
        playDate,
        isActive,
      },
    });
    return NextResponse.json({ updatedRaffle });
  } catch (error) {
    return NextResponse.json({ message: "No se pudo actualizar la rifa" }, { status: 400 });
  } 
}