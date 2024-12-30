import { Box, Typography, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { MessageField } from "./CustomComponets";

interface Message {
  FromUserID: number;
  ToUserID: number;
  Message: string;
}

function ChatScreen({ toID, username }: { toID: number; username: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    const token =
      typeof window !== "undefined" && localStorage.getItem("token");

    axios
      .get(`http://localhost:8000/message/view?to_id=${toID}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setMessages(response.data);
      })
      .catch((error) => {
        console.log(error.response);
      });

    ws.current = new WebSocket("http://localhost:8000/ws");

    ws.current.onmessage = (event) => {
      const message = JSON.parse(event.data) as Message;
      console.log(message);
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    return () => {
      ws.current?.close();
    };
  }, [toID]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const getUserIDFromToken = (token: any) => {
    // Split the token into its parts
    const parts = token.split(".");
    if (parts.length !== 3) {
      throw new Error("Invalid token");
    }

    // Decode the payload part (second part of the token)
    const payload = parts[1];
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/"); // base64-url to base64

    // Decode base64 to a JSON string
    const jsonString = atob(base64);

    // Parse the JSON string
    const payloadObj = JSON.parse(jsonString);

    // Extract and return the user ID (assuming it's stored under 'sub' or 'userID')
    return payloadObj.sub || payloadObj.userID;
  };

  // async function storeMessage(userId: number, message: string): Promise<void> {
  //   const db = await openDb();
  //   const tx = db.transaction("messages", "readwrite");
  //   const store = tx.objectStore("messages");
  //   store.put({ id: userId, message: message });
  //   await tx.oncomplete;
  // }

  // async function getMessages(userId: number): Promise<ArrayBuffer[]> {
  //   const db = await openDb();
  //   const tx = db.transaction("messages", "readonly");
  //   const store = tx.objectStore("messages");
  //   const request = store.get(userId);

  //   const result = await new Promise<any>((resolve, reject) => {
  //     request.onsuccess = () => resolve(request.result);
  //     request.onerror = () => reject(request.error);
  //   });

  //   await tx.oncomplete;

  //   return result ? [result.message] : [];
  // }

  // function openDb(): Promise<IDBDatabase> {
  //   return new Promise((resolve, reject) => {
  //     const request = indexedDB.open("chatApp", 1);

  //     request.onupgradeneeded = function (event: IDBVersionChangeEvent) {
  //       const db = (event.target as IDBRequest<IDBDatabase>).result;
  //       (db as IDBDatabase).createObjectStore("messages", { keyPath: "id" });
  //     };

  //     request.onsuccess = function (event: Event) {
  //       resolve((event.target as IDBRequest<IDBDatabase>).result);
  //     };

  //     request.onerror = function (event: Event) {
  //       reject((event.target as IDBRequest).error);
  //     };
  //   });
  // }

  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return;

    const token = localStorage.getItem("token");

    await axios.post(
      `http://localhost:8000/message/create?to_id=${toID}`,
      { message: newMessage },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (token) {
      try {
        const userID = getUserIDFromToken(token);
        if (ws.current) {
          ws.current.send(
            JSON.stringify({
              Message: newMessage,
              FromUserID: userID,
              ToUserID: toID,
            })
          );
        }
      } catch (error) {
        console.error("Failed to extract user ID:", error);
      }
    }

    setNewMessage("");
  };

  return (
    <Box display="flex" flexDirection="column" flex="1" height="80vh">
      <Box minHeight={30} bgcolor="msgBg.main">
        <Typography variant="h6" color="primary.light" p={1}>
          {username}
        </Typography>
      </Box>
      <Box display="flex" flexDirection="column" flex="1" p={2} overflow="auto">
        <Box
          flexGrow={1}
          overflow="auto"
          sx={{
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {messages.map((message, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent={
                message.FromUserID === toID ? "flex-start" : "flex-end"
              }
              mb={1}
            >
              <Typography
                variant="body1"
                sx={{
                  backgroundColor:
                    message.FromUserID === toID ? "msgBg.main" : "primary.main",
                  color:
                    message.FromUserID === toID
                      ? "black"
                      : "primary.contrastText",
                  padding: 1,
                  borderRadius: 3,
                  wordBreak: "break-word",
                }}
              >
                {message.Message}
              </Typography>
            </Box>
          ))}
          <div ref={messagesEndRef} />
        </Box>
        <Box
          component="form"
          display="flex"
          alignItems="center"
          mt={2}
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
        >
          <MessageField
            variant="outlined"
            size="small"
            fullWidth
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            sx={{
              marginRight: 1,
            }}
          />
          <IconButton onClick={handleSendMessage} sx={{ color: "msgBg.main" }}>
            <SendIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}

export default ChatScreen;
