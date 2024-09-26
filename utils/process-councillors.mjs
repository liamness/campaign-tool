import rawData from "./councillors.json" assert { type: "json" };

const wards = [
  "Brownswood",
  "Cazenove",
  "Clissold",
  "Dalston",
  "De Beauvoir",
  "Hackney Central",
  "Hackney Downs",
  "Hackney Wick",
  "Haggerston",
  "Homerton",
  "Hoxton East and Shoreditch",
  "Hoxton West",
  "Kings Park",
  "Lea Bridge",
  "London Fields",
  "Shacklewell",
  "Springfield",
  "Stamford Hill West",
  "Stoke Newington",
  "Victoria",
  "Woodberry Down",
];

const wardData = {};

rawData.features.forEach((feature) => {
  const { properties } = feature;
  const wardName = properties.ward_name;
  const councillors = [];
  for (let i = 1; i < 4; i++) {
    const councillor = {
      name: properties[`councillor${i}_name`],
      party: properties[`councillor${i}_party`],
      contact: properties[`councillor${i}_contact`],
    };

    if (!councillor.contact) continue;

    councillors.push(councillor);
  }

  wardData[wardName] = councillors;
});

console.log(wardData);
