import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useNavigate } from "react-router-dom";


const usersCollectionRef = collection(db, "User");
const Users = () => {
  const [firstName, setUser] = useState([]);
  const [lastName, setFlag] = useState(false);

  const getUsers = async () => {
    const data = await getDocs(usersCollectionRef);
    // console.log(data.docs);
    setUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  useEffect(() => {
    getUsers();
  }, lastName);
  // console.log(user)

  const navigate = useNavigate();

  return (
    <>
      
      <br />
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/insertUser", { replace: false })}
      >
        Add User
      </Button>
      <br />
      <br />
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Age</TableCell>
              <TableCell align="right">Has a dog</TableCell>
              <TableCell align="right">Options</TableCell>
              <TableCell></TableCell> 
            </TableRow>
          </TableHead>
          <TableBody>
            {firstName.map((item) => {
              return (
                <TableRow key={item.id}>
                  <TableCell align="right">{item.firstName}</TableCell>
                  <TableCell align="right">{item.lastName}</TableCell>
                  <TableCell align="right">
                    {item.hasDog ? "Yes" : "No"}
                  </TableCell>
                  
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
export default Users;
