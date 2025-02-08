import { Box, useMediaQuery } from "@mui/material";
import Column1 from "./Column1";
import Column2 from "./Column2";
import Column3 from "./Column3";

const gridTemplateLargeScreens = `
  "a b c"
  "a b c"
  "a b i"
  "a b i"
  "d e f"
  "d e f"
  "d e f"
  "g e h"
  "g e h"
  "g e h"
`;

const gridTemplateSmallScreens = `
  "a"
  "a"
  "a"
  "a"
  "d"
  "d"
  "d"
  "g"
  "g"
  "g"
  "b"
  "b"
  "b"
  "b"
  "e"
  "e"
  "e"
  "e"
  "e"
  "e"
  "c"
  "c"
  "c"
  "c"
  "c"
  "c"
  "f"
  "f"
  "f"
  "f"
`;

const Dashboard = () => {
  const isAboveMediumScreens = useMediaQuery("(min-width: 1200px)");
  return (
    <Box
      width="100%"
      height="1200px"
      display="grid"
      gap="1rem"
      sx={
        isAboveMediumScreens
          ? {
              gridTemplateColumns: "repeat(3, minmax(370px, 1fr))",
              gridTemplateRows: "repeat(10, minmax(60px, 1fr))",
              gridTemplateAreas: gridTemplateLargeScreens,
            }
          : {
              gridAutoColumns: "1fr",
              gridAutoRows: "80px",
              gridTemplateAreas: gridTemplateSmallScreens,
            }
      }
    >
      <Column1 />
      <Column2 />
      <Column3 />
    </Box>
  );
};

export default Dashboard;
