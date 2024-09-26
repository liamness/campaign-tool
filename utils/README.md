Data fetched using Hackney Council API.

URL used: https://map2.hackney.gov.uk/geoserver/government/ows?service=WFS&version=1.0.0&request=GetFeature&outputFormat=json&typeName=government:councillor&propertyName=councillor1_name,councillor1_party,councillor1_contact,councillor2_name,councillor2_party,councillor2_contact,councillor3_name,councillor3_party,councillor3_contact,ward_name

To update, save the result of a browser GET request to the above URL in `utils/councillors.json`, then do `npm run process-councillors`. Save the output of this command in `src/councillors.ts`.
