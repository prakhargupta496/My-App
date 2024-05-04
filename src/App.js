import Card from './jobCard';
import Grid from '@mui/material/Grid';

import './App.css';

function App() {
  const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin accumsan dui et commodo feugiat. Fusce a pretium odio, at mattis metus. Duis in ante ex. Phasellus rhoncus erat at felis aliquam vehicula. Quisque sed tristique mauris, ut ultrices libero. Curabitur mattis risus arcu, sit amet mollis tortor varius eget. Pellentesque a lacus sed velit feugiat luctus. Sed luctus orci nec leo fermentum venenatis. Proin viverra elementum eleifend. Phasellus a neque faucibus, commodo odio sit amet, interdum ligula.Proin in arcu a mi hendrerit molestie sed sed nunc. Curabitur augue urna, ultrices in auctor pharetra, feugiat non odio. Curabitur dignissim aliquet.";
  const companies = [{name:"Amazon",title:"Software Engineer",expReq:2, location:"Bangalore", jobDescription:lorem, minSal: 15}, {name:"Flipkart",title:"Software Engineer",expReq:2, location:"Bangalore", jobDescription:lorem }, 
  {name:"Apple",title:"Software Engineer",expReq:2, location:"Bangalore", jobDescription:lorem }, {name:"Netflix",title:"Software Engineer",expReq:2, location:"Bangalore", jobDescription:lorem }
  , {name:"Weekday",title:"Software Engineer",expReq:2, location:"Bangalore", jobDescription:lorem }, {name:"Tekion",title:"Software Engineer",expReq:2, location:"Bangalore", jobDescription:lorem }, 
  {name:"Microsoft",title:"Software Engineer",expReq:2, location:"Bangalore", jobDescription:lorem }, {name:"Google",title:"Software Engineer",expReq:2, location:"Bangalore", jobDescription:lorem }];
  return (
    <div className="App">

      <Grid container columnSpacing={35} rowSpacing={5} >
        {companies.map((company) => (
          <Grid item md={4}>
            <Card name={company.name} title={company.title} jobDescription={company.jobDescription} expReq={company.expReq} minSal={company.minSal} location={company.location}/>
          </Grid>
        ))}
      </Grid>
      
    </div>
  );
}

export default App;
