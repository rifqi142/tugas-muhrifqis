import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { bname, bphone, bdate } = await req.json();

    if (!bname || !bphone || !bdate) {
      return new NextResponse("Bad Request: Missing fields", { status: 400 });
    }

    const booking = await db.booking.create({
      data: {
        bname,
        bphone,
        bdate,
      },
    });

    return NextResponse.json(booking);
  } catch (error) {
    console.error("[BOOKING_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
