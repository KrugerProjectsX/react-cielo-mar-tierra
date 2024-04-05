import Header from "../components/Header";
import FlatsTable from "../components/FlatsTable";

export default function FlatsFavorites() {
    return (
        <div>
            <Header/>
            <FlatsTable type={'favorite-flats'}/>
        </div>
    );
}