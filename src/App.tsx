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
import {
  emailBodyTemplate,
  emailSubject,
  manualEmailBodyTemplate,
} from "./email";
import { listFormatter } from "./listFormatter";

const wards = Object.keys(councillorInfo).sort();
const mayor = {
  name: "Mayor Caroline Woodley",
  party: "Labour",
  contact: "mayor@hackney.gov.uk",
};
const transportLead = {
  name: "Cllr Sarah Joanna Young",
  party: "Labour",
  contact: "sarah.young@hackney.gov.uk",
};
// Globally styling components with Chakra seems finicky, so doing this
const commonCardProps = {
  border: "1px",
  borderColor: "gray.400",
  marginX: "12px",
  shadow: "lg",
};
const commonInputProps = {
  borderColor: "gray.400",
  _hover: { borderColor: "teal.200" },
  marginTop: "0.5rem",
};

type Ward = keyof typeof councillorInfo;

function App() {
  const [senderName, setSenderName] = useState("");
  const [senderAddress, setSenderAddress] = useState("");
  const [ward, setWard] = useState<Ward | "">("");
  const recipients = [mayor, transportLead];

  if (ward) {
    recipients.push(...councillorInfo[ward]);
  }
  const emails = recipients.map((recipient) => recipient.contact);
  const recipientNames = recipients.map((recipient) => recipient.name);
  const formattedReciepientNames = listFormatter(recipientNames);
  const senderText = senderName + (senderAddress ? ` (${senderAddress})` : "");
  const emailBody = emailBodyTemplate
    .replace("{{ recipientNames }}", formattedReciepientNames)
    .replace("{{ sender }}", senderText);
  const manualEmailBody = manualEmailBodyTemplate
    .replace("{{ recipientNames }}", formattedReciepientNames)
    .replace("{{ sender }}", senderText);
  const mailtoLink = `mailto:${emails.join(
    ","
  )}?subject=${emailSubject}&body=${emailBody}`;

  return (
    <Stack spacing="24px" margin="12px auto" maxWidth="640px">
      <Card {...commonCardProps}>
        <CardBody>
          <Stack spacing="1rem">
            <FormLabel>
              Enter your name:{" "}
              <Input
                onChange={(e) => setSenderName(e.target.value)}
                {...commonInputProps}
              />
            </FormLabel>

            <FormLabel>
              Enter your home address (optional):{" "}
              <Input
                onChange={(e) => setSenderAddress(e.target.value)}
                {...commonInputProps}
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
                defaultValue=""
                {...commonInputProps}
              >
                <option value="" disabled hidden></option>
                {wards.map((ward) => (
                  <option key={ward}>{ward}</option>
                ))}
              </Select>
            </FormLabel>

            <Text>
              Once you've completed those steps, click below and you will be
              sent to your email client. The mayor, transport lead and your
              local councillors will be set as receipients, and our suggested
              text to send will be pre-filled.
            </Text>

            <Text>
              Feel free to just use the text we've prepared as a jumping off
              point, though. Responses that are more personal and informed by
              your own experience could potentially be more persuasive.
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

      <Card {...commonCardProps}>
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
