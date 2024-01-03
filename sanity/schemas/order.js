export const order = {
  name: "order",
  title: "Order",
  type: "document",
  fields: [
    {
      name: "brand",
      title: "Brand",
      type: "string",
      options: {
        list: [
          { title: "Adidas", value: "adidas" },
          { title: "Nike", value: "nike" },
          { title: "Treec", value: "treec" }
        ]
      },
      validation: (Rule) => Rule.required()
    },
    {
      name: "product",
      title: "Product",
      type: "reference",
      to: [{ type: "product" }],
      validation: (Rule) => Rule.required()
    },
    {
      name: "quantity",
      title: "Quantity",
      type: "number",
      validation: (Rule) =>
        Rule.required().min((value, { parent }) =>
          parent.brand === "nike"
            ? 5
            : parent.brand === "adidas"
            ? 5
            : parent.brand === "treec"
            ? 15
            : 1
        )
    },
    {
      name: "selectedSize",
      title: "Selected Size",
      type: "number"
    },
    // {
    //   name: "selectedColors",
    //   title: "Selected Colors",
    //   type: "array",
    //   of: [{ type: "string" }]
    // },
    {
      name: "customData",
      title: "Custom Data",
      type: "object",
      fields: [
        {
          name: "nikeColorCode",
          title: "Nike Color Code",
          type: "string",
          hidden: ({ parent }) => parent.brand !== "nike"
        },
        {
          name: "treecColorCodes",
          title: "Treec Color Codes",
          type: "array",
          of: [{ type: "string" }]
          // validation: ({ parent }) =>
          //   parent.brand === "treec"
          //     ? (Rule) => Rule.required().min(6).max(6)
          //     : Rule.optional(),
          // hidden: ({ parent }) => parent.brand !== "treec"
        },
        {
          name: "notes",
          title: "Notes",
          type: "text"
        }
      ]
    }
  ]
};
