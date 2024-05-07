import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";


export const GET = async (request: Request, { params }: { params: { id: string } }) => {
    const raffle = await prisma.raffle.findUnique({ where: { id: params.id }, include: { tickets: true } });
    if (!raffle) return NextResponse.json({ error: "No se encontró el sorteo" });
    console.log(raffle)
    return NextResponse.json({ raffle });
}