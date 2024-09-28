import rawData from "./councillors.json" assert { type: "json" };

const result = rawData.features.reduce((wardData, feature) => {
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

  return wardData;
}, {});

console.log(result);
