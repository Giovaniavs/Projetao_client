import { useEffect, useState } from "react";
import { ItemList, ListEmpty, ListNotEmpty, ListSecurityContainer } from "./ListSecurity.style";

import { AiOutlineStar, AiOutlineRight } from "react-icons/ai";
import { useListSecurity } from "../../contexts/ListSecurity";
import { useNavigate } from "react-router-dom";

export const ListSecurity = () => {
  const { listSec, setListSec } = useListSecurity();

  useEffect(() => {
    Promise.resolve(listSec).then(guardsList => setListSec(guardsList));
  }, [listSec]);
  
  const navigate = useNavigate()
  function navigateSecurity(email) {
    console.log(email)
    console.log(`/perfil?email=${email}`)
    navigate(`/perfil?email=${email}`)
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
                <ItemList key={element.email} onClick={() => navigateSecurity(element.email)}>
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