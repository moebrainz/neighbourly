import connectToDatabase from "@/lib/mongodb";
import Review from "@/models/Review";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    await connectToDatabase();
    
    const newReview = await Review.create(data);
    
    return NextResponse.json({ success: true, data: newReview }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating review:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create review" },
      { status: 500 }
    );
  }
}
