import {
  Button,
  createStyles,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  makeStyles,
  Theme,
  Fab
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import React from "react";
import TaskService from "../../../services/taskService";
import { Task } from "../../../types/Task";
import UpdateIcon from "@material-ui/icons/Update";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0
    },
    drawerPaper: {
      width: drawerWidth
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3)
    },
    sidebarButton: {
      width: "fit-content",
      margin: theme.spacing(1, 2)
    },
    fab: {
      position: "absolute",
      bottom: theme.spacing(2),
      right: theme.spacing(2)
    },
    toolbar: { ...theme.mixins.toolbar }
  })
);

interface Props {
  tasks: Task[];
  addedTask: (task: Task) => Promise<void>;
  handleSelectedTask: (task: Task) => void;
  reloadTasks: () => void;
  selectedTask: Task | null;
}

const Sidebar: React.FC<Props> = ({
  addedTask,
  handleSelectedTask,
  tasks,
  reloadTasks,
  selectedTask
}) => {
  const classes = useStyles();
  const taskService: TaskService = new TaskService();

  const handleAddTask = async () => {
    const res = await taskService.start();
    addedTask(res);
  };

  return (
    <div>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.toolbar} />
        <List dense>
          <ListSubheader>Neue Tasks</ListSubheader>
          {tasks.map(
            (task: Task) =>
              task.taskDefinitionKey === "recordDamage" && (
                <ListItem
                  button
                  key={task.id}
                  onClick={() => handleSelectedTask(task)}
                  selected={task.id === selectedTask?.id}
                >
                  <ListItemText
                    primary={task.name}
                    secondary={new Date(task.created).toLocaleString()}
                  />
                </ListItem>
              )
          )}
        </List>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleAddTask()}
          className={classes.sidebarButton}
          startIcon={<AddIcon />}
        >
          Neuer Task
        </Button>
        <List dense>
          <ListSubheader>Bereit zur Prüfung</ListSubheader>
          {tasks.map(
            (task: Task) =>
              task.taskDefinitionKey === "checkDamage" && (
                <ListItem
                  button
                  key={task.id}
                  onClick={() => handleSelectedTask(task)}
                  selected={task.id === selectedTask?.id}
                >
                  <ListItemText
                    primary={task.name}
                    secondary={new Date(task.created).toLocaleString()}
                  />
                </ListItem>
              )
          )}
        </List>
        <Fab
          aria-label={"Neu laden"}
          className={classes.fab}
          color={"primary"}
          onClick={reloadTasks}
        >
          <UpdateIcon />
        </Fab>
      </Drawer>
    </div>
  );
};

export default Sidebar;
