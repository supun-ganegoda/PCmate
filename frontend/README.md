## Description

PCmate is a fully functional e-commerce platform that includes payment gateway as well.

## project run in dev mode

navigate to the backend folder and run
npm run sever --> to start backend server
npm run client --> to start frontend sever
npm run dev --> to run both simultaneously

## project run in production mode

navigate to backend folder, change the NODE_ENV to 'production' in .env file
run npm run server --> will run website @port 4000

## env description

# change your .env file suited for your credentials

NODE_ENV=development or production
PORT=4000
MONGO_URL=mongodb+srv://supun:sudeepa123@cluster0.miy0a8p.mongodb.net/pcmate?retryWrites=true&w=majority
JWT_SECRET=PCmate320
PAYPAL_CLIENT_ID=AdypWz0_l1QFce8zQQZ8mZi4y85SOkmz-PJRfloPe5cGId2rZWD7MHke4WM6FKPN0GJCOrcJC-bkWZJp
PAGE_COUNT=8
