// app.js
import express from "express";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import BOOK from "./models/book.js";

const app = express();
const port = 3000;

// Fix __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

// Connect to MongoDB (optional if not yet done)
main()
    .then(() => {
        console.log("connection successfully")
    })
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/restroDB');

}

// Post route
app.post("/newreservation", async (req, res) => {
    const { name, email, contact, persons, food, timing, occasion, date, status } = req.body;
    let newbook = new BOOK({
        name,
        email,
        contact,
        persons,
        food,
        timing,
        date,
        occasion,
        status
    })

    await newbook.save()
        .then((savedBook) => {
            console.log(savedBook);
            res.redirect(`/status/${savedBook._id}`);
        })
        .catch(err => {
            console.log(err);
            res.status(400).send("Validation failed. Missing required fields.");
        });
});


app.get("/status/:id", async (req, res) => {
    try {
        const reservation = await BOOK.findById(req.params.id);
        if (!reservation) {
            return res.status(404).send("Reservation not found.");
        }
        res.render("status.ejs", { reservation });
    } catch (err) {
        console.log(err);
        res.status(500).send("Error fetching reservation.");
    }
});


// Admin route
app.get("/admin", async (req, res) => {
    try {
        const reservations = await BOOK.find();
        res.render("admin.ejs", { reservations });
    } catch (err) {
        console.log(err);
        res.status(500).send("Error retrieving reservations.");
    }
});

// Accept Reservation
app.post("/admin/accept/:id", async (req, res) => {
    try {
        await BOOK.findByIdAndUpdate(req.params.id, { status: 'accepted' });
        res.redirect("/admin");
    } catch (err) {
        console.log(err);
        res.status(500).send("Failed to accept reservation.");
    }
});

// Reject Reservation
app.post("/admin/reject/:id", async (req, res) => {
    try {
        await BOOK.findByIdAndUpdate(req.params.id, { status: 'rejected' });
        res.redirect("/admin");
    } catch (err) {
        console.log(err);
        res.status(500).send("Failed to reject reservation.");
    }
});



// Home route
app.get("/", (req, res) => {
    res.render("home.ejs");
});

// Server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
