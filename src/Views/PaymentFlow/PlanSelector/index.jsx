import "react";
import "./style.css";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

import goldPlanImage from './gold-plan.jpg'
import silverPlanImage from './silver-plan.jpg'
import bronzePlanImage from './bronze-plan.jpg'

export const PlanSelector = () => {
    return (
      <div className="plan-selector-main-div">
        <Card sx={{ maxWidth: 345, margin: '35px 0 35px 0' }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={goldPlanImage}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Plano Ouro - R$25,00
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Com a <b>assinatura de 30 dias</b> do Plano Ouro o seu perfil ficará no <b>topo</b> das
                pesquisas dos lojistas da plataforma!
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              Adquirir
            </Button>
          </CardActions>
        </Card>

        <Card sx={{ maxWidth: 345, margin: '0 0 35px 0' }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={silverPlanImage}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Plano Prata - R$15,00
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Com a <b>assinatura de 30 dias</b> do Plano Prata o seu perfil ficará em destaque
                nas pesquisas dos lojistas da plataforma, abaixo apenas do <b>Plano Ouro!</b>
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              Adquirir
            </Button>
          </CardActions>
        </Card>

        <Card sx={{ maxWidth: 345, margin: '0 0 35px 0' }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={bronzePlanImage}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Plano Bronze - R$5,00
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Com a <b>assinatura de 30 dias</b> do Plano Bronze o seu perfil ficará em destaque
                nas pesquisas dos lojistas da plataforma, abaixo apenas do <b>Plano Ouro</b> e <b>Plano Prata!</b>
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              Adquirir
            </Button>
          </CardActions>
        </Card>
      </div>
    );
}