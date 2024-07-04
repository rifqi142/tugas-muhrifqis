import bcrypt from "bcrypt";
import db from "@/libs/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, phone, email, password } = await req.json();

    if (!name || !phone || !email || !password) {
      return new NextResponse("Bad Request: Missing fields", { status: 400 });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = await db.user.create({
      data: {
        name,
        phone,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error("[REGISTER_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
