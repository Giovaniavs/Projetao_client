import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Rate } from 'antd';
import React from "react";
import Typography from '@mui/material/Typography';
import { WrapperText } from './styles'

export default function FeedbackCard(props) {
    const {author,feedback,points} = props;
    console.log(props )
    return (
        <>
       
<Box sx={{ minWidth: 275 }}>
        <Card variant="outlined" sx={{ minWidth: 500 }}>
        <CardContent> 
            <div>

        <Typography sx={{ fontSize: 15 }}  >
          {feedback}
        </Typography>
            </div>
            <WrapperText>

        <Typography sx={{fontWeight: 'bold', fontSize: 13 }}  >
        {author}
      </Typography>
      <Rate disabled defaultValue={points}></Rate>
            </WrapperText>
             </CardContent>

        </Card>
        </Box>
      
         </>
    )

}