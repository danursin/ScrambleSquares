import { Card, ScrambleSquaresPuzzle } from "../types";
import PuzzleContext, { CategoryMap } from "../components/PuzzleContext";

import { Grid } from "semantic-ui-react";
import Layout from "../components/Layout";
import PuzzleCard from "../components/PuzzleCard";
import { initialPuzzleState } from "../services/puzzleService";
import { useState } from "react";

const Home: React.FC = () => {
    const [puzzle, setPuzzle] = useState<ScrambleSquaresPuzzle>(initialPuzzleState);
    const [categoryMap, setCategoryMap] = useState<CategoryMap>({
        category1: "Army",
        category2: "Navy",
        category3: "Air Force",
        category4: "Coast Guard"
    });

    const handleCardRotate = (card: Card, angle: number): void => {
        card.rotation += angle;
        setPuzzle([...puzzle]);
    };

    return (
        <Layout>
            <PuzzleContext.Provider value={{ categoryMap, setCategoryMap }}>
                <Grid columns="3" celled divided>
                    {puzzle.map((card) => (
                        <Grid.Column key={card.id}>
                            <PuzzleCard card={card} onRotate={(angle: number) => handleCardRotate(card, angle)} />
                        </Grid.Column>
                    ))}
                </Grid>
            </PuzzleContext.Provider>
        </Layout>
    );
};
export default Home;
