import {Box, Tab, Tabs, TextField} from "@mui/material";
import React, {useEffect} from "react";
import {Button} from "@mui/material";
import TabPanel from "../components/tabBar/tab";
import Tout from "../pages/Tout";
import  Swal from 'sweetalert2';
import {useForm} from "react-hook-form";
import a11yProps from "../components/tabBar/a11yProps";
import HANDLER_STORAGE from "../constant/app.constant";
import {getTodos, setTodos} from "../services/Todos";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, setTodo } from "../features/todoSlice";
import TabBar from "../components/tabBar";

const Layout = () => {
    const [value, setValue] = React.useState(0);
    const dispatch = useDispatch();
    

    const handleChange = (SyntheticEvent, newValue) => {
        setValue(newValue);
    };

    const [checked, setChecked] = React.useState(["wifi"]);

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
    const [title, setTitle] = React.useState("");
    const [completed, setCompleted] = React.useState(false);
    const [todos, setTodos] = React.useState([

    ]);

    const [dataString, setDataString] = React.useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title) {
            const data = {
                title,
                completed,
            };


            let localTodos = [...todos, data];
            localStorage.setItem("todos", JSON.stringify(localTodos));
            setTodos(localTodos);
            //add todo to redux
            dispatch(addTodo(localTodos));
            dispatch(setTodo(localTodos));

            setDataString(JSON.parse(localStorage.getItem("todos")));
            setTitle("");



        }
    };

    useEffect( () =>  {

    

        
    }, []);
    


    return (
        <>
            <div className="h-screen  mt-8">
                <div class="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans ">
                    <div class="bg-white rounded shadow p-6 m-4 w-2/4  ">
                        <div class="mb-4">
                            <h1 class="text-xl">Mes taches</h1>
                            <form class="flex flex-col" onSubmit={handleSubmit}>
                                <div class="flex mt-4 justify-around ">
                                    <Box
                                        sx={{
                                            width: 650,
                                            maxWidth: "100%",
                                        }}
                                    >
                                        <TextField
                                            fullWidth
                                            label="Entrer une tache"
                                            id="fullWidth"
                                            size="small"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                        />
                                        {/* {errorForm.title ? (
                      <span className="text-red-500">{errorForm.title}</span>
                    ) : null} */}
                                    </Box>

                                    <Button type="submit" variant="contained">
                                        Ajouter
                                    </Button>
                                </div>
                            </form>
                        </div>
                        <TabBar />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Layout;
