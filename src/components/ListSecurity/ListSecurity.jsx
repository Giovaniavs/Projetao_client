import { useContext, useEffect, useState } from "react";
import { Redirect } from 'react-router-dom';
import { ItemList, ListEmpty, ListNotEmpty, ListSecurityContainer } from "./ListSecurity.style";

import { AiOutlineStar, AiOutlineRight } from "react-icons/ai";

import { ListSecurtyContext } from "../../contexts/ListSecurity";
import { Button } from "@mui/material";

const ListSecurity = () => {
  const [email, setEmail] = useState('');
  const {listSec, setListSec} = useContext(ListSecurtyContext);

  useEffect(() => {
    Promise.resolve(listSec).then(guardsList => setListSec(guardsList));
  }, [listSec]);

  if (email != '') {
    return (
      <Redirect push to={`/perfil?email=${email}`} />
    );
  };


  return (
    <ListSecurityContainer>
      <br></br>
      <br></br>
      <br></br>
      {listSec.length > 0 ? 
      <>
        <ListNotEmpty>
          {listSec.map((element) => {
            return (
              <ItemList onClick={() => setEmail(element.email)}>
              <img src={element.imgSrc} alt="" />
              <div className="begin">
                <h6>{element.name}</h6>
                <div className="score">
                  <p>{element.starsCount}</p>
                  <AiOutlineStar size={18}/>
                </div>
              </div>
              <div className="end">
                <AiOutlineRight />
              </div>
            </ItemList>
              )
          })}
        </ListNotEmpty> 
        
        <Button variant="contained" className="btn-plus">CONTRATAR MAIS</Button>
      </>
      : 
      
      <ListEmpty>
        <div>
          <h1>Não há seguranças</h1>
          <p>Ainda não há seguranças responsáveis para esse grupo!</p>
        </div>
        <Button variant="contained">CONTRATAR AGORA</Button>
      </ListEmpty>
        
      }
    </ListSecurityContainer>
  )
}

export default ListSecurity;