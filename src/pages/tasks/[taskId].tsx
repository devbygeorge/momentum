import { useRouter } from "next/router";

export default function TaskDetails() {
  const router = useRouter();
  const { taskId } = router.query;

  return (
    <div>
      <h1 className="heading">დავალების დეტალები</h1>
      <p>Task ID: {taskId}</p>
    </div>
  );
}
