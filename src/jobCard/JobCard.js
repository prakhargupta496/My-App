import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from '@mui/material/Button';
import BoltIcon from '@mui/icons-material/Bolt';
import img from '../images/test.jpg';
import './JobCard.css';


const theme = createTheme({
  palette: {
    neutral: {
      main: "#94FFD8",
      contrastText: "#black"
    },
    danger: {
      main: "#10439F",
      contrastText: "#fff"
    },
    icon: {
      main: "#F3CA52"
    }
  }
});

export default function RecipeReviewCard(props) {
 
  return (
    <Card sx={{ maxWidth: 345 }} className= "Card">
      <CardMedia
        component="img"
        height="194"
        image={img}
        alt={props.name}
      />
      <CardHeader
        title={props.name}
        subheader={props.title}
      />
      
      
      <CardContent>
        {props.jobDescription}
      </CardContent>
      <ThemeProvider theme={theme}>
      <div className="Buttons">
        <div className="Easy_Apply_Div">
          <Button variant="contained" fullWidth = {true} color="neutral" disableElevation={true} startIcon={<BoltIcon color="icon"/>}>Easy Apply</Button>
        </div>
        <div>
          <Button variant="contained" fullWidth = {true} color="danger" disableElevation={true}>Ask for referral</Button>
        </div>
      </div>
      </ThemeProvider>
      
      
    </Card>
  );
}