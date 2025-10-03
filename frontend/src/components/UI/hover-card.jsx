// SafeMindEmergencyHoverCard.jsx
import React from "react";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";

export default function SafeMindEmergencyHoverCard({ contact }) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div
          className={cn(
            "cursor-pointer rounded-md px-2 py-1 hover:bg-accent hover:text-accent-foreground",
            "inline-block"
          )}
        >
          {contact.name}
        </div>
      </HoverCardTrigger>

      <HoverCardContent>
        <div className="space-y-2">
          <p className="text-sm font-semibold">{contact.name}</p>
          <p className="text-xs text-muted-foreground">Phone: {contact.phone}</p>
          <p className="text-xs text-muted-foreground">Relation: {contact.relation}</p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

// Usage example
/*
<SafeMindEmergencyHoverCard
  contact={{ name: "John Doe", phone: "1234567890", relation: "Parent" }}
/>
*/
