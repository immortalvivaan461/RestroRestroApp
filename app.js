// app.js
import express from "express";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import BOOK from "./models/book.js";
import session from 'express-session';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;


// Fix __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: true,
}));

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ MongoDB Atlas Connected Successfully");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error.message);
        process.exit(1);
    }
};

connectDB();

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


// GET /status → show form to check reservation
app.get("/status", (req, res) => {
    res.render("status", { reservation: null, error: null });
});

// POST /status → check reservation by email or ID
// app.post("/status", async (req, res) => {
//     const { emailOrId } = req.body;

//     try {
//         const reservation = await BOOK.findOne({
//             $or: [{ email: emailOrId }, { _id: emailOrId }]
//         });

//         if (reservation) {
//             res.render("status", { reservation, error: null });
//         } else {
//             res.render("status", { reservation: null, error: "No reservation found with this Email or Booking ID." });
//         }
//     } catch (err) {
//         console.log(err);
//         res.render("status", { reservation: null, error: "Invalid input or ID format." });
//     }
// });
// app.post("/status", async (req, res) => {
//     const { emailOrId } = req.body;

//     try {
//         let query = { email: emailOrId }; // default search by email

//         // If input is a valid ObjectId, also allow searching by _id
//         if (mongoose.Types.ObjectId.isValid(emailOrId)) {
//             query = { $or: [{ email: emailOrId }, { _id: emailOrId }] };
//         }

//         const reservation = await BOOK.findOne(query);

//         if (reservation) {
//             res.render("status", { reservation, error: null });
//         } else {
//             res.render("status", { reservation: null, error: "No reservation found with this Email or Booking ID." });
//         }
//     } catch (err) {
//         console.log(err);
//         res.render("status", { reservation: null, error: "Invalid input or ID format." });
//     }
// });
app.post("/status", async (req, res) => {
    const { emailOrId } = req.body;

    try {
        let query = { email: emailOrId }; // default search by email

        // Only search by _id if input is a valid ObjectId
        if (mongoose.Types.ObjectId.isValid(emailOrId)) {
            query = { $or: [{ email: emailOrId }, { _id: emailOrId }] };
        }

        const reservation = await BOOK.findOne(query);

        if (reservation) {
            res.render("status", { reservation, error: null });
        } else {
            res.render("status", { reservation: null, error: "No reservation found with this Email or Booking ID." });
        }
    } catch (err) {
        console.log(err);
        res.render("status", { reservation: null, error: "Invalid input or ID format." });
    }
});

// Keep the old route for direct post-reservation redirect
app.get("/status/:id", async (req, res) => {
    try {
        const reservation = await BOOK.findById(req.params.id);
        if (!reservation) return res.status(404).send("Reservation not found.");
        res.render("status", { reservation, error: null });
    } catch (err) {
        console.log(err);
        res.status(500).send("Error fetching reservation.");
    }
});


// app.get("/status/:id", async (req, res) => {
//     try {
//         const reservation = await BOOK.findById(req.params.id);
//         if (!reservation) {
//             return res.status(404).send("Reservation not found.");
//         }
//         res.render("status.ejs", { reservation });
//     } catch (err) {
//         console.log(err);
//         res.status(500).send("Error fetching reservation.");
//     }
// });

// Admin route
app.get("/admin", async (req, res) => {
    res.render("admin-login", { error: "", username: "" });

});

//Admin Login Handler
app.post("/admin/login", (req, res) => {
    const { username, password } = req.body;

    if (username === "restroAdmin@123" && password === "Spice123") {
        req.session.adminLoggedIn = true;
        res.redirect("/admin/dashboard");
    } else {
        res.render("admin-login", {
            error: "Invalid username or password",
            username: username
        });
    }
});


// ✅ Admin dashboard (after login)
app.get("/admin/dashboard", async(req, res) => {
    if (req.session.adminLoggedIn) {
        // Make sure reservations array exists or is empty
        const reservations = await BOOK.find().sort({ createdAt: -1 });
        res.render("admin-dashboard", { reservations });
    } else {
        res.redirect("/admin");
    }
});


app.post("/admin/accept/:id", async (req, res) => {
    await BOOK.findByIdAndUpdate(req.params.id, { status: "accepted" });
    res.redirect("/admin/dashboard");
});


app.post("/admin/reject/:id", async (req, res) => {
    await BOOK.findByIdAndUpdate(req.params.id, { status: "rejected" });
    res.redirect("/admin/dashboard");
});

app.get("/admin/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.log(err);
            return res.redirect("/admin/dashboard");
        }
        res.redirect("/admin");
    });
});


// Home route
app.get("/", (req, res) => {
    res.render("home.ejs");
});

// Server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
