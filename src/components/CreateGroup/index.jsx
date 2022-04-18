import React, { useState } from "react";
import { InputType, TextType,Button, CenterDiv  } from "./styles";


export function CreateNewGroup(){
    const [input,setInput] = useState({
        group:"",
        address:"",
        email:""
    })
    const [grupo,setGrupo] = useState([])
    const handleChange = (e) =>{
        const { name, value } = e.target;
        setInput(prevState => ({
            ...prevState,
            [name]: value}))
            
    }
    const handleGroup = (e) => {
        e.preventDefault()
        setGrupo(old=>[...old,input])
        setInput({
            group:"",
            address:"",
            email:""
        })
    console.log(grupo)
    }
   
    return(
        <>
           <CenterDiv>
      
         <TextType>Nome do grupo </TextType>
        <InputType   
        type="text"
          value={input.group}
          onChange={handleChange}
          name="group"
          />
        
        <TextType>Endereco </TextType>
        <InputType   
        type="text"
          value={input.address}
          onChange={handleChange}
          name="address"
           />
        <TextType>Email </TextType>
        <InputType   type="text"
          value={input.email}
          onChange={handleChange}
          name="email"
           />
           <Button  onClick={handleGroup} >Enviar</Button>
        
       </CenterDiv>
        </>
    )
}