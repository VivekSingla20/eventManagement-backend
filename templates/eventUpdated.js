module.exports = (eventName, updatedFields) => `
  <h1>Event Updated Successfully</h1>
  <p>The event '${eventName}' has been updated. Here are the changes:</p>
  <ul>
    ${updatedFields.map((field) => `<li>${field}</li>`).join("")}
  </ul>
`;
