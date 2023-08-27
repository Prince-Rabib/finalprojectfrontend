import React,{useState, useEffect} from 'react'
import { makeStyles, Grid,Paper, Avatar, TextField, Button, Typography,Link, responsiveFontSizes } from '@material-ui/core'

import axios from 'axios';
import { useHistory } from "react-router-dom";
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Select from '@material-ui/core/Select';
import {host} from '../../host';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

const useStyles = makeStyles((theme) =>({

    grid:{
        marginTop:theme.spacing(10),
        height:'100%',
        display:'flex',
        flexDirection: 'column',
        textAlign:'center',        
     },
     snackbar:{
        width: '100%',
        '& > * + *': {
          marginTop: theme.spacing(2),
        },
     },
     password:{
        marginTop: theme.spacing(2)
      },
      signup:{
        marginTop: theme.spacing(2)
      },
      paperStyle:{
        padding :20,
        height:'70vh',
        width:500, 
        margin:"20px auto",
  
     },
     signupSection:{
        marginTop:theme.spacing(3),
        marginBottom:theme.spacing(3)
     }
    
    
}))

 

const Users =()=>{
     const [check,setCheck] =useState(false);
     const [date,setdate] = useState("");    
     const [mechanic, setmechanic] = useState("");
     const [rows,Setrows]= useState([]);




        const history = useHistory();

        const handleRoute = (result) =>{
      
              history.push('/'+result)

        }


      function createData(name, calories, fat, carbs, protein) {
      return { name, calories, fat, carbs, protein };
       }
   
    useEffect(async() => {
    try {
        const data = await axios.get(host+"/api/users/all");

        console.log("Users" +data)
        if(data.data){
            Setrows(data.data);
        }
 
    }   catch (error) {
     
        history.push('/adminpanel')
    }
  
   },[check])

    const deleteid = async(deleteid)=>{
             try {
                 let data = await axios.delete(host+"/api/users/"+[deleteid]);
                 setCheck(!check);
                 
             } catch (error) {
                     console.log(error.message);
             }
               

    }
    const classes = useStyles();
    const [deletepost,Setdeletepost]= useState([]);
  
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = (id) => {
      setOpen(true);
    };
  
    const handleClose = () => {
      console.log("delete id " + deletepost);
      deleteid(deletepost);
      setOpen(false);
    };

    const ignore = () => {
     setOpen(false);
    }
    const dialogueBox = (id) => {
       Setdeletepost(id)
       handleClickOpen();

    }

     

    return(
      <>
        <Grid className={classes.grid}>
            
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Name</TableCell>
                          <TableCell align="center">User ID</TableCell>
                          <TableCell align="center">Email</TableCell>
                          <TableCell align="center">Date</TableCell>
                          <TableCell align="center">Remove</TableCell>

                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.slice(0).reverse().map((row) => (
                         
                          <TableRow key={row._id}>
                            <TableCell component="th" scope="row">
                             {row.name}
                            </TableCell>
                            <TableCell align="center">{row._id}</TableCell>
                            <TableCell align="center">{row.email}</TableCell>
                             <TableCell align="center">{row.date.slice(0,10)}</TableCell>
                             {(row.email == "admin@gmail.com")? <TableCell align="center"><Button variant="contained" color="Primary">Admin</Button></TableCell>
                             :<TableCell align="center"><Button variant="contained" color="secondary"onClick={()=> dialogueBox(row._id)}>Delete</Button></TableCell>}  
                                 
                            
                          </TableRow>
                        ))}
                      </TableBody>
                   </Table>
             </TableContainer>   
            
        </Grid>

     <div className={classes.snackbar}>

            <Snackbar  open={open.status} autoHideDuration={6000} onClose={handleClose}>
                <Alert  severity={open.severity} onClose={handleClose}>
                    {open.message}
                </Alert>
            </Snackbar>  
                
     </div>
     <div>
      
  
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Do you want to delete this user ?"}</DialogTitle>
        <DialogContent>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="secondary" autoFocus>
            Delete
          </Button>
          <Button onClick={ignore} variant="contained" color="primary" autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
        </>
    )
}

export default Users;