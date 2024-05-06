import React, { useState, useMemo, useEffect} from 'react'
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


let companyData;

// Function to check if the current job is to be displayed as per the search queries
function showCompany({companyDetails, location, name, exp,title,pay}){
  if(location){
    if(companyDetails.location.toLowerCase() !== location.toLowerCase()){
      return false;
    }
  }
  if(name){
    if(companyDetails.companyName.toLowerCase() !== name.toLowerCase()){
      return false;
    }
  }
  if(exp){
    if(companyDetails.minExp && companyDetails.minExp.toString() !== exp){
      return false;
    }
  }
  if(title){
    if(companyDetails.jobRole.toLowerCase() !== title.toLowerCase()){
      return false;
    }
  }
  if(pay){
    if(companyDetails.minJdSalary && companyDetails.minJdSalary.toString() !== pay){
      return false;
    }
  }

  return true;
}
// Function to filter the jobs 
function filterCompanies(filters) {
 
  if(!filters.location && !filters.type && !filters.exp && !filters.name && !filters.title && !filters.pay && !filters.data){
    return [[]];
  }
  if(!companyData){
    companyData = filters.data.jdList
    console.log(companyData);
    setList();
  }
  let searchRes=[];
  let col = [];
  for(let i=0;i<companyData.length;i++){
    for(let j=0;j<companyData[i].length;j++){
      const companyDetails = companyData[i][j];
      if(showCompany({companyDetails, ...filters})){
        col.push(companyData[i][j]);
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
    return companyData;
  }
  return searchRes;
}
function setList(){
  let row = [];
  let col = [];
  for(let i = 0;i < companyData.length;i++){
    if(col.length < 3){
      col.push(companyData[i]);
    }else{
      row.push(col);
      col=[];
    }
  }
  if(col){
    row.push(col);
  }
  companyData = row;
}


function App() {
  const [data, setData] = useState(); 
  
      useEffect(() =>{
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const body = JSON.stringify({
        "limit": 10,
        "offset": 0
        });
      
        const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body
        };
        fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions)
        .then((response) => response.text())
        .then((result) => setData(JSON.parse(result)))
        .catch((error) => console.error(error));
      },[]);
      

  const [name, setName] = useState(''); // State hook for searching on the basis of company name
  const [location, setLocation] = useState(''); // State hook for searching on the basis of company location
  const [exp, setExp] = useState(''); // State hook for searching on the basis of experience
  const [title, setTitle] = useState(''); // State hook for searching on the basis of role title
  const [pay, setPay] = useState(''); // State hook for searching on the basis of min pay
  
  const filteredCompanies = useMemo(() => filterCompanies({name,location,exp,title,pay,data}), [name,location,exp,title,pay,data]);

  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <Box sx={{display: 'flex',gap: 2}}>
          <TextField id="outlined-basic" variant="outlined" placeholder="Company Name" onChange={(e)=> setName(e.target.value)}/>
          <TextField id="outlined-basic" variant="outlined" placeholder="Location" onChange={(e)=> setLocation(e.target.value)}/>
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