import { useState } from "react";

export function Pages() {
    const [page] = useState<string>("start");

    switch (page) {
        case "start":
            return "Starting...";
    }

    return "Error";
}
