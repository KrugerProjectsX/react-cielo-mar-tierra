import UserForm from "../components/UserForm";
import Header from "../components/Header";
import {useParams} from "react-router-dom";

export default function Profile() {
    let { userId }  = useParams();
    return (
        <div>
            <Header/>
            <h1>Profile</h1>
            <UserForm type={'view'} id={userId}/>
        </div>
    );
}