import { Box, Typography } from "@mui/material";
import RequestItem from "./RequestItem";
import { useCallback, useEffect, useState } from "react";
import { acceptRequest, fetchRequests, rejectRequest } from "./api";

export default function RequestList() {
  const [requests, setRequests] = useState([]);

  const refreshRequests = useCallback(() => {
    fetchRequests()
      .then((res) => setRequests(res.data))
      .catch((err: any) => console.log(err));
  }, []);

  const handleAccept = (id: number) => {
    acceptRequest(id)
      .then(() => {
        refreshRequests();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleReject = (id: number) => {
    rejectRequest(id)
      .then(() => {
        refreshRequests();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    refreshRequests();
  }, [refreshRequests]);

  return (
    <Box pt="10vh" maxWidth="80%" margin="auto">
      {requests.length == 0 ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid",
            minWidth: "250px",
            borderColor: "msgBg.main",
            height: "80vh",
          }}
        >
          <Typography variant="h5" color="primary.light">
            No requests to accept
          </Typography>
        </Box>
      ) : (
        <Box
          border="1px solid"
          minWidth="250px"
          borderColor="msgBg.main"
          height="80vh"
        >
          {requests.map((request: any) => (
            <RequestItem
              key={request.FromUserID}
              request={request}
              onAccept={handleAccept}
              onReject={handleReject}
            />
          ))}
        </Box>
      )}
    </Box>
  );
}
