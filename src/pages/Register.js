import UserForm from "../components/UserForm";
import Header from "../components/Header";

export default function Register() {
    return (
        <div>
            <Header></Header>
            <h1>Register</h1>
            <UserForm type={'create'} id={null}/>
        </div>
    );
}