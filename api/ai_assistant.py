from flask import Flask, request, jsonify, g
from flask_cors import CORS
import openai

app = Flask(__name__)
CORS(app)

# Set your OpenAI API key here
openai.api_key = "your-openai-api-key"

# Initialize API usage tracking
@app.before_request
def before_request():
    if not hasattr(g, 'api_usage'):
        g.api_usage = {"requests": 0}

@app.route('/api/ai-assistant', methods=['POST'])
def ai_assistant():
    g.api_usage["requests"] += 1  # Increment API usage counter
    data = request.json
    user_input = data.get('input', '')
    model = data.get('model', 'text-davinci-003')  # Default to text-davinci-003
    temperature = data.get('temperature', 0.7)  # Default temperature
    max_tokens = data.get('max_tokens', 150)  # Default token limit

    if not user_input:
        return jsonify({"error": "Input is required"}), 400

    try:
        response = openai.Completion.create(
            engine=model,
            prompt=f"You are a task management assistant. {user_input}",
            temperature=temperature,
            max_tokens=max_tokens
        )
        return jsonify({"response": response.choices[0].text.strip()})
    except openai.error.OpenAIError as e:
        return jsonify({"error": f"OpenAI API error: {str(e)}"}), 500
    except Exception as e:
        return jsonify({"error": f"Unexpected error: {str(e)}"}), 500

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "API is running"}), 200

@app.route('/models', methods=['GET'])
def list_models():
    try:
        models = openai.Model.list()
        return jsonify({"models": [model['id'] for model in models['data']]}), 200
    except openai.error.OpenAIError as e:
        return jsonify({"error": f"OpenAI API error: {str(e)}"}), 500
    except Exception as e:
        return jsonify({"error": f"Unexpected error: {str(e)}"}), 500

@app.route('/usage', methods=['GET'])
def usage():
    return jsonify({"api_usage": g.api_usage}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)