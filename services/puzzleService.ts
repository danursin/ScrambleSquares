import { ScrambleSquaresPuzzle } from "../types";

/**
 * Army -       Category1
 * Navy -       Category2
 * AirForce -   Category3
 * Coast Guard -Category4
 */

export const initialPuzzleState: ScrambleSquaresPuzzle = [
    {
        id: 1,
        rotation: 0,
        faces: [
            ["category1", "bottom"],
            ["category3", "bottom"],
            ["category2", "top"],
            ["category4", "bottom"]
        ]
    },
    {
        id: 2,
        rotation: 0,
        faces: [
            ["category2", "bottom"],
            ["category4", "top"],
            ["category1", "top"],
            ["category4", "bottom"]
        ]
    },
    {
        id: 3,
        rotation: 0,
        faces: [
            ["category2", "bottom"],
            ["category1", "top"],
            ["category3", "top"],
            ["category4", "bottom"]
        ]
    },
    {
        id: 4,
        rotation: 0,
        faces: [
            ["category2", "bottom"],
            ["category3", "bottom"],
            ["category4", "bottom"],
            ["category1", "top"]
        ]
    },
    {
        id: 5,
        rotation: 0,
        faces: [
            ["category4", "bottom"],
            ["category1", "bottom"],
            ["category2", "top"],
            ["category3", "top"]
        ]
    },
    {
        id: 6,
        rotation: 0,
        faces: [
            ["category3", "bottom"],
            ["category4", "bottom"],
            ["category2", "bottom"],
            ["category1", "top"]
        ]
    },
    {
        id: 7,
        rotation: 0,
        faces: [
            ["category4", "top"],
            ["category3", "top"],
            ["category1", "top"],
            ["category2", "bottom"]
        ]
    },
    {
        id: 8,
        rotation: 0,
        faces: [
            ["category2", "bottom"],
            ["category3", "bottom"],
            ["category4", "bottom"],
            ["category2", "bottom"]
        ]
    },
    {
        id: 9,
        rotation: 0,
        faces: [
            ["category4", "bottom"],
            ["category1", "top"],
            ["category3", "bottom"],
            ["category4", "bottom"]
        ]
    }
];
