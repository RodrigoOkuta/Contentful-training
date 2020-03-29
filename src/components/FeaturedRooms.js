import React from "react";

import Loading from "./Loading";
import Room from "./Room";
import Title from "./Title";
import { useStateValue } from "../context";

const FeaturedRooms = () => {
  const { featuredRooms: rooms, loading } = useStateValue();

  if (loading) return <Loading />;

  const getRooms = () => rooms.map(room => <Room key={room.id} room={room} />);

  return (
    <section className="featured-rooms">
      <Title title="featured rooms" />
      <div className="featured-rooms-center">{getRooms()}</div>
    </section>
  );
};

export default FeaturedRooms;
