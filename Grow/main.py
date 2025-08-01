import os
from openai import OpenAI

from dotenv import load_dotenv, find_dotenv
import pandas as pd
import prompts

_ = load_dotenv(find_dotenv())
client = OpenAI(
    api_key = os.environ.get('OPEN_API_KEY'),
    project=os.environ.get('PROJECT_ID', '').strip()

)

model_type = "gpt-3.5-turbo"
temperature = 0.3
max_tokens = 300
topic = ""

#read csv file
df = pd.read_csv("./tasks.csv")
task_strings = []

for index, row in df.iterrows():
    task_string = f"{row['Task']}: {row['Average Time (minutes)']}"
    task_strings.append(task_string)

task_list_str = "\n".join(task_strings)


user_input = "I made my bed"
system_message = prompts.system_message
prompt = prompts.generatePromt(task_list_str, user_input)


def getTaskInfo():
    response = client.chat.completions.create(
    model=model_type,
    messages=[
        {"role": "system", "content": system_message},
        {"role": "user", "content": prompt}
    ]
)
    
    return response.choices[0].message.content
#print("API KEY:", os.environ.get('OPEN_API_KEY'))
result = getTaskInfo()
print(result)

