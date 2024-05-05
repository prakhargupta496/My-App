import React, { useState, useMemo} from 'react'
import { AutoSizer, Grid } from "react-virtualized";
import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Components
import JobCard from "./jobCard";
import { Fragment} from "react";



const theme = createTheme({
  palette: {
    neutral: {
      main: "#94FFD8",
      contrastText: "#black",
    },
    danger: {
      main: "#10439F",
      contrastText: "#fff",
    },
    icon: {
      main: "#F3CA52",
    },
  },
});

const calculateColumnWidth = (numberOfColumns, containerWidth) =>
  containerWidth / numberOfColumns;

const lorem =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin accumsan dui et commodo feugiat. Fusce a pretium odio, at mattis metus. Duis in ante ex. Phasellus rhoncus erat at felis aliquam vehicula. Quisque sed tristique mauris, ut ultrices libero. Curabitur mattis risus arcu, sit amet mollis tortor varius eget. Pellentesque a lacus sed velit feugiat luctus. Sed luctus orci nec leo fermentum venenatis. Proin viverra elementum eleifend. Phasellus a neque faucibus, commodo odio sit amet, interdum ligula.Proin in arcu a mi hendrerit molestie sed sed nunc. Curabitur augue urna, ultrices in auctor pharetra, feugiat non odio. Curabitur dignissim aliquet.";

const companies = [
  [
    {
      name: "Amazon",
      title: "Software Engineer",
      expReq: 2,
      location: "Bangalore",
      jobDescription: lorem,
      minSal: 15,
      type: "remote",
    },
    {
      name: "Flipkart",
      title: "Manager",
      expReq: 3,
      location: "Bangalore",
      jobDescription: lorem,
      type: "on-site",
    },
    {
      name: "Apple",
      title: "Product manager",
      expReq: 1,
      location: "Bangalore",
      jobDescription: lorem,
      type: "remote",
    },
  ],
  [
    {
      name: "Netflix",
      title: "Software Engineer",
      expReq: 0,
      location: "Delhi",
      jobDescription: lorem,
      type: "on-site",
    },
    {
      name: "Weekday",
      title: "Software Engineer",
      expReq: 2,
      location: "Bangalore",
      jobDescription: lorem,
      type: "remote",
    },
    {
      name: "Tekion",
      title: "Software Engineer",
      expReq: 3,
      location: "Bangalore",
      jobDescription: lorem,
      type: "on-site",
    },
  ],
  [
    {
      name: "Microsoft",
      title: "Software Engineer",
      expReq: 5,
      location: "Bangalore",
      jobDescription: lorem,
      type: "remote",
    },
    {
      name: "Google",
      title: "Software Engineer",
      expReq: 1,
      location: "Bangalore",
      jobDescription: lorem,
      type: "on-site",
    },
    {
      name: "Amazon",
      title: "Software Engineer",
      expReq: 2,
      location: "Delhi",
      jobDescription: lorem,
      minSal: 15,
      type: "remote",
    },
  ]
];

function showCompany({companyDetails, location, name, type, exp}){
  console.log(location);
  if(location){
    if(companyDetails.location !== location){
      return false;
    }
  }
  if(name){
    if(companyDetails.name !== name){
      return false;
    }
  }
  if(type){
    if(companyDetails.type !== type){
      return false;
    }
  }
  if(exp){
    if(companyDetails.exp !== exp){
      return false;
    }
  }
  console.log(companyDetails);

  return true;
}

function filterCompanies(filters) {
  if(!filters.location && !filters.type && !filters.exp && !filters.name ){
    return companies;
  }
  let searchRes=[];
  let col = [];
  for(let i=0;i<companies.length;i++){
    for(let j=0;j<companies[i].length;j++){
      const companyDetails = companies[i][j];
      if(showCompany({companyDetails, ...filters})){
        console.log("Hello");
        col.push(companies[i][j]);
      }
      if(col.length === 3){
        searchRes.push(col);
        col = [];
      }
    }
  }
  if(col.length){
    searchRes.push(col);
  }
  if(!searchRes.length){
    return companies;
  }
  return searchRes;
}

function App() {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');
  const [exp, setExp] = useState('');
  

  const filteredCompanies = useMemo(() => filterCompanies({name,location,type,exp}), [name,location,type,exp]);
  console.log(filteredCompanies);

  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <Box sx={{display: 'flex',gap: 2}}>
          <TextField id="outlined-basic" variant="outlined" placeholder="Company Name" onChange={(e)=> setName(e.target.value)}/>
          <TextField id="outlined-basic" variant="outlined" placeholder="Location" onChange={(e)=> setLocation(e.target.value)}/>
          <TextField id="outlined-basic" variant="outlined" placeholder="Type" onChange={(e)=> setType(e.target.value)}/>
          <TextField id="outlined-basic" variant="outlined" placeholder="Experience" onChange={(e)=> setExp(e.target.value)}/>
        </Box>
            <Box sx={{ height: "100vh", width: "100vw" }}>
          <AutoSizer>
            {({ height, width }) => (
              <Grid 
                cellRenderer={({ columnIndex, key, rowIndex, style }) => (
                  <JobCard
                    key={key}
                    data={filteredCompanies[rowIndex]?.[columnIndex]}
                    style={style}
                  />
                )}
                columnCount={filteredCompanies[0]?.length}
                columnWidth={() =>
                  calculateColumnWidth(filteredCompanies[0]?.length, width)
                }
                height={height}
                rowCount={filteredCompanies.length}
                rowHeight={600}
                width={width}
              />
            )}
          </AutoSizer>
        </Box>
      </Fragment>
    </ThemeProvider>
  );
}

export default App;