# Gartic-Clone: A Beautiful and Interactive Drawing Game
Welcome to our Gartic-Clone project! This application is a recreation of the popular drawing game Gartic.io, featuring a beautiful and user-friendly design, combined with the functionality of Pinturillo. The project is developed using Angular for the front-end, Node.js with TypeScript for the back-end, and utilizes Azure for cloud-based data storage. Real-time game interactions are powered by WebSockets.

## Features
- **Beautiful and Interactive Design**: Enjoy a visually appealing interface that's easy to navigate.
- **Real-Time Drawing Game**: Experience real-time game interaction using WebSockets.
- **User Authentication**: Secure login and user management.
- **Cloud-Based Storage**: Reliable data storage on Azure.
- **Multiplayer Support**: Play with friends or join public games.

## Installation

### Prerequisites
- Node.js (v14 or later)
- Angular CLI (v12 or later)
- TypeScript

### Steps
1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/gartic-clone.git
   cd gartic-clone
   ```
2. **Install dependencies**

   For the front-end:
   ```bash
   cd pinturillo_app_front
   npm install
   ```
   For the back-end:
   ```bash
   cd pinturillo_app_back
   npm install
   ```
3. **Run the Application**

   Start the back-end server:
   ```bash
   cd pinturillo_app_back
   npm start
   ```
   Start the front-end server:
   ```bash
   cd pinturillo_app_front
   ng serve
   ```
   The application should now be running at http://localhost:4200.

## Usage
- Navigate to http://localhost:4200 in your web browser.
- Register or log in to start playing.
- Join an existing game or create a new one.
- Enjoy drawing and guessing with friends!

## Technologies Used
- Front-end: Angular, TypeScript, HTML, CSS
- Back-end: Node.js, TypeScript, Express.js
- Database: Azure Storage
- Real-time Communication: WebSockets (Socket.IO)

## Contributing
We welcome contributions! Please follow these steps:

1. Fork the repository.
2. Create a new branch (git checkout -b feature-branch).
3. Make your changes and commit them (git commit -m 'Add some feature').
4. Push to the branch (git push origin feature-branch).
5. Open a pull request.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Contact
If you have any questions or feedback, please contact us at jsdosman0@gmail.com.