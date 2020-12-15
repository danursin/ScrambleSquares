import { Category } from "../types";
import { createContext } from "react";

export type CategoryMap = {
    [category in Category]: string;
};

interface PuzzleContextProps {
    categoryMap: CategoryMap;
    setCategoryMap: (map: CategoryMap) => void;
}

const PuzzleContext = createContext<PuzzleContextProps>({
    categoryMap: {
        category1: "",
        category2: "",
        category3: "",
        category4: ""
    },
    setCategoryMap: () => {
        throw new Error("not implemented");
    }
});

export default PuzzleContext;
