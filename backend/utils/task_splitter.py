def split_task(task, chunk_size=25):
    """
    Split a task into manageable chunks of specified size (in minutes)
    
    Args:
        task (dict): Task to split
        chunk_size (int): Size of each chunk in minutes
    
    Returns:
        list: List of subtasks
    """
    duration = task.get('duration', 0)
    if duration <= 0:
        return []
    
    num_chunks = (duration + chunk_size - 1) // chunk_size  # Ceiling division
    subtasks = []
    
    for i in range(num_chunks):
        # Calculate chunk duration (last chunk might be shorter)
        chunk_duration = min(chunk_size, duration - (i * chunk_size))
        
        subtask = {
            'id': f"{task['id']}-{i+1}",
            'title': f"{task['title']} (Part {i+1}/{num_chunks})",
            'duration': chunk_duration,
            'completed': False
        }
        subtasks.append(subtask)
    
    return subtasks
