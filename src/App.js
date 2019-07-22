import React, { Component } from "react";
import "./App.css";
import Layout from "./presentation/Layout"
import InvoiceList from "./containers/InvoiceList";

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <Layout></Layout> */}
        <InvoiceList></InvoiceList>
      </div>
    );
  }
}
export default App;
