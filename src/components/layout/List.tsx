import React from "react";
import { buurten } from "../../format/buurten";

interface Props {
    buurten: string[]
}
export const List: React.FC<Props> = ({buurten}) => (
    <ul>
        {buurten.map((buurt, index) => <li key={index}>{buurt}</li>)}
    </ul>
);

