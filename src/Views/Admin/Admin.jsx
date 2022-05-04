import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ItemList, ListEmpty, ListNotEmpty, ListSecurityContainer } from "./Admin.style";

import { AiOutlineStar, AiOutlineRight } from "react-icons/ai";

import { useListRequestRegisterSecurity } from "../../contexts/ListRequestRegisterGuards";

const ListRequestRegisterSecurity = () => {
  const [email, setEmail] = useState('');
  const { listSecRequestRegister, setListSecRequestRegister } = useListRequestRegisterSecurity()

  useEffect(() => {
    Promise.resolve(listSecRequestRegister).then(guardsList => setListSecRequestRegister(guardsList));
  }, [listSecRequestRegister]);

  if (email != '') {
    const navigate = useNavigate()
    return navigate(`/perfilVerificacao?email=${email}`);
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
                      <AiOutlineStar size={18} />
                    </div>
                  </div>
                  <div className="end">
                    <AiOutlineRight />
                  </div>
                </ItemList>
              )
            })}
          </ListNotEmpty>

          <button className="btn-plus">CONTRATAR MAIS</button>
        </>
        :

        <ListEmpty>
          <div>
            <h1>Não há seguranças</h1>
            <p>Ainda não há seguranças responsáveis para esse grupo!</p>
          </div>
          <button>CONTRATAR AGORA</button>
        </ListEmpty>

      }
    </ListSecurityContainer>
  )
}

export default ListRequestRegisterSecurity;