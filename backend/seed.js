import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Event from "./models/Event.js";

dotenv.config();
connectDB();

const seedEvents = async () => {
    try {
        await Event.create([
            {
                title: "Tech Conference 2025",
                description: "A conference about emerging technologies.",
                date: new Date("2025-04-10T10:00:00.000Z"),
                location: "New York"
            },
            {
                title: "AI Summit",
                description: "A deep dive into AI advancements.",
                date: new Date("2025-05-15T09:30:00.000Z"),
                location: "San Francisco"
            }
        ]);
        console.log("Sample events added!");
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedEvents();
