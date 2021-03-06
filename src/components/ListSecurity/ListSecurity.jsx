import { useContext, useEffect, useState } from "react";
import { Redirect } from 'react-router-dom';
import { ItemList, ListEmpty, ListNotEmpty, ListSecurityContainer } from "./ListSecurity.style";

import { AiOutlineStar, AiOutlineRight } from "react-icons/ai";

import Button from '@mui/material/Button';
import { ListSecurtyContext } from "../../contexts/ListSecurity";
import { flexbox } from "@mui/system";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useAuth } from "../../firebase";

const SupportComponent = () => {
  const [email, setEmail] = useState('');
  const { listSec, setListSec } = useContext(ListSecurtyContext);

  useEffect(() => {
    Promise.resolve(listSec).then(guardsList => setListSec(guardsList));
  }, [listSec]);

  if (email != '') {
    return (
      <Redirect push to={`/perfil?email=${email}`} />
    );
  };
  return (
    <>
      <br></br>
      <br></br>
      <br></br>
      {listSec.length > 0 ?
        <>
          <ListNotEmpty>
            {listSec.map((element, index) => {
              return (
                <ItemList key={index} onClick={() => setEmail(element.email)}>
                  <img src={element.imgSrc} alt="" />
                  {element.profileBoostPlan === 'goldPlan' &&
                    <>
                      <div className="begin-gold">
                        <h6>{element.name}</h6>
                        <div className="score">
                          <p>{element.starsCount}</p>
                          <AiOutlineStar size={18} />
                        </div>
                      </div>
                      <div className="end-gold">
                        <AiOutlineRight />
                      </div>
                    </>
                  }

                  {element.profileBoostPlan === 'silverPlan' &&
                    <>
                      <div className="begin-silver">
                        <h6>{element.name}</h6>
                        <div className="score">
                          <p>{element.starsCount}</p>
                          <AiOutlineStar size={18} />
                        </div>
                      </div>
                      <div className="end-silver">
                        <AiOutlineRight />
                      </div>
                    </>
                  }

                  {element.profileBoostPlan === 'bronzePlan' &&
                    <>
                      <div className="begin-bronze">
                        <h6>{element.name}</h6>
                        <div className="score">
                          <p>{element.starsCount}</p>
                          <AiOutlineStar size={18} />
                        </div>
                      </div>
                      <div className="end-bronze">
                        <AiOutlineRight />
                      </div>
                    </>
                  }

                  {element.profileBoostPlan === 'none' &&
                    <>
                      <div className="begin-none">
                        <h6>{element.name}</h6>
                        <div className="score">
                          <p>{element.starsCount}</p>
                          <AiOutlineStar size={18} />
                        </div>
                      </div>
                      <div className="end-none">
                        <AiOutlineRight />
                      </div>
                    </>
                  }
                </ItemList>
              )
            })}
          </ListNotEmpty>

          <button className="btn-plus">CONTRATAR MAIS</button>
        </>
        :

        <ListEmpty>
          <div>
            <h1>N??o h?? seguran??as</h1>
            <p>Ainda n??o h?? seguran??as respons??veis para esse grupo!</p>
          </div>
          <button>CONTRATAR AGORA</button>
        </ListEmpty>

      }

    </>
  )
}


const ListSecurity = () => {
  const {setUser} = useAuth();
  const user = JSON.parse(localStorage.getItem("userInfo"))

  useEffect(() => {
    setUser(user.email);
  }, []);

  const history = useHistory()

  return (
    <ListSecurityContainer>
      {(user.type === "shopman" && (user.payment_ok == undefined || user.payment_ok == false)) ?

        <>
          <div style={{ padding: 20, display: 'flex', flexDirection: 'column' }}>
            <p>A visualiza????o da listagem de seguran??as s?? ficar?? dispon??vel ap??s o pagamento da Taxa de Acesso</p>
            <Button variant="contained" onClick={() => history.push('/shopkeeperPayment')}>Ir para pagamento</Button>
        </div>
        </> : <SupportComponent />
      }

    </ListSecurityContainer>
  )
}

export default ListSecurity;