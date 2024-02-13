
## System Architecture

<img width="396" alt="image" src="https://github.com/task-management-cc/task-management/assets/87371122/c5e9bcd7-057a-4142-869e-93c1b66c0d6e">


## Steps taken to create the application

1. Requirement Gathering
Feature Identification: Clearly outline the core features such as user registration, login, task creation, editing, deletion, etc.
User Experience Consideration: Understand how users will interact with the application to ensure a seamless experience.

2. AWS Service Setup
RDS with PostgreSQL:
Initialize and configure the RDS instance.
Set up security groups for controlled access.
EC2 for Node.js Backend:
Launch and configure the EC2 instance.
Set up necessary security groups and network settings.
S3 for Hosting React Application:
Create and configure an S3 bucket for web hosting.
Set up permissions and access policies.
IAM User for Cognito:
Create an IAM user with the necessary permissions for Cognito.
Configure Cognito in AWS Amplify for authentication.

3. Backend Development (Node.js)
API Development:
Design and develop RESTful APIs for task management.
Database Integration:
Establish a connection to the RDS PostgreSQL database.
Design and create tables for storing tasks.

4. Frontend Development (React)
Amplify for Authentication:
Integrate AWS Amplify for user authentication.
React Component Development:
Develop React components for tasks viewing, creating, editing, and deleting.
Implement state management for dynamic user interfaces.

5. Deployment
Deploy Backend to EC2:
Transfer Node.js application to the EC2 instance.
Install Node.js, npm, and any dependencies.
Configure the application to communicate with the RDS instance.
Deploy Frontend to S3:
Build the React application.
Upload the build files to the S3 bucket.
Configure bucket for web hosting and set proper access policies
