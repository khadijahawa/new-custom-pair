export const product = {
  name: "product",
  title: "Product",
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
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 90
      }
    },
    {
      name: "name",
      title: "Name",
      type: "string"
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
    },
    {
      name: "brand",
      title: "Brand",
      type: "string"
    }
  ]
};
