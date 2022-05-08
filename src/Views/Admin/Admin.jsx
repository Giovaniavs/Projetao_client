import { useContext, useEffect, useState } from "react";
import { Redirect } from 'react-router-dom';
import { ItemList, ListEmpty, ListNotEmpty, ListSecurityContainer } from "./Admin.style";

import { AiOutlineStar, AiOutlineRight } from "react-icons/ai";

import { ListRequestRegisterSecurtyContext } from "../../contexts/ListRequestRegisterGuards";

const ListRequestRegisterSecurity = () => {
  const [email, setEmail] = useState('');
  const {listSecRequestRegister, setListSecRequestRegister} = useContext(ListRequestRegisterSecurtyContext);

  useEffect(() => {
    Promise.resolve(listSecRequestRegister).then(guardsList => setListSecRequestRegister(guardsList));
  }, [listSecRequestRegister]);

  if (email != '') {
    return (
      <Redirect push to={`/perfilVerificacao?email=${email}`} />
    );
  };

  

  return (
    <ListSecurityContainer>
      <br></br>
      <br></br>
      <br></br>
      {listSecRequestRegister.length > 0 ? 
      <>
        <ListNotEmpty>
          {listSecRequestRegister.map((element) => {
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
        
        <button className="btn-plus">BUSCAR MAIS</button>
      </>
      : 
      
      <ListEmpty>
        <div>
          <h1>Não há seguranças</h1>
          <p>Ainda não há seguranças cadastrados na plataforma!</p>
        </div>
        <button>BUSCAR NOVAMENTE</button>
      </ListEmpty>
        
      }
    </ListSecurityContainer>
  )
}

export default ListRequestRegisterSecurity;