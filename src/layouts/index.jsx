import {Box , TextField} from "@mui/material";
import React from "react";
import {Button} from "@mui/material";
import { useDispatch,} from "react-redux";
import { addTodo, setTodo ,} from "../redux/slices/todoSlice";
import TabBar from "../components/tabBar";

const Layout = () => {
    const dispatch = useDispatch();
    


  
    const [title, setTitle] = React.useState("");
    const [completed, setCompleted] = React.useState(false);
    const [todos, setTodos] = React.useState([]);


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
            setTitle("");



        }
    };


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
