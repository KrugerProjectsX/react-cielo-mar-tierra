import {useParams} from "react-router-dom";
import Header from "../components/Header";
import FlatForm from "../components/FlatForm";

export default function Flat() {
    let { id }  = useParams();
    console.log(id)
    return (
        <div>
            <Header/>
            <h1>View Flat</h1>
            <FlatForm type={'view'} id={id}/>
        </div>
    );
}