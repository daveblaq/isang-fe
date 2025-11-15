import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import DashLayout from "@/components/layouts/sidebar-layout";
import CreatorSpace from "@/pages/CreatorSpace";
import Home from "@/pages/Home";
import Settings from "@/pages/Settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <DashLayout>
              <Home />
            </DashLayout>
          }
        />
        <Route
          path="/creator-space"
          element={
            <DashLayout title="Creator Space">
              <CreatorSpace />
            </DashLayout>
          }
        />
        <Route
          path="/settings"
          element={
            <DashLayout title="Settings">
              <Settings />
            </DashLayout>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
