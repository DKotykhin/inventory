# Inventory Test Task

![Logo](https://inventory-lyart-six.vercel.app/logo.png)

## Technologies

-   React, NextJS 14, NextUI, Prisma ORM, postgreSQL, Typescript, Tailwind, React Hook Form, Axios, Bcrypt, Cloudinary, SWR, Resend, zod, jsonwebtoken, react toastify, date-fns, Zustand 

## Features
- Next 14 for frontend and backend
- NextUI for UI
- Postgres SQL DB placed on remote service [NEON](https://console.neon.tech). You can see all models in schema.prisma file
- Full authorization with email verification and forgot password
- avatar upload service
- protected pages except auth pages
- create, read and delete for Orders and Products

## Functionality
- User:
    - registration
    - form validation
    - email verification for new users
    - login with additional verification if email not verified
    - password recovery with email for existed users
    - change password with old password verification
    - avatar upload with Cloudinary
- All pages except auth pages available only for authorized users
- Orders:
    - add order with form validation
    - delete order
    - order list with all info from DB
    - full pagination with page url. You can use this link for loading particular page
    - products view for order
    - add product with form validation
    - delete product
    - sum of product prices in two currencies
    - order navigation when product side bar is open
- Products:
    - product list with all info from DB
    - delete product
    - select product by type or all products view
    - full pagination with page url. You can use this link for loading particular page
- Real time clock in header
- Amount connections indicator in header

## Environment Variables

To run this project locally, you will need to add the following environment variables to your .env file. See also in .env.example in root directory

##### DB
DATABASE_URL=   
DIRECT_URL=   

##### Cloudinary variables
CLOUDINARY_NAME=   
CLOUDINARY_API_KEY=   
CLOUDINARY_API_SECRET=   

##### Email service
RESEND_API_KEY=   
RESEND_EMAIL_ADDRESS=   

##### Others
JWT_TOKEN_SECRET_KEY=   
FRONT_URL=   
IMAGES_HOSTNAME=   
NEXT_PUBLIC_WS_SERVER=   

## Deploy on Vercel

[Deploy Link](https://inventory-lyart-six.vercel.app)

## Author

Dmytro Kotykhin
-   [Github](https://github.com/DKotykhin)
-   [Web](https://dmytro-kotykhin.space)
-   [LinkedIn](https://www.linkedin.com/in/dmytro-kotykhin-4683151b)
