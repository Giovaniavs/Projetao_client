import { useContext } from "react";
import { ItemList, ListEmpty, ListNotEmpty, ListSecurityFreeContainer } from "./ListSecurityFree.style";

import { AiOutlineStar, AiOutlineRight } from "react-icons/ai";

import { ListSecurtyContext } from "../../contexts/ListSecurity";

const ListSecurityFree = () => {

  const {listSecFree} = useContext(ListSecurtyContext)

  return (
    <ListSecurityFreeContainer>
      <h1>Seguranças Disponíveis</h1>
      {listSecFree.length > 0 ? 
      <>
        <ListNotEmpty>
          {listSecFree.map((element) => {
            return (

              <ItemList>
              <img src={element[2]} alt="" />
              <div className="begin">
                <h6>{element[0]}</h6>
                <div className="score">
                  <p>{element[1]}</p>
                  <AiOutlineStar />
                </div>
              </div>
              <div className="end">
                <AiOutlineRight size={20}/>
              </div>
            </ItemList>
              )
          })}
        </ListNotEmpty> 
        
        {/* <button className="btn-plus">CONTRATAR MAIS></button> */}
      </>
      : 
      
      <ListEmpty>
        <div>
          <h1>Não há seguranças</h1>
          <p>Ainda não há seguranças disponíveis!</p>
        </div>
        {/* <button>CONTRATAR AGORA ></button> */}
      </ListEmpty>
        
      }
    </ListSecurityFreeContainer>
  )
}

export default ListSecurityFree;