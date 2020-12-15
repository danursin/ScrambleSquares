export type Direction = "top" | "bottom";

export type Category = "category1" | "category2" | "category3" | "category4";

export type CardFace = [Category, Direction];

export type Card = {
    id: number;
    rotation: number;
    faces: [CardFace, CardFace, CardFace, CardFace];
};

export type ScrambleSquaresPuzzle = [Card, Card, Card, Card, Card, Card, Card, Card, Card];
