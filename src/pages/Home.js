import Header from "../components/Header";
import checkUserLogged from "../services/actions";
import FlatsTable from "../components/FlatsTable";

export default function Home() {
    checkUserLogged();
    return (
        <div>
            <Header/>
            <FlatsTable type={'all-flats'}/>
        </div>
    );
}