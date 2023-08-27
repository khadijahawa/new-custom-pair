import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

import { apiVersion, dataset, projectId, useCdn } from "../env";
import { StaticImageData } from "next/image";

export const client = createClient({
  apiVersion: "2023-08-25",
  dataset,
  projectId: "22zoeqvn",
  useCdn,
  token:
    "skCKE3PEimkUGUMQZGw3ZU9FVPnYxBqDzMRAuACPmGx5ZOVwn82LiK0pzkOK4EMZC3HHldWuOzbRQ9xwKe0OrSHHRvWeifvpa0SNvBhooxR1zIfYpBRnz73bQ94dfOoO0dF9lcPchP0O5BPnWgli94rM88GOTf6V8FjWpJRHNIsFeehahmTJ"
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
