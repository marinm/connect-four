import { useState } from "react";
import StartPage from "./components/StartPage";
import NamePage from "./components/NamePage";
import ConnectPage from "./components/ConnectPage";
import PlayPage from "./components/PlayPage";
import ErrorPage from "./components/ErrorPage";
import "./App.css";

function App() {
    const name: string | null = window.localStorage.getItem("name");

    const initialPage = name ? "start" : "name";
    
    const [page, setPage] = useState<string>(initialPage);

    function goToPage(pageName: string) {
        setPage(pageName);
    }

    switch (page) {
        case "start":
            return <StartPage goToPage={goToPage} />;
        case "name":
            return <NamePage goToPage={goToPage} />;
        case "connect":
            return <ConnectPage goToPage={goToPage} />;
        case "play":
            return <PlayPage goToPage={goToPage} />;
    }

    return <ErrorPage goToPage={goToPage} />
}

export default App;
