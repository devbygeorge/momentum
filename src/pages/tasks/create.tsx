export default function CreateTaskPage() {
  return (
    <div>
      <h1 className="heading">შექმენი ახალი დავალება</h1>
      <form>
        <input type="text" placeholder="Task Title" required />
        <button type="submit">Create Task</button>
      </form>
    </div>
  );
}
