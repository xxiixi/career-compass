import { Typography, useTheme } from "@mui/material";
import FlexBetween from "@/components/FlexBetween";

import iconImage from "@/assets/compass-logo-4.png";

type Props = {};

const Navbar = (props: Props) => {
  const { palette } = useTheme();
  return (
    <FlexBetween mb="0.25rem" p="0.5rem 0rem" color={palette.grey[300]}>
      <FlexBetween gap="0.75rem">
      <img src={iconImage} alt="Icon" style={{ width: 50, height: 50 }} />
        <Typography variant="h4" fontSize="34px" fontWeight={'bold'}>
          Career Compass
        </Typography>
      </FlexBetween>
    </FlexBetween>
  );
};

export default Navbar;
