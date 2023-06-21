# MindFlow

MindFlow is a collaborative, real-time diagramming web application. It allows users to create and edit diagrams, collaborate with others in real-time, and share diagrams with different permissions.

## Features

- Real-time collaboration: Multiple users can work on the same diagram simultaneously and see changes in real-time.
- Various diagram types: MindFlow supports different types of diagrams such as flowcharts, mind maps, and organizational charts.
- User authentication: Users can register and log in to MindFlow using their email and password.
- Sharing capabilities: Users can share their diagrams with others and set different permissions for each collaborator.
- Notifications: Users receive notifications for diagram updates, comments, and mentions.

## Installation

To run MindFlow locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/diagram-app.git
   ```

2. Install the dependencies for the frontend and backend:

   ```bash
   # Frontend
   cd diagram-app/frontend
   npm install

   # Backend
   cd ../backend
   npm install
   ```

3. Set up the environment variables:

   - Create a `.env` file in the `frontend` directory and add the following variables:

     ```
     NEXT_PUBLIC_API_URL=http://localhost:5000/api
     ```

   - Create a `.env` file in the `backend` directory and add the necessary variables for your database connection, JWT secret, etc.

4. Start the development servers:

   ```bash
   # Frontend
   cd diagram-app/frontend
   npm run dev

   # Backend
   cd ../backend
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000` to access MindFlow.

## Usage Examples

Here are some examples of how to use MindFlow:

1. Register a new user account.
2. Log in with your credentials.
3. Create a new diagram and add nodes to it.
4. Share the diagram with another user and set their permissions.
5. Collaborate with the other user in real-time and see changes instantly.
6. Receive notifications for diagram updates and comments.

## API Documentation

The API documentation for MindFlow can be found in the [API.md](backend/API.md) file. It provides detailed information about the available endpoints, request/response formats, and authentication requirements.

## License

This project is licensed under the [MIT License](LICENSE).

## Backend-Frontend Interaction

```mermaid
sequenceDiagram
  autonumber
  participant U as User
  participant F as Frontend
  participant B as Backend
  participant D as Database
  participant AI as GPT-4
  participant S as Image Storage
  participant Redis as Redis Job Queue
  participant A as Avatar Creation API

  U->>F: Inputs email and password
  F->>B: Sends registration request
  B->>D: Saves user data
  D-->>B: Acknowledges save
  B-->>F: Sends JWT

  U->>F: Inputs diagram data, persona description, and diagram description
  F->>B: Sends diagram creation request
  B->>AI: Sends persona description
  AI->>B: Return processed description & features for avatar
  B->>A: Send processed description to Avatar API
  A->>B: Return generated avatar image
  B->>S: Store generated avatar image
  S->>B: Confirm storage and return image location
  B->>D: Saves diagram and avatar image
  D-->>B: Acknowledges save
  B->>AI: Sends diagram description
  AI-->>B: Returns initial diagram
  B->>D: Saves diagram
  D-->>B: Acknowledges save
  B-->>F: Returns initial diagram and avatar image link

  U->>F: Create multiple nodes in diagram
  Note over F: Display nodes as loading
  F->>B: Send batch request for node creation
  B->>AI: Forward request to GPT-4
  AI-->>B: Return instructions for nodes
  B-->>F: Return created nodes data
  Note over F: Update nodes with returned data

  F->>U: Display updated nodes in diagram

  U->>F: Inputs new node prompt
  F->>B: Sends node addition request
  B->>AI: Sends node prompt
  AI-->>B: Returns new node
  B->>D: Updates diagram
  D-->>B: Acknowledges update
  B-->>F: Returns updated diagram

  U->>F: Edit or cancel the nodes/jobs in the diagram
  F->>B: Sends edit or cancel request
  B->>Redis: Modify or cancel the jobs in the queue
  Redis-->>B: Acknowledges modification/cancellation
  B-->>F: Returns updated status to Frontend

  U->>F: Shares diagram
  F->>B: Sends sharing request
  B->>D: Updates sharing settings
  D-->>B: Acknowledges update
  B-->>F: Returns updated sharing settings

  F->>B: Request to execute Diagram
  B->>D: Fetch Diagram
  B->>B: Translate Diagram to sequence of Instructions
  loop Each Instruction
    B->>D: Fetch Instruction details
    B->>B: Check type of Instruction
    alt If Instruction is to send email or perform immediate action
      B->>B: Execute Instruction immediately
    else If Instruction is to wait for a period of time
      B->>Redis: Schedule Job with delay
    else If Instruction is to wait until a certain time
      B->>Redis: Schedule Job with delay until specific time
    end
  end
  Redis->>B: Trigger Jobs as per the schedule
  B->>B: Execute the respective Instruction
  loop Each Instruction requiring GPT-4
    B->>AI: Send Instruction details
    AI->>B: Respond with suggested Instruction
  end
  B->>F: Send back results/confirmation
```

This sequence diagram illustrates the interaction between the frontend (F), backend (B), database (D), GPT-4 (AI), image storage (S), Redis job queue (Redis), and the Avatar Creation API (A) in the MindFlow application.

Please note that this is a simplified representation and may not include all the details of the actual implementation.

## License

This project is licensed under the [MIT License](LICENSE).