import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import MaterialDatatable from "material-datatable";
import { useForm } from 'react-hook-form';



const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Usuario() {
  const classes = useStyles();
  const { register, handleSubmit, setValue} = useForm(
    {defaultValues:{mail:"E-mail *", pass:"Password *"}}
  );

  const [usuarios, setUsuarios] = useState([])

  useEffect(() => {
    cargarUsuario();
  }, []);


  const columns = [

    {
      name: 'Email',
      field: 'mail'
    }
  ];

  const options={
    selectableRows: false,
    print: false,
    onlyOneRowCanBeSelected: false,
    textLabels: {
      body: {
        noMatch: "Lo sentimos, no se encuentran registros",
        toolTip: "Sort",
      },
      pagination: {
        next: "Siguiente",
        previous: "Página Anterior",
        rowsPerPage: "Filas por página:",
        displayRows: "de",
      },
    },
    download: false,
    pagination: true,
    rowsPerPage: 5,
    usePaperPlaceholder: true,
    rowsPerPageOptions: [5, 10, 25],
    sortColumnDirection: "desc",
  }



  const onSubmit = data => {
    axios
    .post("http://localhost:9000/api/usuario", data)
    .then(
      (response) =>{
        if(response.status == 200) {
          alert("Usuario Creado")
          console.log(response.data)
        }
      }
    )
  }

  const cargarUsuario = async () => {
    const { data } = await axios.get("http://localhost:9000/api/usuario");
    setUsuarios(data.data);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Crear Usuario
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="mail"
                name="mail"
                variant="outlined"
                required
                fullWidth
                id="mail"
                label="E-mail"
                autoFocus
                inputRef={register}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                inputRef={register}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Crear Usuario
          </Button>
          <Grid container justify="flex-end">
          </Grid>
          <Grid container spacing={1}>
            <MaterialDatatable
        
              title={"Usuarios"}
              data={usuarios}
              columns={columns}
              options={options}
            />
          </Grid>
        </form>
      </div>
    </Container>
  );
}