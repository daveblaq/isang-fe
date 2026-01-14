import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import DashLayout from "@/components/layouts/sidebar-layout";
import CreatorSpace from "@/pages/CreatorSpace";
import Home from "@/pages/Home";
import Settings from "@/pages/Settings";
import Auth from "@/pages/Auth";
import Notifications from "@/pages/Notifications";
import Favorites from "@/pages/Favorites";
import Inspiration from "@/pages/Inspiration";
import TripChat from "@/pages/TripChat";
import AuthLayout from "./components/layouts/auth-layout";

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
          path="/auth"
          element={
            <AuthLayout title="Welcome to Your Work Buddy">
              <Auth />
            </AuthLayout>
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
        <Route
          path="/notification"
          element={
            <DashLayout title="Notifications">
              <Notifications />
            </DashLayout>
          }
        />
        <Route
          path="/favorites"
          element={
            <DashLayout title="Favorites">
              <Favorites />
            </DashLayout>
          }
        />
        <Route
          path="/inspiration"
          element={
            <DashLayout title="Inspiration">
              <Inspiration />
            </DashLayout>
          }
        />
        <Route
          path="/chat"
          element={<TripChat />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
