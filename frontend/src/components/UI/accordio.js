import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./components/ui/accordion"

export default function FAQ() {
  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">SafeMind FAQ</h2>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>What is SafeMind?</AccordionTrigger>
          <AccordionContent>
            SafeMind is a mental health platform designed to provide IT employees with support,
            including a dedicated helpline, SafeSpace app, and wellness resources.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>How does it work?</AccordionTrigger>
          <AccordionContent>
            Employees can reach out via the helpline or app to get instant support,
            track mental wellness, and access professional resources confidentially.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}