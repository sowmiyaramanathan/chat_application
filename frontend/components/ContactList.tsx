import { Box } from "@mui/material";
import ContactItem from "./ContactItem";

export default function ContactList({
  contacts,
  onContactSelect,
}: {
  contacts: any;
  onContactSelect: (contact: any, friend: boolean) => void;
}) {
  return (
    <Box>
      {contacts.map((contact: { ID: number }) => (
        <ContactItem
          key={contact.ID}
          contact={contact}
          onSelect={onContactSelect}
        />
      ))}
    </Box>
  );
}
