import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { GameProvider } from "./contexts/GameContext";
import SplashScreen from "./pages/SplashScreen";
import MainMenu from "./pages/MainMenu";
import NameEntry from "./pages/NameEntry";
import ShipSelection from "./pages/ShipSelection";
import Settings from "./pages/Settings";
import SectorSelection from "./pages/SectorSelection";
import BeforeMission from "./pages/BeforeMission";
import MissionSelect from "./pages/MissionSelect";
import Mission from "./pages/Mission";
import Report from "./pages/Report";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <GameProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SplashScreen />} />
            <Route path="/menu" element={<MainMenu />} />
            <Route path="/name-entry" element={<NameEntry />} />
            <Route path="/ship-selection" element={<ShipSelection />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/sector-selection" element={<SectorSelection />} />
            <Route path="/before-mission" element={<BeforeMission />} />
            <Route path="/mission-select" element={<MissionSelect />} />
            <Route path="/mission" element={<Mission />} />
            <Route path="/report" element={<Report />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </GameProvider>
  </QueryClientProvider>
);

export default App;
