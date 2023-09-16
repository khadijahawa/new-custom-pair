export const cleaning = {
  name: "cleaning",
  title: "Cleaning Request",
  type: "document",
  fields: [
    {
      name: "dateTime",
      title: "Date and Time",
      type: "datetime"
    },
    {
      name: "address",
      title: "Address",
      type: "string"
    },
    { name: "quantity", title: "Quantity", type: "number" },
    {
      name: "details",
      title: "Details",
      type: "string"
    }
  ]
};
