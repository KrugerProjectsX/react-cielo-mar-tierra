import UserForm from "../components/UserForm";
import Header from "../components/Header";
import {useParams} from "react-router-dom";

export default function ProfileUpdate() {
    let { userId }  = useParams();
    if (userId === undefined) {
        userId = null;
    
    }
    //TODO: verificar si el que actualiza un usuario que no es el mismo sea admin si no mandar null

    return (
        <div>
            <Header/>
            <h1>Profile Update</h1>
            <UserForm type={'update'} userId={userId}/>
        </div>
    );
}