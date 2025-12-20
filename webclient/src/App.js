import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Landing from "./Screens/Landing";


const App = () => {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
    </Container>
  )
}

export default App

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
