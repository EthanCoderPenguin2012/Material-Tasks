from flask import Flask, request, jsonify
from flask_cors import CORS
import openai

app = Flask(__name__)
CORS(app)

# Set your OpenAI API key here
openai.api_key = "your-openai-api-key"

@app.route('/api/ai-assistant', methods=['POST'])
def ai_assistant():
    data = request.json
    user_input = data.get('input', '')

    try:
        response = openai.Completion.create(
            engine="text-davinci-003",
            prompt=f"You are a task management assistant. {user_input}",
            max_tokens=150
        )
        return jsonify({"response": response.choices[0].text.strip()})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)