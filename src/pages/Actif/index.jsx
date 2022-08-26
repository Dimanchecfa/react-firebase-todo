import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Divider, IconButton } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Switch from "@mui/material/Switch";
import { deleteDoc, doc } from "firebase/firestore";

import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { deleteTodos, handleToogle } from "../../redux/slices/todoSlice";
import { db } from "../../utils/firebase.config";

const Actif = (todoActive) => {
  const dispatch = useDispatch();
  const deleteTodo = async (todoId) => {
    await Swal.fire({
      title: "Etes-vous sûr?",
      text: "Vous ne pourrez pas récupérer cette todo!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, supprimer!",
      cancelButtonText: "Annuler",
    }).then(async (result) => {
      deleteDoc(doc(db,"todos", todoId)).then(() => {
        dispatch(deleteTodos(todoId));
      })
      if (result.value) {
        Swal.fire("Supprimé!", "Votre todo a été supprimé.", "success");
        setTimeout(() => {
          Swal.close();
        }, 2000);
      }
    });
  };

  return (
    <List sx={{ width: "100%", maxWidth: 800, bgcolor: "background.paper" }}>
      {todoActive?.map((item, index) => {
        return (
          <>
            <ListItem key={index}>
              <ListItemText id="switch-list-label-wifi">
                <Button
                  variant="outlined"
                  color={item?.completed ? "success" : "error"}
                >
                  {item?.title}
                </Button>
              </ListItemText>
              <Switch
                edge="end"
                onChange={() => dispatch(handleToogle(item.title))}
                checked={item.completed}
                inputProps={{
                  "aria-labelledby": "switch-list-label-wifi",
                }}
              />
              <IconButton
                aria-label="delete"
                onClick={() => deleteTodo(item?.title)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItem>
            <Divider />
          </>
        );
      })}
    </List>
  );
};
export default Actif;
