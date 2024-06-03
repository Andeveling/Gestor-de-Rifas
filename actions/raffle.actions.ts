"use server";
import prisma from "@/lib/prisma";
import { CreateRaffleSchema, DeleteRaffleSchema, UpdateRaffleSchema } from "@/types/raffles.types";
import { CreateTicketSchema } from "@/types/tickets.types";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { StateRaffle, StateTicket } from "./actions";

export async function fetchRafflesWithOutTickets() {
  noStore();
  try {
    const raffles = await prisma.raffle.findMany();
    return {
      raffles,
      totalRaffles: raffles.length,
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}

export async function fetchRaffleByIdWithTicketsAndClientName(id: string) {
  noStore();
  try {
    const raffle = await prisma.raffle.findUnique({
      where: { id },
      include: {
        tickets: {
          include: {
            client: {
              select: { name: true },
            },
          },
        },
      },
    });
    return {};
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}

export async function fetchTicketsWithClientName(raffleId: string) {
  noStore();
  try {
    const tickets = await prisma.ticket.findMany({
      where: { raffleId },
      include: {
        client: {
          select: { name: true },
        },
      },
    });
    return {
      tickets,
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}

export async function fetchRaffleById(id: string) {
  noStore();
  try {
    const raffle = await prisma.raffle.findUnique({
      where: { id },
    });
    return raffle;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}

export async function createRaffle(prevState: StateRaffle, formData: FormData) {
  const data = Object.fromEntries(formData.entries());

  const validatedFields = CreateRaffleSchema.safeParse(data);
  if (!validatedFields.success) {
    return {
      ...prevState,
      errors: validatedFields.error.flatten().fieldErrors,
      message: `Error al crear rifa`,
    };
  }
  const { name, description, playDate, priceForTicket } = CreateRaffleSchema.parse(data);
  const date = new Date(playDate);
  const price = parseFloat(priceForTicket);
  try {
    await prisma.raffle.create({
      data: {
        name,
        description,
        playDate: date,
        priceForTicket: price,
      },
    });
  } catch (error) {
    throw new Error(`Error al crear rifa ${error}`);
  }
  revalidatePath("/raffles");
  redirect("/raffles");
}

export async function updateRaffle(prevState: StateRaffle, formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  const validatedFields = UpdateRaffleSchema.safeParse(data);
  if (!validatedFields.success) {
    return {
      ...prevState,
      errors: validatedFields.error.flatten().fieldErrors,
      message: `Error al actualizar rifa`,
    };
  }

  const { id, name, description, playDate, priceForTicket, isActive } = UpdateRaffleSchema.parse(data);
  const date = new Date(playDate);
  const price = parseFloat(priceForTicket);

  let updateData = {};

  if (name) updateData = { ...updateData, name: data.name };
  if (description) updateData = { ...updateData, description: data.description };
  if (playDate) updateData = { ...updateData, playDate: date };
  if (priceForTicket) updateData = { ...updateData, priceForTicket: price };
  if (isActive) updateData = { ...updateData, isActive: data.isActive };
  if (Object.keys(updateData).length === 0) {
    return {
      ...prevState,
      message: `No se detectaron cambios`,
    };
  }

  try {
    await prisma.raffle.update({
      where: { id },
      data: updateData,
    });
  } catch (error) {
    throw new Error(`Error al crear rifa ${error}`);
  }
  revalidatePath("/raffles");
  redirect("/raffles");
}
export async function deleteRaffle(formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  const { id } = DeleteRaffleSchema.parse(data);
  try {
    await prisma.raffle.delete({ where: { id } });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error al borrar rifa: ${error.message}`);
    }
    throw new Error(`Error al borrar rifa`);
  } finally {
    revalidatePath("/raffles");
    redirect("/raffles");
  }
}

export async function createTicket(prevState: StateTicket, formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  const validatedFields = CreateTicketSchema.safeParse(data);
  if (!validatedFields.success) {
    return {
      ...prevState,
      errors: validatedFields.error.flatten().fieldErrors,
      message: `Error al crear ticket`,
    };
  }

  const { raffle, number } = CreateTicketSchema.parse(data);

  try {
    const ticket = await prisma.ticket.findFirst({ where: { number, raffle: { id: raffle } } });
    if (ticket) {
      return {
        ...prevState,
        message: `La boleta ${number} ya existe`,
        errors: {
          number: [`La boleta ${number} ya existe`],
        },
      };
    }
    await prisma.ticket.create({
      data: {
        number,
        raffle: { connect: { id: raffle } },
      },
    });
  } catch (error) {
    throw new Error(`Error al crear ticket ${error}`);
  }

  revalidatePath(`/raffles/${raffle}`);
  redirect(`/raffles/${raffle}`);
}


export async function sellTicket(formData: FormData) { 
  const data = Object.fromEntries(formData.entries());
  console.log(data);
}