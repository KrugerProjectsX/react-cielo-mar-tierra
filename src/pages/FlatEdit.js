import FlatForm from "../components/FlatForm";
import Header from "../components/Header";
import {useParams} from "react-router-dom";

export default function FlatEdit() {
    let { flatId }  = useParams();
    if (flatId === undefined) {
        flatId = null;
    
    }
    return (
        <div>
            <Header/>
            <h1>FlatEdit</h1>
            <FlatForm type={'update'} flatId={flatId} />
        </div>
    );
}