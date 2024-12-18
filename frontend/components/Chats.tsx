import { Box, Stack, Typography } from "@mui/material";
import { useState } from "react";
import ContactList from "./ContactList";
import ChatScreen from "./ChatScreen";
import RequestStatus from "./RequestStatus";

export default function Chats({ contacts }: { contacts: any }) {
  const [selectedContact, setSelectedContact] = useState<any>(null);
  const [isFriend, setIsFriend] = useState<boolean>(false);

  const handleContactSelect = (contact: any, friend: boolean) => {
    setSelectedContact(contact);
    setIsFriend(friend);
  };

  return (
    <Box maxWidth="80%" margin="auto" pt="10vh">
      <Stack direction="row" height="80vh">
        <Box
          flex="1"
          border="1px solid"
          minWidth="250px"
          borderColor="msgBg.main"
          display="flex"
          flexDirection="column"
        >
          <ContactList
            contacts={contacts}
            onContactSelect={handleContactSelect}
          />
        </Box>
        <Box
          flex="3"
          borderTop="1px solid "
          borderRight="1px solid "
          borderBottom="1px solid "
          borderColor="msgBg.main"
        >
          {selectedContact && isFriend ? (
            <ChatScreen
              toID={selectedContact.ID}
              username={selectedContact.Username}
            />
          ) : selectedContact && !isFriend ? (
            <RequestStatus
              contact={selectedContact}
              onAccept={handleContactSelect}
            />
          ) : (
            <Box
              display="flex"
              flex="3"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              color="primary.light"
            >
              <Typography variant="h6">Start making friends</Typography>
              <Typography variant="body1">
                Pick a contact on your left to start
              </Typography>
            </Box>
          )}
        </Box>
      </Stack>
    </Box>
  );
}
