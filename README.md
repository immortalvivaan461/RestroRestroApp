# RestroRestro

**Version:** 1.0.0  
**Author:** Vivaan  

**Description:**  
Full-stack restaurant reservation web application built with Node.js, Express, MongoDB, and EJS.

---

## Features

### User Features
- Make new reservations with details: name, email, contact, number of persons, timing, food preference, and occasion.
- Check reservation status by email or booking ID.

### Admin Features
- Admin login with session-based authentication.
- View all reservations in a dashboard.
- Accept or reject reservations.
- Secure logout functionality.

### UI Features
- Responsive design for desktop, tablet, and mobile.
- Smooth animations and modern UI layout.
- Glassy navbar, hero section, and interactive menus.

---

## Tech Stack
- **Backend:** Node.js, Express
- **Frontend:** EJS, HTML, CSS, Bootstrap
- **Database:** MongoDB Atlas
- **Authentication:** Express-session
- **Deployment:** Render.com

---

## Folder Structure

- RestroRestro/
  - models/
    - book.js
  - public/
    - CSS, JS, images
  - views/
    - home.ejs
    - status.ejs
    - admin-login.ejs
    - admin-dashboard.ejs
  - .env
  - app.js
  - package.json
  - README.md


---

## Installation

# Clone the repository
git clone https://github.com/immortalvivaan461/RestroRestroApp.git
cd RestroRestroApp

# Install dependencies
npm install


## Environment Variables

- **MONGO_URI**: `mongodb+srv://lordvivaan461_db_user:L2buQkjExV356n9J@restroapp.kmvnnlj.mongodb.net/?retryWrites=true&w=majority&appName=RestroApp`
- **PORT**: `3000`

---

## Running Locally

- **Development**: `npm run dev`
- **Production**: `npm start`
- **URL**: [http://localhost:3000](http://localhost:3000)

---

## Deployment (Render.com)

**Steps:**
1. Connect your GitHub repository.
2. Build command: `npm install`
3. Start command: `node app.js`
4. Add environment variables (`MONGO_URI`, `PORT`) in Render dashboard.
5. Deploy and access the live URL.

---

## Usage

### User Flow
- Open the home page.
- Fill out the reservation form and submit.
- View reservation status page.
- Check status anytime via email or booking ID.

### Admin Flow
- Visit `/admin`.
- Login with credentials.
- Accept or reject reservations.
- Logout securely.

---

## Admin Access

- **Username**: `restroAdmin@123`
- **Password**: `Spice123`

---

## Contributing

**Steps:**
1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push branch: `git push origin feature-name`
5. Create a Pull Request.

---

## License

- **Type**: MIT
- **Note**: Developed by Vivaan
