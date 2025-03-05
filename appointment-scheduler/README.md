# Healthcare Appointment Scheduler

A full-stack web application for scheduling and managing healthcare appointments. Built with React frontend and Spring Boot backend.

## Features

- Schedule appointments with healthcare providers
- View and manage provider information
- Interactive calendar for date selection
- Real-time updates for appointment status
- Responsive design for all devices

## Tech Stack

### Frontend
- React
- React Router for navigation
- Axios for API calls
- React Calendar for date picking
- CSS for styling

### Backend
- Spring Boot
- Spring Data JPA
- MySQL Database
- RESTful API architecture

## Prerequisites

- Node.js (v14 or higher)
- Java JDK 11
- Maven
- MySQL

## Setup and Installation

### Database Setup
1. Create a MySQL database named `appointment_scheduler`
2. Update database credentials in `backend/src/main/resources/application.properties`

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd appointment-scheduler/backend
   ```
2. Build the project:
   ```bash
   mvn clean install
   ```
3. Run the Spring Boot application:
   ```bash
   mvn spring-boot:run
   ```
   The backend server will start on http://localhost:8080

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd appointment-scheduler/frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
   The frontend application will start on http://localhost:3000

## API Endpoints

### Providers
- GET `/api/providers` - Get all providers
- GET `/api/providers/{id}` - Get provider by ID
- POST `/api/providers` - Create new provider
- PUT `/api/providers/{id}` - Update provider
- DELETE `/api/providers/{id}` - Delete provider

### Appointments
- GET `/api/appointments` - Get all appointments
- GET `/api/appointments/{id}` - Get appointment by ID
- GET `/api/appointments/provider/{providerId}` - Get provider's appointments
- POST `/api/appointments` - Create new appointment
- PUT `/api/appointments/{id}` - Update appointment
- DELETE `/api/appointments/{id}` - Delete appointment

## Project Structure

```
appointment-scheduler/
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/example/appointmentscheduler/
│   │   │   └── resources/
│   │   └── test/
│   └── pom.xml
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── App.js
│   └── package.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
