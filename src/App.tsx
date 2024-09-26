import { useState } from "react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
  Box,
  Card,
  CardBody,
  FormLabel,
  Input,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";

import { councillorInfo } from "./councillors";
import { listFormatter } from "./listFormatter";

const mayor = {
  name: "Mayor Caroline Woodley",
  party: "Labour",
  contact: "mayor@hackney.gov.uk",
};
const emailSubject = "Make Pembury Circus Safe for Cycling";
const emailBodyLines = [
  "To {{ recipientNames }},",
  "",
  "Please put protected space for cycling on Pembury Circus",
  "",
  "kthxbai, {{ senderName }}",
];
const emailBodyTemplate = emailBodyLines.join("%0D%0A");
const manualEmailBodyTemplate = emailBodyLines.join("\n");

type Ward = keyof typeof councillorInfo;

function App() {
  const [senderName, setSenderName] = useState("");
  const [ward, setWard] = useState<Ward | "">("");
  const recipients = [mayor];

  if (ward) {
    recipients.push(...councillorInfo[ward]);
  }
  const emails = recipients.map((recipient) => recipient.contact);
  const recipientNames = recipients.map((recipient) => recipient.name);
  const formattedReciepientNames = listFormatter(recipientNames);
  const emailBody = emailBodyTemplate
    .replace("{{ recipientNames }}", formattedReciepientNames)
    .replace("{{ senderName }}", senderName);
  const manualEmailBody = manualEmailBodyTemplate
    .replace("{{ recipientNames }}", formattedReciepientNames)
    .replace("{{ senderName }}", senderName);
  const mailtoLink = `mailto:${emails.join(
    ","
  )}?subject=${emailSubject}&body=${emailBody}`;

  return (
    <Stack spacing="24px" margin="12px auto" maxWidth="640px">
      <Card marginX="12px">
        <CardBody>
          <Stack spacing="1rem">
            <FormLabel>
              Enter your name:{" "}
              <Input
                onChange={(e) => setSenderName(e.target.value)}
                marginTop="0.5rem"
              />
            </FormLabel>
            <FormLabel>
              Select your ward: (if you don't know your ward, you can find it by
              clicking{" "}
              <a
                href="https://hackney.gov.uk/constituencies-wards#wards"
                target="_blank"
              >
                here
              </a>
              ){" "}
              <Select
                onChange={(e) => setWard(e.target.value as Ward)}
                marginTop="0.5rem"
              >
                <option value="" selected disabled hidden></option>
                {Object.keys(councillorInfo).map((ward) => (
                  <option key={ward}>{ward}</option>
                ))}
              </Select>
            </FormLabel>
            <Text>
              When you're ready, click below and you will be sent to your email
              client, with our suggested text to send pre-filled:
            </Text>
            <Button
              onClick={(e) => {
                // Would prefer not to use window.open(), but Firefox was not co-operating
                window.open(mailtoLink), e.preventDefault();
              }}
              isDisabled={!ward || !senderName}
              background="blue.800"
              color="white"
            >
              Send email
            </Button>
          </Stack>
        </CardBody>
      </Card>

      <Card marginX="12px">
        <CardBody>
          <Stack spacing="1rem">
            <Text>
              If for some reason clicking that didn't work, you can copy and
              paste the template email as shown below into your email client
              instead:
            </Text>

            <Accordion allowToggle background="blue.800" borderRadius="md">
              <AccordionItem>
                <AccordionButton color="white">
                  <span style={{ flex: "1" }}>See more</span>
                  <AccordionIcon />
                </AccordionButton>

                <AccordionPanel>
                  <Box background="white" borderRadius="sm" padding="0.5rem">
                    <Stack spacing="1rem">
                      <Text>Send to: {emails.join(", ")}</Text>
                      <Text whiteSpace="pre-wrap">{manualEmailBody}</Text>
                    </Stack>
                  </Box>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Stack>
        </CardBody>
      </Card>
    </Stack>
  );
}

export default App;
