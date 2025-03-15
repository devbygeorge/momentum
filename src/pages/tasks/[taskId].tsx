import TaskDetails from "@/features/task/TaskDetails";
import { GetServerSideProps } from "next";

type TaskDetailsPageProps = {
  taskId: string;
};

export default function TaskDetailsPage({ taskId }: TaskDetailsPageProps) {
  return <TaskDetails taskId={taskId} />;
}

// Fetch taskId on the server before rendering
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { taskId } = context.params || {};

  if (!taskId) {
    return {
      notFound: true, // Redirects to 404 page if no taskId
    };
  }

  return {
    props: { taskId },
  };
};
