export const emailSubject = "Make Pembury Circus Safe for Cycling";
const emailBody = `
Dear {{ recipientNames }},

I am writing to you out of concern that a once in a generation opportunity is being squandered with the planned redesign of Pembury Junction. Proceeding with an approach which does not include protection for cyclists, and instead requires them to mix with general traffic, is inconsistent with Hackney Council's commitment to safety and the principles of Vision Zero.

My understanding is that Hackney Cycling Campaign have presented an alternative design to you, produced by a leading expert who has led other successful junction renewal schemes in London, that accommodates safe cycling while also maintaining the benefits of the design you have shown (in terms of motor vehicle capacity, bus reliability, and simplified pedestrian movements). As they have shown it is possible to achieve all these aims, and yet you are proceeding with an approach which excludes safe cycling regardless, this surely requires rigorous justification. I ask that you explain why the council is abandoning the safety principles they have previously championed, particularly when just last year, Harry Webb and Gao Gao were tragically killed while cycling on the borough’s roads. Currently a cyclist is seriously injured on average around once every 17 months while trying to cross Pembury Circus. These life changing collisions are not inevitable, and we need not to just accept them.

Pembury Circus deserves a design which:

- Ensures cyclist safety for all ages, on every junction movement
- Delivers a faster route for buses
- Provides more space for pedestrians
- Slows motor vehicles to reduce collisions
- Provides additional greening where possible
- Deliver a space that Hackney can be proud of.

I hope you can agree that all of these aims are important, and if any are omitted from the eventual design, it will be a great shame that Hackney missed out on the chance to have a class leading junction at its heart for decades to come.

Kind Regards, {{ sender }}
`;
const emailBodyLines = emailBody.trim().split("\n");
export const emailBodyTemplate = emailBodyLines.join("%0D%0A");
export const manualEmailBodyTemplate = emailBodyLines.join("\n");
