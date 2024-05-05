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

// Static data as the API endpoint was not given in the assignment, also sent a mail regarding this but recieved no response
const companies = [
  [
    {
      name: "Amazon",
      title: "Software Engineer",
      expReq: "2",
      location: "Bangalore",
      jobDescription: lorem,
      minSal: "15",
      type: "remote",
    },
    {
      name: "Flipkart",
      title: "Manager",
      expReq: "3",
      location: "Bangalore",
      jobDescription: lorem,
      type: "on-site",
      minSal: "8",
    },
    {
      name: "Apple",
      title: "Product manager",
      expReq: "1",
      location: "Bangalore",
      jobDescription: lorem,
      type: "remote",
      minSal: "13",
    },
  ],
  [
    {
      name: "Netflix",
      title: "Software Engineer",
      expReq: "0",
      location: "Delhi",
      jobDescription: lorem,
      type: "on-site",
      minSal: "11",
    },
    {
      name: "Weekday",
      title: "Software Engineer",
      expReq: "2",
      location: "Bangalore",
      jobDescription: lorem,
      type: "remote",
      minSal: "10",
    },
    {
      name: "Tekion",
      title: "Software Engineer",
      expReq: "3",
      location: "Bangalore",
      jobDescription: lorem,
      type: "on-site",
      minSal: "15",
    },
  ],
  [
    {
      name: "Microsoft",
      title: "Software Engineer",
      expReq: "5",
      location: "Bangalore",
      jobDescription: lorem,
      type: "remote",
      minSal: "10",
    },
    {
      name: "Google",
      title: "Software Engineer",
      expReq: "1",
      location: "Bangalore",
      jobDescription: lorem,
      type: "on-site",
      minSal: "8",
    },
    {
      name: "Amazon",
      title: "Software Engineer",
      expReq: "2",
      location: "Delhi",
      jobDescription: lorem,
      minSal: "15",
      type: "remote",
    },
  ]
];

// Function to check if the current job is to be displayed as per the search queries
function showCompany({companyDetails, location, name, type, exp,title,pay}){
  if(location){
    if(companyDetails.location.toLowerCase() !== location.toLowerCase()){
      return false;
    }
  }
  if(name){
    if(companyDetails.name.toLowerCase() !== name.toLowerCase()){
      return false;
    }
  }
  if(type){
    if(companyDetails.type.toLowerCase() !== type.toLowerCase()){
      return false;
    }
  }
  if(exp){
    if(companyDetails.expReq !== exp){
      return false;
    }
  }
  if(title){
    if(companyDetails.title.toLowerCase() !== title.toLowerCase()){
      return false;
    }
  }
  if(pay){
    if(companyDetails.minSal !== pay){
      return false;
    }
  }

  return true;
}
// Function to filter the jobs 
function filterCompanies(filters) {
  if(!filters.location && !filters.type && !filters.exp && !filters.name && !filters.title && !filters.pay){
    return companies;
  }
  let searchRes=[];
  let col = [];
  for(let i=0;i<companies.length;i++){
    for(let j=0;j<companies[i].length;j++){
      const companyDetails = companies[i][j];
      if(showCompany({companyDetails, ...filters})){
        col.push(companies[i][j]);
      }
      if(col.length === 3){
        searchRes.push(col);
        col = [];
      }
    }
  }
  console.log(searchRes);
  if(col.length){
    searchRes.push(col);
  }
  if(!searchRes.length){
    return companies;
  }
  return searchRes;
}

function App() {

  const [name, setName] = useState(''); // State hook for searching on the basis of company name
  const [location, setLocation] = useState(''); // State hook for searching on the basis of company location
  const [type, setType] = useState(''); // State hook for searching on the basis of role type
  const [exp, setExp] = useState(''); // State hook for searching on the basis of experience
  const [title, setTitle] = useState(''); // State hook for searching on the basis of role title
  const [pay, setPay] = useState(''); // State hook for searching on the basis of min pay
  

  const filteredCompanies = useMemo(() => filterCompanies({name,location,type,exp,title,pay}), [name,location,type,exp,title,pay]);

  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <Box sx={{display: 'flex',gap: 2}}>
          <TextField id="outlined-basic" variant="outlined" placeholder="Company Name" onChange={(e)=> setName(e.target.value)}/>
          <TextField id="outlined-basic" variant="outlined" placeholder="Location" onChange={(e)=> setLocation(e.target.value)}/>
          <TextField id="outlined-basic" variant="outlined" placeholder="Type" onChange={(e)=> setType(e.target.value)}/>
          <TextField id="outlined-basic" variant="outlined" placeholder="Experience" onChange={(e)=> setExp(e.target.value)}/>
          <TextField id="outlined-basic" variant="outlined" placeholder="Job Role" onChange={(e)=> setTitle(e.target.value)}/>
          <TextField id="outlined-basic" variant="outlined" placeholder="Min Pay" onChange={(e)=> setPay(e.target.value)}/>
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