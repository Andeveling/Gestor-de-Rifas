import { CreateRaffleSchema } from "@/types/raffles.types";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const GET = async (request: NextRequest) => {
  const raffles = await prisma.raffle.findMany({
    orderBy: {
      playDate: "asc",
    },
    include: {
      tickets: true,
    }
  });

  if (!raffles) return NextResponse.json({ raffles: [] });
  const totalRaffles = await prisma.raffle.count();

  return NextResponse.json({ raffles, totalRaffles });
};

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const { name, description, playDate, priceForTicket } = body;

  const validateFields = CreateRaffleSchema.safeParse({ name, description, playDate, priceForTicket });

  if (!validateFields.success) {
    return NextResponse.json({ error: validateFields.error });
  }

    const parsedPriceForTicket = parseFloat(priceForTicket);
    const parsedDate = new Date(playDate);

  try {
    const newRaffle = await prisma.raffle.create({
      data: {
        name,
        description,
        playDate: parsedDate,
        priceForTicket: parsedPriceForTicket,
      },
    });
    return NextResponse.json({ newRaffle });
  } catch (error) {
    console.log(error);
  }
};
