import { useEffect, useState } from "react";

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { CardContent } from "@mui/material";
import { ConectionsContainer } from "./Conections.style";
import Typography from '@mui/material/Typography';
import { useAuth } from "../../firebase";

function ConectionsPending() {
  const email = localStorage.getItem("uid");
  const {  getAllConnections, updateConnections } = useAuth();
  const [connection, setConnection] = useState([])
  const strObj = JSON.parse(localStorage.getItem("userInfo"))
  const isGuard = strObj.type 
  console.log('toa qui')
  
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
      {
        connection.map(dado => (
          <Card sx={{ maxWidth: 300, minWidth: 300, maxHeight: 100 , minHeight: 100  }}>
          <CardContent>
        

          <Typography variant="h5" component="div">
{dado.nome}</Typography>
  <Typography variant="body2">{dado.email_guard || dado.email_shopman}</Typography>
          { dado.status_connection == '0' && isGuard== 'guard' ?
           <Button size="small" onClick={()=> {
            console.log("logica do update aqui ")
            updateConnections(email,dado.email_guard,'1')
          }}>Conectar</Button> :
           dado.status_connection == '0' && isGuard != 'guard' ?
           <>
          <Button disabled size="small"> Aguardando aprovação </Button> </>
          
          : <Button disabled size="small"> Conexão estabelecida </Button>}
        
        
          </CardContent>
          </Card>
        ))} 
      

    </ConectionsContainer>

    
  ) 
}

export default ConectionsPending;