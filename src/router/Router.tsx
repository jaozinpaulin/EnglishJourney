import { Route, Routes, Navigate } from "react-router-dom";

// Componentes Públicos
import { LandingPage } from "../components/LandingPage";
import Onboarding from "../components/Onboarding";
import { AuthPage } from "../components/AuthPage";

// Layout com Sidebar e Header
import Layout from "../components/Layout";

// Páginas Internas da Plataforma
import Dashboard from "../pages/Dashboard";
import Vocabulary from "../pages/Vocabulary";
import Grammar from "../pages/Grammar";
import Listening from "../pages/Listening";
import Speaking from "../pages/Speaking";
import Progress from "../pages/Progress";
import Reading from "../pages/Reading";
import Writing from "../pages/Writing";
import Review from "../pages/Review";
import Units from "../pages/Units";
import Levels from "../pages/Levels";
import Settings from "../pages/settings";

export default function Router() {
    return (
        <Routes>

            <Route path="/" element={<LandingPage />} />
            <Route path="/authPage" element={<AuthPage />} />
            <Route path="/onboarding" element={<Onboarding />} />

            <Route element={<Layout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/vocabulary" element={<Vocabulary />} />
                <Route path="/grammar" element={<Grammar />} />
                <Route path="/listening" element={<Listening />} />
                <Route path="/speaking" element={<Speaking />} />
                <Route path="/reading" element={<Reading />} />
                <Route path="/writing" element={<Writing />} />
                <Route path="/review" element={<Review />} />
                <Route path="/progress" element={<Progress />} />
                <Route path="/units" element={<Units />} />
                <Route path="/levels" element={<Levels />} />
                <Route path="/settings" element={<Settings />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}