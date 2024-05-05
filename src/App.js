import React, { useState } from 'react'
import { AutoSizer, Grid } from "react-virtualized";
import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';
import { BsSearch } from 'react-icons/bs';
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
    },
    {
      name: "Flipkart",
      title: "Software Engineer",
      expReq: 2,
      location: "Bangalore",
      jobDescription: lorem,
    },
    {
      name: "Apple",
      title: "Software Engineer",
      expReq: 2,
      location: "Bangalore",
      jobDescription: lorem,
    },
  ],
  [
    {
      name: "Netflix",
      title: "Software Engineer",
      expReq: 2,
      location: "Bangalore",
      jobDescription: lorem,
    },
    {
      name: "Weekday",
      title: "Software Engineer",
      expReq: 2,
      location: "Bangalore",
      jobDescription: lorem,
    },
    {
      name: "Tekion",
      title: "Software Engineer",
      expReq: 2,
      location: "Bangalore",
      jobDescription: lorem,
    },
  ],
  [
    {
      name: "Microsoft",
      title: "Software Engineer",
      expReq: 2,
      location: "Bangalore",
      jobDescription: lorem,
    },
    {
      name: "Google",
      title: "Software Engineer",
      expReq: 2,
      location: "Bangalore",
      jobDescription: lorem,
    }
  ]
];

function App() {
  // const [filter, setFilter] = useState();
  const [company, setCompanies] = useState(companies);
  const [searchVal, setSearchVal] = useState("");
  function handleSearchClick() {
    if (searchVal === "") { setCompanies(companies); return; }
    const filterBySearch = companies.filter((item) => {
      item.filter((c) => {
        
        if(c.name === searchVal){
          return c;
        }
        return companies;
      })
      return companies;
    })
    setCompanies(filterBySearch);
}


  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <Box>
          <TextField id="outlined-basic" label="Outlined" variant="outlined" onChange={e => setSearchVal(e.target.value)}/>
          <BsSearch onClick={handleSearchClick} />
        </Box>
        {company.map((comp) => {
          return (
            <Box sx={{ height: "100vh", width: "100vw" }}>
          <AutoSizer>
            {({ height, width }) => (
              <Grid 
                cellRenderer={({ columnIndex, key, rowIndex, style }) => (
                  <JobCard
                    key={key}
                    data={company[rowIndex][columnIndex]}
                    style={style}
                  />
                )}
                columnCount={company[0].length}
                columnWidth={() =>
                  calculateColumnWidth(company[0].length, width)
                }
                height={height}
                rowCount={companies.length}
                rowHeight={600}
                width={width}
              />
            )}
          </AutoSizer>
        </Box>
          )
        })}
        
      </Fragment>
    </ThemeProvider>
  );
}

export default App;