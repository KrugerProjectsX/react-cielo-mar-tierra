import FlatForm from "../components/FlatForm";
import FlatsTable from "../components/FlatsTable";
export default function RegisterFlat() {
    return (
        <div>
            <FlatForm type={'create'} id={null}/>
            <FlatsTable type={'my-flats'}/> 
        </div>
    );
}