import { useState, useCallback } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import BoltIcon from "@mui/icons-material/Bolt";

// Images
import img from "../images/test.jpg";

const toggleShowwMore = (setShowMore) => !setShowMore;

export default function JobCard({
  data: {
    companyName,
    jobRole,
    minExp,
    minJdSalary,
    location,
    jobDetailsFromCompany="",
  } = {},
  height,
  style,
}) {
  const [showMore, setShowMore] = useState(false);

  const handleShowMore = useCallback(() => setShowMore(toggleShowwMore), []);

  return (
    <Box sx={{ padding: 2, height }}>
      <Card
        sx={{ height: 1, display: "flex", flexDirection: "column", marginBottom: "100px"}}
        style={style}
      >
        <CardMedia component="img" height="150" image={img} alt={companyName} />

        <CardHeader title={companyName} subheader={jobRole} />

        <CardContent sx={{ flexGrow: 1 }}>
          <Box sx={{ height: 200, overflowY: "scroll" }}>
            <Box>Experience Required: {minExp} years</Box>
            <Box>
              Expected Salary: {minJdSalary} - LPA
            </Box>
            <Box>Location: {location}</Box>
            <Box>
              <h3>About Company:</h3>
              <Box>
                {showMore
                  ? jobDetailsFromCompany
                  : `${jobDetailsFromCompany.substring(0, 10)}...`}

                {!showMore && (
                  <Button
                    onClick={handleShowMore}
                    variant="text"
                    disableElevation={true}
                  >
                    Show More
                  </Button>
                )}
              </Box>
            </Box>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            <Button
              variant="contained"
              fullWidth={true}
              color="neutral"
              disableElevation={true}
              startIcon={<BoltIcon color="icon" />}
            >
              Easy Apply
            </Button>
            <Button
              variant="contained"
              fullWidth={true}
              color="danger"
              disableElevation={true}
            >
              Ask for referral
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}