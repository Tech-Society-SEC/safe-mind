// SafeMindEmergencyContacts.jsx
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"; // assuming you have this
import { Phone } from "lucide-react";

export default function SafeMindEmergencyContacts() {
  const [open, setOpen] = useState(false);

  const contacts = [
    { name: "Police", phone: "100" },
    { name: "Ambulance", phone: "102" },
    { name: "Fire Dept", phone: "101" },
    { name: "Disaster Helpline", phone: "108" },
  ];

  return (
    <div className="p-4">
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 rounded-md border px-4 py-2 bg-primary text-white hover:bg-primary/90">
            Emergency Contacts
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56 p-2">
          {contacts.map((contact) => (
            <DropdownMenuItem
              key={contact.phone}
              className="flex items-center gap-2 cursor-pointer hover:bg-accent/20 rounded-md p-2"
              onClick={() => window.alert(`Call ${contact.name}: ${contact.phone}`)}
            >
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{contact.name}</span>
              <span className="ml-auto font-mono text-sm">{contact.phone}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
