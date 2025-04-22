# Material Tasks

Material Tasks is a feature-rich Progressive Web Application (PWA) for task management. It incorporates modern design principles like Glassmorphism and Google's Material Design, and includes advanced features such as an AI assistant, customizable themes, and task filtering.

## Features

- **Task Management**: Add, edit, delete, and filter tasks.
- **AI Assistant**: Get task suggestions and assistance using OpenAI's GPT model.
- **Customizable Themes**: Choose from multiple themes like Forest Green, Ocean Blue, and more.
- **Dynamic Fonts**: Select from a variety of Google Fonts.
- **Progressive Web App**: Fully offline-capable with a service worker.
- **Real-time Updates**: WebSocket-based task synchronization.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/Material-Tasks.git
   cd Material-Tasks
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. To deploy to GitHub Pages:
   ```bash
   npm run deploy
   ```

## Deployment

- **GitHub Pages**: The app is configured for deployment to GitHub Pages. Update the `homepage` field in `package.json` with your repository details.
- **Vercel**: Use the `vercel.json` configuration for seamless deployment.

## API Endpoints

### AI Assistant
- **Endpoint**: `/api/ai-assistant`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "input": "Your query here"
  }
  ```
- **Response**:
  ```json
  {
    "response": "AI-generated response"
  }
  ```

### WebSocket
- **Endpoint**: `/api/websocket`
- **Description**: Handles real-time task synchronization.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Python (Flask), Node.js
- **Build Tools**: Webpack
- **Styling**: Google Material Design, Glassmorphism
- **AI**: OpenAI GPT

## Contributing

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-branch
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add new feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-branch
   ```
5. Open a pull request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Acknowledgments

- [OpenAI](https://openai.com) for the GPT model.
- [Google Fonts](https://fonts.google.com) for typography.
- [Vercel](https://vercel.com) for deployment.
- [GitHub Pages](https://pages.github.com) for hosting.
