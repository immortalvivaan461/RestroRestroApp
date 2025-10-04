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
root:
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
