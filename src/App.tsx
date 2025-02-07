import { useState } from "react";
import StartPage from "./components/StartPage";
import NamePage from "./components/NamePage";
import ConnectPage from "./components/ConnectPage";
import PlayPage from "./components/PlayPage";
import ErrorPage from "./components/ErrorPage";
import { randomDigits } from "./utils/randomDigits";
import "./App.css";

function App() {
    const name: string | null = window.localStorage.getItem("name");
    const initialPage = name ? "start" : "name";

    const [id, setId] = useState<string | null>(null);
    const [page, setPage] = useState<string>(initialPage);
    
    if (id === null) {
        const storedId = window.localStorage.getItem("id");
        const randomId = storedId ?? randomDigits(8);
        setId(randomId);
        if (storedId === null) {
            window.localStorage.setItem("id", randomId);
        }
    }

    switch (page) {
        case "start":
            return <StartPage goToPage={setPage} />;
        case "name":
            return <NamePage goToPage={setPage} currentName={name ?? ""} />;
        case "connect":
            return <ConnectPage goToPage={setPage} />;
        case "play":
            return <PlayPage goToPage={setPage} />;
    }

    return <ErrorPage goToPage={setPage} />
}

export default App;
