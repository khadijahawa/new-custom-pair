export const designs = {
  name: "designs",
  title: "Designs",
  type: "document",
  fields: [
    {
      name: "image",
      title: "Image",
      type: "array",
      of: [{ type: "image" }],
      options: {
        hotspot: true
      }
    },

    {
      name: "price",
      title: "Price",
      type: "number"
    },
    {
      name: "details",
      title: "Details",
      type: "string"
    }
  ]
};
