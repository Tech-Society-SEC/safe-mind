// EmergencyContactMenu.jsx
import React, { useState } from "react";
import {
  Menubar,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarShortcut
} from "@/components/ui/menubar";

export default function EmergencyContactMenu() {
  const [contacts] = useState([
    { name: "Police", number: "100" },
    { name: "Ambulance", number: "102" },
    { name: "Fire Dept.", number: "101" },
    { name: "Local Help Line", number: "108" }
  ]);

  const handleCall = (number) => {
    window.location.href = `tel:${number}`;
  };

  return (
    <Menubar className="w-60">
      <MenubarTrigger>Emergency Contacts</MenubarTrigger>
      <MenubarContent>
        <MenubarLabel>Contacts</MenubarLabel>
        {contacts.map((contact) => (
          <MenubarItem
            key={contact.number}
            onSelect={() => handleCall(contact.number)}
          >
            {contact.name}
            <MenubarShortcut>{contact.number}</MenubarShortcut>
          </MenubarItem>
        ))}
        <MenubarSeparator />
        <MenubarItem onSelect={() => alert("Contact support")}>
          Add New Contact
        </MenubarItem>
      </MenubarContent>
    </Menubar>
  );
}
