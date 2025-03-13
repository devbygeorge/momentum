import { useRouter } from "next/router";
import TaskDetails from "@/features/task/TaskDetails";

export default function TaskDetailsPage() {
  const router = useRouter();
  const { taskId } = router.query;
  console.log(taskId);

  return <TaskDetails />;
}
