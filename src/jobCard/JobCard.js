import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from '@mui/material/Button';
import BoltIcon from '@mui/icons-material/Bolt';
import ShowMoreText from "react-show-more-text";
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

export default function RecipeReviewCard() {
 
  return (
    <Card sx={{ maxWidth: 345 }} className= "Card">
      <CardMedia
        component="img"
        height="194"
        image={img}
        alt="Company Name"
      />
      <CardHeader
        title="Company Name"
        subheader="Job Title"
      />
      
      
      <CardContent>
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin accumsan dui et commodo feugiat. Fusce a pretium odio, at mattis metus. Duis in ante ex. Phasellus rhoncus erat at felis aliquam vehicula. Quisque sed tristique mauris, ut ultrices libero. Curabitur mattis risus arcu, sit amet mollis tortor varius eget. Pellentesque a lacus sed velit feugiat luctus. Sed luctus orci nec leo fermentum venenatis. Proin viverra elementum eleifend. Phasellus a neque faucibus, commodo odio sit amet, interdum ligula.

Proin in arcu a mi hendrerit molestie sed sed nunc. Curabitur augue urna, ultrices in auctor pharetra, feugiat non odio. Curabitur dignissim aliquet."
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