import { type SchemaTypeDefinition } from "sanity";
import { product } from "./schemas/product";
import { designs } from "./schemas/designs";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, designs],
};
