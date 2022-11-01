import React from "react";
import logo from "./logo.svg";
import "./App.css";
import ItemList from "./components/ItemList";
import Main from "./components/Main";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import NewClientForm from "./components/NewClientForm";

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Main />} />
          <Route path="/items" element={<ItemList />}></Route>
          <Route path="/new" element={<NewClientForm />}></Route>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
