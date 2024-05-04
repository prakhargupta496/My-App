import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import './JobCard.css';




export default function RecipeReviewCard() {
 
  return (
    <Card sx={{ maxWidth: 345 }} className= "Card">
      <CardMedia
        component="img"
        height="194"
        image="../images/test.jpg"
        alt="Paella dish"
      />
      <CardHeader
        title="Company Name"
        subheader="Job Title"
      />
      
      <CardContent>
        "Hello World"
      </CardContent>
      <Button variant="contained">Contained</Button>
    </Card>
  );
}