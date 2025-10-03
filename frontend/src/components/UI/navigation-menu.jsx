// EmergencyNavigationMenu.jsx
import React, { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

export default function EmergencyNavigationMenu() {
  const [contacts] = useState([
    { name: "Police", number: "100" },
    { name: "Ambulance", number: "102" },
    { name: "Fire Dept.", number: "101" },
    { name: "Local Help Line", number: "108" },
  ]);

  const handleCall = (number) => {
    window.location.href = `tel:${number}`;
  };

  return (
    <NavigationMenu className="w-60">
      <NavigationMenuItem>
        <NavigationMenuTrigger>Emergency Contacts</NavigationMenuTrigger>
        <NavigationMenuContent>
          {contacts.map((contact) => (
            <NavigationMenuLink
              key={contact.number}
              onClick={() => handleCall(contact.number)}
            >
              {contact.name} — {contact.number}
            </NavigationMenuLink>
          ))}
        </NavigationMenuContent>
      </NavigationMenuItem>
    </NavigationMenu>
  );
}
