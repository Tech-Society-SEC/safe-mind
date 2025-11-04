import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./tabs";

export default function App() {
  return (
    <Tabs defaultValue="tab1">
      <TabsList>
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
      </TabsList>

      <TabsContent value="tab1">
        <p>This is the content of Tab 1.</p>
      </TabsContent>
      <TabsContent value="tab2">
        <p>This is the content of Tab 2.</p>
      </TabsContent>
    </Tabs>
  );
}
