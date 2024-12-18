import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { acceptRequest, rejectRequest } from "./api";

export default function RequestStatus({
  contact,
  onAccept,
}: {
  contact: any;
  onAccept: (contact: any, friend: boolean) => void;
}) {
  const [status, setStatus] = useState("");

  useEffect(() => {
    axios
      .get(
        `http://localhost:8000/friends/isRequestReceived?from_user_id=${contact.ID}`,
        {
          headers: {
            Authorization: "Bearer " + `${localStorage.getItem("token")}`,
          },
        }
      )
      .then((resp) => {
        if (resp.data.data == true) {
          setStatus("Received");
        } else {
          axios
            .get(
              `http://localhost:8000/friends/isRequestSent?to_user_id=${contact.ID}`,
              {
                headers: {
                  Authorization: "Bearer " + `${localStorage.getItem("token")}`,
                },
              }
            )
            .then((resp) => {
              if (resp.data.data == true) {
                setStatus("Sent");
              } else {
                setStatus("");
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [contact.ID]);

  function sendRequest() {
    axios
      .post(
        `http://localhost:8000/friends/sendFriendRequest?to_user_id=${contact.ID}`,
        "",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((resp) => {
        if (resp.data.data == "Sent") {
          setStatus("Sent");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <Box display="flex" flexDirection="column" flex="1" height="80vh">
      <Box minHeight={30} bgcolor="msgBg.main">
        <Typography variant="h6" color="primary.light" p={1}>
          {contact.Username}
        </Typography>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flex="1"
        gap={3}
      >
        {status == "Received" ? (
          <>
            <Button
              variant="contained"
              sx={{
                color: "primary.contrastText",
                backgroundColor: "primary",
                ":hover": {
                  color: "primary.light",
                },
              }}
              onClick={() => {
                acceptRequest(contact.ID);
                onAccept(contact, true);
              }}
            >
              Accept
            </Button>
            <Button
              variant="outlined"
              sx={{
                color: "primary.light",
                borderColor: "msgBg.main",
                ":hover": {
                  color: "primary.contrastText",
                  borderColor: "primary.light",
                },
              }}
              onClick={() => {
                rejectRequest(contact.ID);
                setStatus("");
              }}
            >
              Reject
            </Button>
          </>
        ) : status == "Sent" ? (
          <Typography
            border="1px solid"
            borderColor="msgBg.main"
            borderRadius={1}
            color="primary.light"
            sx={{
              padding: "6px 14px",
              fontSize: "0.875rem",
              fontWeight: 500,
              textTransform: "uppercase ",
            }}
          >
            Request Pending
          </Typography>
        ) : (
          <Button
            variant="outlined"
            sx={{
              color: "primary.light",
              borderColor: "msgBg.main",
              ":hover": {
                color: "primary.contrastText",
                borderColor: "primary.light",
              },
            }}
            onClick={sendRequest}
          >
            Send Request
          </Button>
        )}
      </Box>
    </Box>
  );
}
