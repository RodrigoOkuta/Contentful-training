import React from "react";
import { useStateValue } from "../context";
import Loading from "./Loading";

const FeaturedRooms = () => {
  const [{ featuredRooms }, dispatch] = useStateValue();

  return <div>hello from featured rooms</div>;
};

export default FeaturedRooms;
