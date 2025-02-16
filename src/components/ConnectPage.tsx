import { useContext } from "react";
import { RoomContext } from "../contexts/RoomContext";

export default function ConnectPage() {
    const room = useContext(RoomContext);

    return (
        <div className="page">
            <button onClick={() => room?.join()}>Connect</button>
        </div>
    );
}
