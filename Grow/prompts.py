system_message = """
You are a task recognition assistant. You are given a list of tasks and the average time each task takes to complete. Each task is described in simple language.
"""

def generatePromt(task_list_str, user_input):
    prompt = f"""
    Your job is to:
    1. Determine if a new user-described activity already exists in the list. Use loose matching (e.g. "going for a walk" is the same as "walking" or "tidying the bed" equals to "making the bed").
    2. If the task **exists**, return:
    - "exists"
    - The best-matching task name from the list
    - The average time it takes in minutes

    3. If the task **does not exist**, return:
    - "not-exists"
    - A concise, appropriate name for the task based on the description
    - An estimated average time based on similar tasks if possible, or use your best judgment.

    Be concise in your output and return in the exact format of:
    "status of task, name of the task, time it takes to complete the task"
    
    only return the info and not the headers
    The task list is as follows:
    {task_list_str}

    The user says they did: "{user_input}"
    """

    return prompt