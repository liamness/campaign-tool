import { useState } from "react";

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
    <>
      <label>
        Name: <input onChange={(e) => setSenderName(e.target.value)} />
      </label>
      <label>
        Ward:{" "}
        <select onChange={(e) => setWard(e.target.value as Ward)}>
          {Object.keys(councillorInfo).map((ward) => (
            <option key={ward}>{ward}</option>
          ))}
        </select>
      </label>
      <p>
        Find out which ward you are in by clicking{" "}
        <a
          href="https://hackney.gov.uk/constituencies-wards#wards"
          target="_blank"
        >
          here
        </a>
      </p>
      <p>
        When you're ready, click below and you will be sent to your email
        client, with our suggested text to send pre-filled:
      </p>
      <button
        onClick={(e) => {
          // Would prefer not to use window.open(), but Firefox was not co-operating
          window.open(mailtoLink), e.preventDefault();
        }}
      >
        Send email
      </button>

      <p>
        If for some reason clicking that didn't work, please see below for the
        manual process:
      </p>
      <p>Send to: {emails.join(", ")}</p>
      <p style={{ whiteSpace: "pre" }}>{manualEmailBody}</p>
    </>
  );
}

export default App;
