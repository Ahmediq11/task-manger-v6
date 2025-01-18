# Task Manager Web Application

A modern, responsive task management application built with Node.js, Express, MySQL, and vanilla JavaScript. The application features user authentication, task management, and a clean, intuitive interface.

## Features

- User Authentication (Register/Login)
- JWT-based Authorization
- Task Management (Create, Read, Update, Delete)
- Responsive Design
- Dark Mode Support
- Modern UI with animations
- Task limit (10 tasks per user)
- Real-time feedback system
- Separate sections for active and completed tasks

## Technologies Used

### Frontend

- HTML5
- CSS3 (with modern features and animations)
- JavaScript (ES6+)
- Bootstrap 5.3
- Inter Font Family

### Backend

- Node.js
- Express.js
- MySQL
- JSON Web Tokens (JWT)
- bcrypt (for password hashing)
- CORS

## Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (version 12 or higher)
- MySQL
- Web browser (preferably Chrome, Firefox, or Safari)

## Installation

1. Clone the repository:

```bash
git clone [repository-url]
cd task-manager
```

2. Install dependencies:

```bash
npm install
```

3. Set up the MySQL database:

- Create a new database named `user_auth`
- Update the database configuration in `server.js`:

```javascript
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // Add your MySQL password if set
  database: "user_auth",
});
```

4. Start the server:

```bash
node server.js
```

5. Access the application:
   Open your web browser and navigate to `http://localhost:3000`

## Project Structure

```
task-manager/
├── dashboard.html       # Main application dashboard
├── dashboard.js        # Dashboard functionality
├── index.html         # Landing page
├── login.html         # Login page
├── login.js          # Login functionality
├── register.html     # Registration page
├── register.js      # Registration functionality
├── modern-styles.css # Main stylesheet
├── style.css        # Additional styles
├── server.js        # Backend server
└── README.md        # Documentation
```

## Security Features

- Password hashing using bcrypt
- JWT-based authentication
- Protected API endpoints
- SQL injection prevention
- CORS enabled
- Secure session management

## API Endpoints

### Authentication

- `POST /register` - Register new user
- `POST /login` - User login

### Tasks

- `GET /tasks` - Get all tasks for authenticated user
- `POST /tasks` - Create new task
- `PATCH /tasks/:id` - Update task status
- `DELETE /tasks/:id` - Delete task

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Future Enhancements

- Email verification
- Password reset functionality
- Task categories/labels
- Task due dates
- Task priority levels
- Task sharing between users
- Task search and filtering
- Export tasks functionality
- Mobile application

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Bootstrap team for the excellent CSS framework
- Inter font family by Rasmus Andersson
- Node.js and Express.js communities
- MySQL community
