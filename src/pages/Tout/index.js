import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Switch from "@mui/material/Switch";
import {Button, Divider, IconButton} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteTodos, setTodo } from "../../features/todoSlice";
import { get } from "react-hook-form";


export default function Tout(localTodos) {
    const [checked, setChecked] = React.useState([0]);

    const todoData = useSelector(state => state?.todos?.todos);
    const dispatch = useDispatch();

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };
  
    
        
React.useEffect(() => {
   const data = localStorage.getItem("todos");
    if (data) {
        dispatch(setTodo(JSON.parse(data)));
    }
    console.log(todoData);
    
    
    

} , [dispatch]);

    const deleteTodo = async (title) => {
        const showAlert = await Swal.fire({
            title: 'Etes-vous sûr?',
            text: "Vous ne pourrez pas revenir en arrière!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui, supprimer!'
        })

        if (showAlert.isConfirmed) {
            dispatch(deleteTodos(title));
            

            await  Swal.fire(
                'Supprimé!',
                'Votre todo a été supprimé.',
                'success',
            )
        }

    }


    return (
        <List sx={{width: "100%", maxWidth: 800, bgcolor: "background.paper"}}>
            {todoData?.map((item, index) => {
                return (
                    <>
                        <ListItem key={index}>
                            <ListItemText id="switch-list-label-wifi">
                                <Button variant="outlined" color="error">
                                    {item?.title}
                                </Button>
                            </ListItemText>
                            <Switch
                                edge="end"
                                onChange={handleToggle(item?.title)}
                                checked={checked.indexOf(item?.title) !== -1}
                                inputProps={{
                                    "aria-labelledby": "switch-list-label-wifi",
                                }}
                            />
                            <IconButton aria-label="delete" onClick={() => deleteTodo(item?.title)}>
                                <DeleteIcon/>
                            </IconButton>
                        </ListItem>
                        <Divider/>
                    </>
                );
            })}
        </List>
    );
}
