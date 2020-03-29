import React from "react";

import RoomFilter from "./RoomFilter";
import RoomList from "./RoomList";
import Loading from "./Loading";
import { useStateValue } from "../context";

const RoomContainer = () => {
  const { rooms, sortedRooms, loading } = useStateValue();

  if (loading) return <Loading />;

  return (
    <div>
      <RoomFilter rooms={rooms}></RoomFilter>
      <RoomList rooms={sortedRooms}></RoomList>
    </div>
  );
};

export default RoomContainer;
