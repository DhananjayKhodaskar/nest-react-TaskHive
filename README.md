# TODO List Web App

## Description
This is a TODO list web application developed using **React JS** for the frontend and **Nest JS** for the backend. The application features role-based access control **(RBAC)**, allowing different permissions for users based on their roles, such as **ADMIN** and **USER**. It also implements **JWT-based authentication** with both **Access Tokens** and **Refresh Tokens** for secure and seamless authentication management.

**The RBAC functionality is deeply integrated into the backend using **Nest JS's Guards**, ensuring that access to specific resources and operations is tightly controlled based on the user’s role.**
## Key Features
- **Role-Based Access Control:**
  - **ADMIN**: Can perform all CRUD (Create, Read, Update, Delete) operations.
  - **USER**: Can only read the TODO list.
  
- **Token Management**:
  - Implements both **Access Tokens** and **Refresh Tokens** for secure authentication.
  - The app automatically logs in internally when the access token expires updating access token as well as refresh token, as long as the refresh token is valid.

## Technologies Used
- **Frontend**: React JS,Material UI ,Redux Toolkit ,Axios ,React Router Dom
- **Backend**: Nest JS with Guards, JWT, Mongoose, Passport
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
## Login Page
<img width="1470" alt="Screenshot 2024-09-22 at 10 17 51 PM" src="https://github.com/user-attachments/assets/c69e227e-aeb5-483f-9a34-79bd6d2abe1e">


**Description:** This is the login page where users can enter their credentials to access the application.

## Signup Page
<img width="1470" alt="Screenshot 2024-09-22 at 10 18 32 PM" src="https://github.com/user-attachments/assets/80fb42d2-510a-4263-a1c1-14832678d580">


**Description:** This is the signup page where new users can create accounts.

## Admin View
<img width="1470" alt="Screenshot 2024-09-22 at 10 20 02 PM" src="https://github.com/user-attachments/assets/78689904-7765-4018-8250-2a8d14d2a80a">


**Description:** This is the view accessible to administrators, he/she has full CRUD permission.

## User View
<img width="1470" alt="Screenshot 2024-09-22 at 10 21 49 PM" src="https://github.com/user-attachments/assets/f87259fe-50e2-419e-92b4-e83d5bd72796">


**Description:** This is the view accessible to regular users,he/she has only view only permission.

## Getting Started
### Prerequisites
- Node.js installed on your machine
- npm or yarn for package management

## Project Setup

1. **Clone the repositories:**
   - `git clone https://github.com/your-repo/todo-app-nest-be-main`
   - `git clone https://github.com/your-repo/todo-app-nest-fe-main`

2. **Navigate to project directories:**
   - `cd todo-app-nest-be-main`
   - `cd todo-app-nest-fe-main`

3. **Install dependencies:**
   - `npm install`

## Environment Variables

**Backend (BE):**

- **Port:** `PORT=4000` (or your desired port)
- **MongoDB database URL:** `DATABASE_URL=your_mongo_db_url`
- **Access Token:** `ACCESS_TOKEN_SECRET=youraccesstokensecret`
   `ACCESS_TOKEN_EXPIRATION=15h` (or desired expiration time)
- **Refresh Token:** `REFRESH_TOKEN_SECRET=yourrefreshtokensecret`
   `REFRESH_TOKEN_EXPIRATION=7d` (or desired expiration time)

**Frontend (FE):**

- **API URL:** `REACT_APP_API_URL=http://localhost:4000` (or your backend API URL)

**For testing purposes (BE):**

- **Access Token:** `ACCESS_TOKEN_SECRET=youraccesstokensecret`
   `ACCESS_TOKEN_EXPIRATION=10s`
- **Refresh Token:** `REFRESH_TOKEN_SECRET=yourrefreshtokensecret`
   `REFRESH_TOKEN_EXPIRATION=20s`

**Additional Notes:**

- Replace placeholders like `your_mongo_db_url`, `youraccesstokensecret`, and `yourrefreshtokensecret` with your actual values.
- Ensure that the environment variables are set correctly for both the backend and frontend projects.
- You can use environment variable management tools like `.env` files or environment variable managers to store and manage these variables.
- For production environments, consider using a more secure method to store and manage sensitive information.
