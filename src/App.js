import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";

import { StateProvider } from "./context";
import items from "./data";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import SingleRoom from "./pages/SingleRoom";
import Error from "./pages/Error";
import "./App.css";
import Loading from "./components/Loading";

const App = () => {
  const [rooms, setRooms] = useState([]);
  const [sortedRooms, setSortedRooms] = useState([]);
  const [featuredRooms, setFeaturedRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let rooms = formatData(items);
    setRooms(rooms);
    setSortedRooms(rooms);
    let featuredRooms = rooms.filter(room => room.featured);
    setFeaturedRooms(featuredRooms);
    setLoading(false);
  }, []);

  const formatData = items => {
    let tempItems = items.map(item => {
      let id = item.sys.id;
      let images = item.fields.images.map(image => image.fields.file.url);

      let room = { ...item.fields, id, images };
      return room;
    });

    return tempItems;
  };

  const getRoomBySlug = slug => {
    return rooms.find(room => room.slug === slug);
  };

  const reducer = (state, action) => {
    switch (action.type) {
      default:
        return state;
    }
  };

  if (loading) return <Loading />;

  return (
    <StateProvider
      initialState={{
        rooms,
        sortedRooms,
        featuredRooms,
        loading,
        getRoomBySlug: getRoomBySlug
      }}
      reducer={reducer}
    >
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/rooms" component={Rooms} />
        <Route exact path="/rooms/:slug" component={SingleRoom} />
        <Route component={Error} />
      </Switch>
    </StateProvider>
  );
};

export default App;
