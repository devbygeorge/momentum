export default function CreateTask() {
  return (
    <div>
      <h1>Create a New Task</h1>
      <form>
        <input type="text" placeholder="Task Title" required />
        <button type="submit">Create Task</button>
      </form>
    </div>
  );
}
