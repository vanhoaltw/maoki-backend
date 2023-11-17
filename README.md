# Hotel Haven Backend

This repository houses the backend infrastructure for Hotel Haven, a MERN (MongoDB, Express.js, React, Node.js) stack project, contributing to a comprehensive hotel management application.

## Project Links

- [Hotel Haven Requirement and Documentation](https://chiseled-numeric-49f.notion.site/Booking-Heaven-d115045250f84e92b5bbece1439a0987?pvs=4)
- [Hotel Haven Requirement Distributions](https://shanjeed-saif.atlassian.net/jira/software/projects/HOT/boards/2/timeline?shared=&atlOrigin=eyJpIjoiZDZkNTkzYzZhMWQ5NDA3NDg1ZWQ3N2JjNWU3M2M0ZGUiLCJwIjoiaiJ9)
- [Hotel Haven Frontend](https://github.com/sheik-mostafizur/hotel-haven-frontend)
- [Hotel Haven Backend](https://github.com/sheik-mostafizur/hotel-haven-backend)

## Description

The backend is designed using Node.js with Express.js as the server framework, providing endpoints and handling database operations. MongoDB is utilized as the database solution, managed using the Mongoose library.

## Folder Structure

The backend follows a structured folder layout to ensure maintainability and scalability:

- **Controllers**: Handles business logic and request handling.
- **Middlewares**: Handles to user authenticated.
- **Models**: Defines MongoDB data schemas using Mongoose.
- **Routes**: Manages endpoint routing and API handling.
- **Utils**: Contains utility functions and helper modules.

## Authentication & Security

- **bcrypt**: Library for secure password hashing.
- **jsonwebtoken**: Token-based authentication for secure API access.
- **dotenv**: Module for environment variable management, ensuring security of sensitive information.

## Additional Dependencies

- **cors**: Middleware for enabling CORS (Cross-Origin Resource Sharing) handling.
- **node-cron**: Library for task scheduling in Node.js.
- **sslcommerz-lts**: Integration module for SSLCommerz payment gateway.

## Scripts

- **dev**: Start the development server using Nodemon for automatic server restart on file changes.

## Development Dependencies

- **nodemon**: Development dependency for auto-restarting the server during development.

## Contributors

<!-- Contributors List -->
<table>
  <tr>
    <!-- Contributor 1 -->
    <td align="center">
      <a href="https://github.com/sheik-mostafizur">
        <img src="https://avatars.githubusercontent.com/u/106415501?v=4" width="100px;" alt="Sheik Mostafizur"/>
        <br />
        <sub><b>Sheik Mostafizur</b></sub>
      </a>
    </td>
    <!-- Contributor 2 -->
    <td align="center">
      <a href="https://github.com/AbuBokorprog">
        <img src="https://avatars.githubusercontent.com/u/116732361?v=4" width="100px;" alt="Abu Bokor"/>
        <br />
        <sub><b>Abu Bokor</b></sub>
      </a>
    </td>
    <!-- Contributor 3 -->
    <td align="center">
      <a href="https://github.com/eshansaif">
        <img src="https://avatars.githubusercontent.com/u/35582062?v=4" width="100px;" alt="Md. Shanjeed Saif"/>
        <br />
        <sub><b>Md. Shanjeed Saif</b></sub>
      </a>
    </td>
    <!-- Add more contributors as needed -->
  </tr>
</table>
<!-- End of Contributors List -->
