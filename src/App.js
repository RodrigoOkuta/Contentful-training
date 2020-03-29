import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import { StateProvider } from "./context";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import SingleRoom from "./pages/SingleRoom";
import Error from "./pages/Error";
import "./App.css";
import Loading from "./components/Loading";
import items from "./data";

class App extends Component {
  state = {
    rooms: [],
    sortedRooms: [],
    featuredRooms: [],
    loading: true,
    type: "all",
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    breakfast: false,
    pets: false
  };

  componentDidMount() {
    const rooms = this.formatData(items);
    const featuredRooms = rooms.filter(room => room.featured);
    const maxPrice = Math.max(...rooms.map(room => room.price));
    const maxSize = Math.max(...rooms.map(room => room.size));

    this.setState({
      rooms,
      featuredRooms,
      sortedRooms: rooms,
      loading: false,
      price: maxPrice,
      maxPrice,
      maxSize
    });
  }

  formatData = items => {
    let tempItems = items.map(item => {
      let id = item.sys.id;
      let images = item.fields.images.map(image => image.fields.file.url);

      let room = { ...item.fields, id, images };
      return room;
    });

    return tempItems;
  };

  getRoomBySlug = slug => {
    const { rooms } = this.state;
    return rooms.find(room => room.slug === slug);
  };

  handleChange = event => {
    const {
      target: { checked, value, name, type }
    } = event;
    const changeValue = type === "checkbox" ? checked : value;

    this.setState({ [name]: changeValue }, this.filterRooms);
  };

  filterRooms = () => {
    const {
      rooms,
      type,
      capacity,
      price,
      minSize,
      maxSize,
      breakfast,
      pets
    } = this.state;

    let tempRooms = [...rooms];
    if (type !== "all")
      tempRooms = tempRooms.filter(room => room.type === type);

    const selectedCapacity = parseInt(capacity);

    if (selectedCapacity !== 1)
      tempRooms = tempRooms.filter(room => room.capacity >= selectedCapacity);

    const selectedPrice = parseInt(price);
    if (selectedPrice > 0)
      tempRooms = tempRooms.filter(room => room.price <= selectedPrice);

    tempRooms = tempRooms.filter(
      room => room.size >= parseInt(minSize) && room.size <= parseInt(maxSize)
    );

    breakfast &&
      (tempRooms = tempRooms.filter(room => room.breakfast === breakfast));

    pets && (tempRooms = tempRooms.filter(room => room.pets === pets));

    this.setState({ sortedRooms: tempRooms });
  };

  render() {
    const { loading } = this.state;
    if (loading) return <Loading />;

    const helpers = {
      getRoomBySlug: this.getRoomBySlug,
      handleChange: this.handleChange
    };

    return (
      <StateProvider initialState={{ ...this.state, ...helpers }}>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/rooms" component={Rooms} />
          <Route exact path="/rooms/:slug" component={SingleRoom} />
          <Route component={Error} />
        </Switch>
      </StateProvider>
    );
  }
}

export default App;
