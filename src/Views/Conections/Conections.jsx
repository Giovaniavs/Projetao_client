import { useEffect, useState } from "react";

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { CardContent } from "@mui/material";
import { ConectionsContainer } from "./Conections.style";
import Typography from '@mui/material/Typography';
import { useAuth } from "../../firebase";
import { useHistory } from "react-router-dom";

function ConectionsPending() {
  const email = localStorage.getItem("uid");
  const {  getAllConnections, updateConnections } = useAuth();
  const [connection, setConnection] = useState([])
  const strObj = JSON.parse(localStorage.getItem("userInfo"))
  const isGuard = strObj.type 
  let history = useHistory();

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
          { dado.status_connection == '0' && isGuard== 'guard' ?
        <>
        <Typography variant="h5" component="div">{dado.nome_shopman}</Typography>
        <Typography variant="body2">{ dado.email_shopman}</Typography>
           <Button 
           variant="contained" 
           color="success" 
           size="small" 
           onClick={()=> {
            console.log(dado.email_shopman,dado.email_guard,'1')

            updateConnections(dado.email_shopman,dado.email_guard,'1')
            history.push('/conectionsPending')
          }}>aceitar</Button>
          <Button 
          variant="contained" 
          color="error" 
          size="small" 
          onClick={()=> {
            console.log(dado.email_shopman,dado.email_guard,'-1')

            updateConnections(dado.email_shopman,dado.email_guard,'-1')
            history.push('/conectionsPending')
          }}>cancelar</Button>
           </> :
           dado.status_connection == '0' && isGuard != 'guard' ?
           <>
           <Typography variant="h5" component="div">{dado.nome_guard}</Typography>
          <Typography variant="body2">{ dado.email_guard}</Typography>
          <Button disabled size="small"> Aguardando aprovação </Button> </>
          
          :  dado.status_connection != '0' && isGuard != 'guard' ?
          <>
          <Typography variant="h5" component="div">{dado.nome_guard}</Typography>
          <Typography variant="body2">{ dado.email_guard}</Typography>
          <Button disabled size="small"> Conexão estabelecida </Button> </>:<>
          <Typography variant="h5" component="div">{dado.nome_shopman}</Typography>
          <Typography variant="body2">{ dado.email_shopman}</Typography>
          <Button disabled size="small"> Conexão estabelecida </Button>
          </>
          }
          
        
          </CardContent>
          </Card>
        ))} 
      

    </ConectionsContainer>

    
  ) 
}

export default ConectionsPending;