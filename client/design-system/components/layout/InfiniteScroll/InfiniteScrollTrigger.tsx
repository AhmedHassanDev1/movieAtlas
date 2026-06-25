

import { Box, CircularProgress } from "@mui/material";
import { ThreeDot } from "react-loading-indicators";

type Props = {
  innerRef: React.RefObject<HTMLDivElement | null>;
  isLoading: boolean;
  hasNextPage?: boolean;
};

export function InfiniteScrollTrigger({
  innerRef,
  isLoading,
  hasNextPage,
}: Props) {
  if (!hasNextPage) return null;

  return (
    <Box
      ref={innerRef}
      sx={{
        display: "flex",
        justifyContent: "center",
        py: 2,
      }}
    >
      {isLoading && <Box sx={{ width: "100%", display: "flex", justifyContent: "center", p: 2 }} >
        <ThreeDot variant="pulsate" color="#505050" size="medium" />
      </ Box>}
    </Box>
  );
}