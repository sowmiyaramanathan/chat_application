import { Box, Typography } from "@mui/material";

export default function contact({ contact }: { contact: any }) {
  const { username } = contact;

  return (
    <>
      <Box sx={{ padding: "30px" }}>
        {/* <Typography variant="h5">{username}</Typography> */}
      </Box>
    </>
  );
}
