import { Button, Grid } from "semantic-ui-react";
import { Card, CardFace } from "../types";
import React, { CSSProperties, useContext } from "react";

import PuzzleContext from "./PuzzleContext";

interface PuzzleCardProps {
    card: Card;
    onRotate: (angle: number) => void;
}

const PuzzleCard: React.FC<PuzzleCardProps> = ({ card, onRotate }) => {
    const { id, faces, rotation } = card;
    const [top, right, bottom, left] = faces;

    const { categoryMap } = useContext(PuzzleContext);
    const formatLabel = ([category, direction]: CardFace): JSX.Element => {
        return (
            <>
                {categoryMap[category]}
                <br />
                {direction}
            </>
        );
    };
    const formatStyle = (rotation: number): CSSProperties => {
        return {
            transition: "transform .8s ease-in-out",
            transform: `rotate(${rotation}deg)`
        };
    };
    return (
        <Grid columns="equal" textAlign="center" verticalAlign="middle" style={formatStyle(rotation)}>
            <Grid.Row>
                <Grid.Column />
                <Grid.Column style={formatStyle(-rotation)}>{formatLabel(top)}</Grid.Column>
                <Grid.Column />
            </Grid.Row>
            <Grid.Row>
                <Grid.Column style={formatStyle(-rotation)}>{formatLabel(left)}</Grid.Column>
                <Grid.Column style={formatStyle(-rotation)}>
                    <Button content={id} icon="redo" onClick={() => onRotate(90)} size="tiny" />
                </Grid.Column>
                <Grid.Column style={formatStyle(-rotation)}>{formatLabel(right)}</Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column />
                <Grid.Column style={formatStyle(-rotation)}>{formatLabel(bottom)}</Grid.Column>
                <Grid.Column />
            </Grid.Row>
        </Grid>
    );
};

export default PuzzleCard;
