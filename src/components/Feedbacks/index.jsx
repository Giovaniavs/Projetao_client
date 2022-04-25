import FeedbackCard from "../CardFeedback";
import { MarginSpace } from "./styles";
import React from "react";
export function FeedBacks() {
    const avaliacoes = [
        {author:"estela",
        feedback:" opposed to using Content here, content here, making it look like readable English.",
        points:"2"},
        {author:"joao",
        feedback:" opposed to using Content here, content here, making it look like readable English.",
        points:"2"},
        {author:"maria",
        feedback:" opposed to using Content here, content here, making it look like readable English.",
        points:"4"},
    ]
    return (
<>
<MarginSpace>
    <h1>Ultimas avaliacoes</h1>
</MarginSpace>
{
avaliacoes.map(dado =>{
    return (
        <MarginSpace>
<FeedbackCard   author={dado.author}
    feedback={dado.feedback}
    points={dado.points} ></FeedbackCard>
    </MarginSpace>
    )    
})
}
</>
    )
}