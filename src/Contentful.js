import { createClient } from "contentful";

export default createClient({
  space: process.env.REACT_APP_CONTENTFUL_API_SPACE,
  accessToken: process.env.REACT_APP_CONTENTFUL_API_ACCESS_TOKEN
});
