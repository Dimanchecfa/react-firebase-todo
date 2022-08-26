import { Box, Button, TextField } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import TabBar from "../components/tabBar";
import { addTodo, getTodos,} from "../redux/slices/todoSlice";
import { db } from "../utils/firebase.config";
import {collection , addDoc, getDocs} from "firebase/firestore";
import useEnhancedEffect from "@mui/material/utils/useEnhancedEffect";

const Layout = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = React.useState("");
  const [completed, setCompleted] = React.useState(false);
  const [errorForm, setErrorForm] = React.useState(false);

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (title) {
      const data = {
        title,
        completed,
      };
    await  addDoc(collection(db , "todos"), data).then(res => {
        dispatch(addTodo(data));
      
          getDocs(collection(db , "todos")).then(res => {
            dispatch(getTodos(res.docs.map(doc =>({...doc.data(), id: doc.id}))));
           
          });
        setTitle("");
        setErrorForm(false);
      })
    } else {
      setErrorForm(true);
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
                    {errorForm && (
                      <span className="text-red-500">Ce champs est requis</span>
                    )}
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
