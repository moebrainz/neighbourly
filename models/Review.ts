import mongoose, { Schema, model, models } from "mongoose";

const ReviewSchema = new Schema(
  {
    lga: { type: String, required: true },
    estate: { type: String, required: true },
    street: { type: String, default: "" },
    tenureYears: { type: String, default: "" },

    power: { type: Number, required: true },
    flooding: { type: Number, required: true },
    roads: { type: Number, required: true },
    security: { type: Number, required: true },
    marketAccess: { type: Number, required: true },
    transport: { type: Number, required: true },
    transportCostRange: { type: String, default: "" },

    mtn: { type: Number, default: 0 },
    airtel: { type: Number, default: 0 },
    glo: { type: Number, default: 0 },
    mobile9: { type: Number, default: 0 },

    overallComment: { type: String, default: "" },
    anonymous: { type: Boolean, default: true },
  },
  { timestamps: true },
);

// If the model exists, use it. Otherwise, create it.
const Review = models?.Review || model("Review", ReviewSchema);

export default Review;
