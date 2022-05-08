import { useContext, useEffect, useState } from "react";
import { Redirect } from 'react-router-dom';
import { ItemList, ListEmpty, ListNotEmpty, ListSecurityContainer } from "./ListSecurity.style";

import { AiOutlineStar, AiOutlineRight } from "react-icons/ai";

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
            <h1>Não há seguranças</h1>
            <p>Ainda não há seguranças responsáveis para esse grupo!</p>
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

        <div style={{ padding: 20, display: flexbox, flexDirection: 'column' }}>
          <p>Não encontramos o pagamento de mensalidade na sua conta, para ver a lista de seguranças clique no botão abaixo e assine o nosso plano mensal.</p>
          <button onClick={() => history.push('/shopkeeperPayment')}> Ir para pagamento </button>
        </div> : <SupportComponent />
      }

    </ListSecurityContainer>
  )
}

export default ListSecurity;