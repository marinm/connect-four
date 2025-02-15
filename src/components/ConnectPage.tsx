import { useContext } from "react";
import { SocketContext } from "../contexts/SocketContext";

export default function ConnectPage() {
    const socket = useContext(SocketContext);

    return (
        <div className="page">
            <button onClick={() => socket?.open()}>Connect</button>
        </div>
    );
}
