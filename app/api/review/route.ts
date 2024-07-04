import db from "@/libs/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { cname, crating, ccomment } = await req.json();

    if (!cname || !crating || !ccomment) {
      return new NextResponse("Bad Request: Missing fields", { status: 400 });
    }

    if (isNaN(crating) || crating < 1 || crating > 5) {
      return new NextResponse("Bad Request: Invalid rating should be 1 to 5", {
        status: 400,
      });
    }

    const review = await db.review.create({
      data: {
        cname,
        crating,
        ccomment,
      },
    });

    return NextResponse.json(review);
  } catch (error) {
    console.error("[REVIEW_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET() {
  const reviews = await db.review.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(reviews);
}
