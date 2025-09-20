
# Warehouse Management System

This project was a simple MERN stack, CRUD application that my friends and I developed as part of our learning modules to help us complete our internship tasks at Educourse. My role in this project was as a backend developer, where I built the backend logic using Node.js and Express. My friend, Fategreedtony, served as the frontend developer and built the user interface with React. Special thanks to Mr. sindhu-nugroho for mentoring us throughout this project.

## Authors

- [@WeedLover2 ](https://github.com/WeedLover2)
- [@FateGreedtony  ](https://github.com/fategreedtony)



## Tech Stack

**Frontend:** React, Redux, TailwindCSS

**Database:** MongoDB

**Backend:** Node.js, Express


## Run Locally

Clone the project

```bash
  git clone https://github.com/WeedLover2/Apps-Management-Gudang.git
```

Go to the project directory

```bash
  cd Apps-Management-Gudang
```

Install dependencies for backend

```bash
  npm i mongoose express body-parser cors cloudinary dotenv express jsonwebtoken multer nodemon Router
```

Install dependencies for frontend

```bash
  npm i axios  antd jsonwebtoken react-router-dom tailwindcss @tailwindcss/vite
```

Start the frontend

```bash
  npm run dev
```

Start the backend

```bash
  npm start
```

## Note

You cannot run this project without a .env file, so you'll need to set it up yourself. Check the config folder to see how to configure the variables. Be sure to add the JWT_SECRET and PORT variables. For JWT_SECRET, use your own key, and for PORT, you can set it to 4000 or another available port. I hope you’re able to run the project if you’d like. Unfortunately, contributions to this project are not accepted.
