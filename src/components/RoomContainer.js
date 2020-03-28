import React from "react";

import RoomFilter from "./RoomFilter";
import RoomList from "./RoomList";
import { useStateValue } from "../context";
import Loading from "./Loading";

const RoomContainer = () => {
  const [{ rooms, sortedRooms, loading }] = useStateValue();

  if (loading) return <Loading />;

  return (
    <div>
      <RoomFilter rooms={rooms}></RoomFilter>
      <RoomList rooms={sortedRooms}></RoomList>
    </div>
  );
};

export default RoomContainer;
