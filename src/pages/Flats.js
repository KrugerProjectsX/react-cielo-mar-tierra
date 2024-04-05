import Header from "../components/Header";
import FlatsTable from "../components/FlatsTable";

export default function Flats() {
    return (
        <div>
            <Header/>
            <FlatsTable type={'all-flats'} />
        </div>
    );
}