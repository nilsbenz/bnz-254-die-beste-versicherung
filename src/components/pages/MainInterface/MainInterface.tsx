import {
  Button,
  Container,
  createStyles,
  FormControl,
  Grid,
  Input,
  InputAdornment,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Theme,
  Typography,
  Paper,
  CircularProgress
} from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import React, { useState, useEffect } from "react";
import TaskService from "../../../services/taskService";
import { Task } from "../../../types/Task";
import {
  CheckDamageVariables,
  RecordDamageVariables,
  TaskVariables
} from "../../../types/Variables";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "2000px",
      padding: theme.spacing(3)
    },
    form: {
      marginTop: theme.spacing(2)
    },
    textField: {
      width: "100%"
    },
    alignEnd: {
      display: "flex",
      justifyContent: "flex-end"
    },
    paper: {
      padding: theme.spacing(3),
      marginTop: theme.spacing(3)
    },
    checkButtons: {
      marginTop: theme.spacing(2)
    },
    checkButton: {
      marginRight: theme.spacing(2)
    },
    progress: {
      position: "absolute",
      top: "50%",
      left: "50%"
    },
    heading: {
      marginBottom: theme.spacing(1)
    }
  })
);

interface Props {
  task: Task | null;
  completedTask: () => void;
}

const MainInterface: React.FC<Props> = ({ task, completedTask }) => {
  const classes = useStyles();

  const taskService: TaskService = new TaskService();

  const [taskVariables, setTaskVariables] = useState<TaskVariables | null>(
    null
  );
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [amount, setAmount] = useState<number | null>(null);
  const [insurance, setInsurance] = useState<
    "bronze" | "silver" | "gold" | null
  >(null);

  useEffect(() => {
    if (task) {
      const fetchData = async () => {
        const res = await taskService.listTaskVariables(task.id);
        setTaskVariables(res);
      };
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [task]);

  const handleRecordDamage = () => {
    const variables: RecordDamageVariables = {
      variables: {
        firstname: { value: firstname },
        lastname: { value: lastname },
        address: { value: address },
        city: { value: city },
        email: { value: email },
        message: { value: message },
        amount: { value: amount || 0 },
        insurance: { value: insurance }
      }
    };
    if (task) {
      const complete = async () => {
        taskService.complete(task.id, variables);
        completedTask();
      };
      complete();
    }
  };

  const handleCheckDamage = (granted: boolean) => {
    const variables: CheckDamageVariables = {
      variables: {
        granted: { value: granted }
      }
    };
    if (task) {
      const complete = async () => {
        taskService.complete(task.id, variables);
        completedTask();
      };
      complete();
    }
  };

  if (task) {
    if (task.taskDefinitionKey === "recordDamage") {
      return (
        <Container maxWidth="sm" className={classes.root}>
          <Typography variant="h4" className={classes.heading}>
            {task.name}
          </Typography>
          <Typography>Bitte fülle das nachfolgende Formular aus.</Typography>
          <form className={classes.form} noValidate autoComplete="off">
            <Grid container alignItems="center" justify="center" spacing={2}>
              <Grid item xs={6}>
                <TextField
                  id="firstname"
                  label="Vorname"
                  value={firstname}
                  onChange={e => setFirstname(e.target.value)}
                  className={classes.textField}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="lastname"
                  label="Nachname"
                  value={lastname}
                  onChange={e => setLastname(e.target.value)}
                  className={classes.textField}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="address"
                  label="Adresse"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  className={classes.textField}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="city"
                  label="Stadt"
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  className={classes.textField}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="email"
                  label="Mailadresse"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className={classes.textField}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl className={classes.textField}>
                  <InputLabel htmlFor="amount">
                    Höhe des Schadensfalls
                  </InputLabel>
                  <Input
                    id="amount"
                    value={amount}
                    onChange={e =>
                      e.target.value.match(/^\d+\.\d+$/) &&
                      setAmount(Number(e.target.value))
                    }
                    startAdornment={
                      <InputAdornment position="start">CHF</InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl className={classes.textField}>
                  <InputLabel id="insurance-label">
                    Welche Versicherung haben Sie abgeschlossen?
                  </InputLabel>
                  <Select
                    labelId="insurance-label"
                    id="insurance"
                    value={insurance}
                    onChange={e =>
                      setInsurance(
                        e.target.value as "gold" | "silver" | "bronze"
                      )
                    }
                  >
                    <MenuItem value={"bronze"}>Bronze</MenuItem>
                    <MenuItem value={"silver"}>Silber</MenuItem>
                    <MenuItem value={"gold"}>Gold</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="message"
                  label="Ihre Geschichte"
                  className={classes.textField}
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  multiline
                />
              </Grid>
              <Grid item xs={12} className={classes.alignEnd}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleRecordDamage}
                >
                  Erfassen
                </Button>
              </Grid>
            </Grid>
          </form>
        </Container>
      );
    } else if (taskVariables) {
      return (
        <Container maxWidth="sm" className={classes.root}>
          <Typography variant="h4" className={classes.heading}>
            {task.name}
          </Typography>
          <Typography>Bitte prüfe den folgenden Sachverhalt.</Typography>
          <Paper className={classes.paper}>
            <Grid container alignItems="center">
              <Grid item xs={5}>
                <Typography variant="body2">Name:</Typography>
              </Grid>
              <Grid item xs={7}>
                <Typography variant="body1">
                  {taskVariables.firstname?.value}{" "}
                  {taskVariables.lastname?.value}
                </Typography>
              </Grid>
              <Grid item xs={5}>
                <Typography variant="body2">Höhe des Schadensfalls:</Typography>
              </Grid>
              <Grid item xs={7}>
                <Typography variant="body1">
                  {taskVariables.amount &&
                    (
                      Math.round(taskVariables.amount?.value * 100) / 100
                    ).toFixed(2)}{" "}
                  Fr.
                </Typography>
              </Grid>
              <Grid item xs={5}>
                <Typography variant="body2">Begründung:</Typography>
              </Grid>
              <Grid item xs={7}>
                <Typography variant="body1">
                  {taskVariables.message?.value}
                </Typography>
              </Grid>
              <Grid item xs={5}>
                <Typography variant="body2">Übernommener Betrag:</Typography>
              </Grid>
              <Grid item xs={7}>
                <Typography variant="body1">
                  {taskVariables.payedAmount &&
                    (
                      Math.round(taskVariables.payedAmount?.value * 100) / 100
                    ).toFixed(2)}{" "}
                  Fr.
                </Typography>
              </Grid>
            </Grid>
            <div className={classes.checkButtons}>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<CheckIcon />}
                onClick={() => handleCheckDamage(true)}
                className={classes.checkButton}
              >
                Bestätigen
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<ClearIcon />}
                onClick={() => handleCheckDamage(false)}
                className={classes.checkButton}
              >
                Verwerfen
              </Button>
            </div>
          </Paper>
        </Container>
      );
    } else {
      return <CircularProgress className={classes.progress} />;
    }
  } else {
    return (
      <Container maxWidth="sm" className={classes.root}>
        <Typography variant="h4" className={classes.heading}>
          Kein Task ausgewählt
        </Typography>
        <Typography>Bitte wähle einen Task aus der Liste links.</Typography>
      </Container>
    );
  }
};

export default MainInterface;
