import { useEffect, useState } from "react";

import { ConectionsContainer } from "./Conections.style";
import { useAuth } from "../../firebase";

function ConectionsPending() {
  const email = localStorage.getItem("uid");
  const {  getAllConnections, updateConnections } = useAuth();
  const [connection, setConnection] = useState([])
  const strObj = JSON.parse(localStorage.getItem("userInfo"))
  const isGuard = strObj.type
  
  const getAllConnectionsStatus = () => {
    getAllConnections(email).then(res =>{
      res.get().then(doc =>{
        let docs = []
        doc.forEach( value =>{
          docs = [...docs, { id: value.id, ...value.data() }];
        })
        setConnection( [...docs]);
      })
      
    })
  }

  useEffect( () => {
    getAllConnectionsStatus()
  }, []);


  return (
    <ConectionsContainer>
    { isGuard == 'guard' ? <>
      {
        connection.map(dado => (
          <>
          <div>

          <p>{dado.nome}</p>
          <p>{dado.email_guard}</p>
          <p>{dado.status_connection}</p>
          { dado.status_connection == '0' ? <button onClick={()=> {
            console.log("logica do update aqui ")
            updateConnections(email,dado.email_guard,'1')
          }}>connectar</button>: <h2>conexao aceita</h2>}
          </div>
        
          </>
        ))
      }

   </>: <>Pagina não disponivel para lojistas  </> } 
    </ConectionsContainer>

    
  ) 
}

export default ConectionsPending;