import React from "react";
import { createRoot } from "react-dom/client";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./index.css";
import { ToastProvider } from "commons/util/useToast";

import Website from "Website/Website";
import Home from "Website/Home";
import HowToPlay from "Website/HowToPlay";
import Archive from "Website/Archive";

import Page404 from "Page404";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  // <React.StrictMode>
  <ToastProvider>
    <BrowserRouter basename="/Recitle">
      <Routes>
        <Route path="/" element={<Website />}>
          <Route index element={<Home />} />
          <Route path="help" element={<HowToPlay />} />
          <Route path="archive" element={<Archive />} />
        </Route>

        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  </ToastProvider>
  // </React.StrictMode>
);
