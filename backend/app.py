from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS to fix frontend communication issues

@app.route('/bfhl', methods=['GET', 'POST'])
def bfhl():
    if request.method == 'GET':
        return jsonify({"operation_code": 1})

    elif request.method == 'POST':
        data = request.json.get("data", [])
        if not isinstance(data, list):
            return jsonify({"is_success": False, "message": "Invalid input"}), 400

        user_id = "john_doe_17091999"
        email = "john@xyz.com"
        roll_number = "ABCD123"

        numbers = [item for item in data if item.isdigit()]
        alphabets = [item for item in data if item.isalpha()]
        highest_alphabet = [max(alphabets, key=lambda x: x.lower())] if alphabets else []

        response = {
            "is_success": True,
            "user_id": user_id,
            "email": email,
            "roll_number": roll_number,
            "numbers": numbers,
            "alphabets": alphabets,
            "highest_alphabet": highest_alphabet
        }
        return jsonify(response)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
