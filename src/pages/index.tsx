import Head from "next/head";
import Filters from "@/features/kanban/Filters";
import KanbanBoard from "@/features/kanban/KanbanBoard";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Momentum - Tasks Page</title>
      </Head>
      <h1 className="heading">დავალებების გვერდი</h1>
      <Filters />
      <KanbanBoard />
    </>
  );
}
