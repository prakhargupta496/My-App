import Card from './jobCard';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';

import './App.css';

function App() {
  const companies = ["Amazon", "Flipkart", "Apple", "Netflix", "Weekday", "Tekion", "Microsoft", "Google"];
  return (
    <div className="App">

      <Grid container columnSpacing={35} rowSpacing={5} >
        {companies.map((company) => (
          <Grid item md={4}>
            <Card name={company}/>
          </Grid>
        ))}
      </Grid>
      
    </div>
  );
}

export default App;
