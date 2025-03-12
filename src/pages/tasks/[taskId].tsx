import { useRouter } from "next/router";

export default function TaskDetails() {
  const router = useRouter();
  const { taskId } = router.query;

  return (
    <div>
      <h1>Task Details</h1>
      <p>Task ID: {taskId}</p>
    </div>
  );
}
