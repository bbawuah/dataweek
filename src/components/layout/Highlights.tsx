import React from "react";

interface Props {
    text: string
}

export const Highlight: React.FC<Props> = ({text, children}) => {
    return (
        <div className="highlight">
            {children}
            <p>{text}</p>
        </div>
        )
};

