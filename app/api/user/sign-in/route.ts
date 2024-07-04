import bcrypt from "bcrypt";
import db from "@/libs/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return new NextResponse("Bad Request: Missing fields", { status: 400 });
    }
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return new NextResponse("Unauthorized: User not found", { status: 401 });
    }
    const isPasswordMatch = bcrypt.compareSync(password, user.password);
    if (!isPasswordMatch) {
      return new NextResponse("Unauthorized: Invalid password", {
        status: 401,
      });
    }
    return NextResponse.json(user);
  } catch (error) {
    console.error("[LOGIN_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
