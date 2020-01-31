import CssBaseline from "@material-ui/core/CssBaseline";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React, { useState, useEffect } from "react";
import Header from "../../molecules/Header/Header";
import Sidebar from "../../molecules/Sidebar/Sidebar";
import MainInterface from "../MainInterface/MainInterface";
import TaskService from "../../../services/taskService";
import { Task } from "../../../types/Task";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column"
    },
    content: {
      display: "flex"
    },
    main: {
      flexGrow: 1
    },
    toolbar: { ...theme.mixins.toolbar }
  })
);

const App: React.FC = () => {
  const classes = useStyles();
  const taskService: TaskService = new TaskService();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const res: Task[] = await taskService.list();
      setTasks(res);
    };
    if (loading) {
      fetchData();
      setLoading(false);
    }
  }, [loading, taskService]);

  const handleAddedTask = async (task: Task): Promise<void> => {
    const res: Task[] = await taskService.list();
    setTasks(res);
    setSelectedTask(res.find(t => t.processInstanceId === task.id) || null);
  };

  const handleCompletedTask = (): void => {
    setSelectedTask(null);
    setLoading(true);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header />
      <div className={classes.content}>
        <Sidebar
          tasks={tasks}
          addedTask={handleAddedTask}
          handleSelectedTask={setSelectedTask}
          reloadTasks={() => setLoading(true)}
          selectedTask={selectedTask}
        />
        <main className={classes.main}>
          <div className={classes.toolbar} />
          <MainInterface
            task={selectedTask}
            completedTask={handleCompletedTask}
          />
        </main>
      </div>
    </div>
  );
};

export default App;
