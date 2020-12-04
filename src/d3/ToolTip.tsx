import React from 'react';

interface Props {
    data: {
        id: string;
        properties: {
            name: string;
        };
        type: string;
        geometry: {
            type: string;
            coordinates: number[][];
        };
    }
}

export const ToolTip: React.FC<Props> = ({data}) => {

    return (
            <div>
                 <h2>{data}</h2>
            </div>
        )
}
