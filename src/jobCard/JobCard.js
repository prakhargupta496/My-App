import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from '@mui/material/Button';
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
    }
  }
});

export default function RecipeReviewCard() {
 
  return (
    <Card sx={{ maxWidth: 345 }} className= "Card">
      <CardMedia
        component="img"
        height="194"
        image="../images/test.jpg"
        alt="Company Name"
      />
      <CardHeader
        title="Company Name"
        subheader="Job Title"
      />
      
      <CardContent>
        "Hello World"
      </CardContent>
      <ThemeProvider theme={theme}>
      <div className="Buttons">
        <div className="Easy_Apply_Div">
          <Button variant="contained" fullWidth = {true} color="neutral">Easy Apply</Button>
        </div>
        <div>
          <Button variant="contained" fullWidth = {true} color="danger">Ask for referral</Button>
        </div>
      </div>
      </ThemeProvider>
      
      
    </Card>
  );
}