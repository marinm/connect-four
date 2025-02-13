import { useEffect, useState } from "react";

type Options = {
    p: number;
};

export function useX(options: Options): number {
    const [x, setX] = useState<number>(0);

    useEffect(() => {
        setX(options.p);
    }, [options]);

    return x + options.p;
}
