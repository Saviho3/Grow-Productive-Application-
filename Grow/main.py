import os
from openai import OpenAI
from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv, find_dotenv
import pandas as pd
import prompts

app = Flask(__name__)
CORS(app)


@app.route("/grow", methods=["POST"])
def taskAssesment():
    data = request.get_json()
    user_task = data.get("task")

    _ = load_dotenv(find_dotenv())

    client = OpenAI(
        api_key=os.environ.get("OPEN_API_KEY"),
        project=os.environ.get("PROJECT_ID", "").strip()
    )

    model_type = "gpt-3.5-turbo"
    temperature = 0.3
    max_tokens = 300
    topic = ""

    # read csv file
    script_dir = os.path.dirname(os.path.abspath(__file__))
    csv_path = os.path.join(script_dir, "tasks.csv")
    df = pd.read_csv(csv_path)

    task_strings = []
    for index, row in df.iterrows():
        task_string = f"{row['Task']}: {row['Average Time (minutes)']}"
        task_strings.append(task_string)

    task_list_str = "\n".join(task_strings)

    # user_input = "did my homework"
    system_message = prompts.system_message
    prompt = prompts.generatePromt(task_list_str, user_task)

    def getTaskInfo():
        response = client.chat.completions.create(
            model=model_type,
            messages=[
                {"role": "system", "content": system_message},
                {"role": "user", "content": prompt}
            ]
        )
        return response.choices[0].message.content

    result = getTaskInfo()
    print(result)
    try:
        status, name, time = [x.strip() for x in result.split(",")]
    except ValueError:
        return jsonify({
            "error": "GPT output format unexpected",
            "raw": result
        }), 500

    json_result = {
        'status':status,
        'time': time,
        'name': name
    }
    
    print(json_result)

    return jsonify(json_result)


if __name__ == "__main__":
    app.run(debug=True, port=5000)
