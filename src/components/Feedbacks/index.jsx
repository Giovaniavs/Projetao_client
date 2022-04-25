import React, { useEffect, useState } from "react";

import FeedbackCard from "../CardFeedback";
import { MarginSpace } from "./styles";
import { useAuth } from "../../firebase";
import userQueryParams from "../../Views/Perfil/userQueryParams";

export function FeedBacks() {
   const [avaliacoes,setAvaliacoes] = useState([])
  let query = userQueryParams();

  const email = query.get("email");

  const { getUserFeedback} = useAuth();
  
  const getFeedback = () => {
    getUserFeedback(email).then((response) => {
      response.get().then((querySnapshot) => {
        let docs = [];
        querySnapshot.forEach((doc) => {
          docs = [...docs, { id: doc.id, ...doc.data() }];
        });

        setAvaliacoes(av=>[...docs])

      });
    });
  };
  useState( ()=>{

      getFeedback()
  },[])
  console.log(avaliacoes)
 
    return (
<>

{
  avaliacoes.length==0?(
    <>
    <h2>Ainda nao foram feitas avaliacoes para esse seguranca</h2>
    </>
  ):
    
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