import { useHistory } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

import shopPlanImage from './shop.jpg'
export const ShopkeeperPayment = () => {
    const history = useHistory()

    return(
        <div>
            <Card sx={{ margin: '35px 0 35px 0' }}>
          <CardActionArea>
          <CardMedia
              component="img"
              height="140"
              image={shopPlanImage}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Plano Lojista - R$15,00
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Com a <b>assinatura de 30 dias</b> do Plano Lojista você conseguirá pesquisar seguranças na sua região.
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary" onClick={() => {
                history.push("/paymentScreen?selectedPlan=shopkeeper");
              }}>
              Adquirir
            </Button>
          </CardActions>
        </Card>

        </div>
    )
}