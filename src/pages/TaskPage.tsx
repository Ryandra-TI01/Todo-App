import TaskSection from "../components/tasks/TaskSection";
import StatsSection from "../components/tasks/StatsSection";
import { ReactElement } from "react";

export default function Dashboard(): ReactElement {
  return (
    <>
      <StatsSection />
      <TaskSection />
    </>
  );
}
