import { Route, Routes, Navigate } from "react-router-dom";

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
import Onboarding from "../components/Onboarding";

// import { LandingPage } from "../components/LandingPage";
// import { AuthPage } from "../components/AuthPage";

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={< Dashboard />} />
            <Route path="/vocabulary" element={< Vocabulary />} />
            <Route path="/grammar" element={< Grammar />} />
            <Route path="/listening" element={< Listening />} />

            <Route path="/speaking" element={< Speaking />} />
            <Route path="/progress" element={< Progress />} />
            <Route path="/reading" element={< Reading />} />
            <Route path="/writing" element={< Writing />} />

            <Route path="/review" element={< Review />} />
            <Route path="/units" element={< Units />} />
            <Route path="/levels" element={< Levels />} />
            <Route path="/settings" element={< Settings />} />


            <Route path="/onboarding" element={< Onboarding />} />
            {/* 
            <Route path="/landingPage" element={< LandingPage />} />
            <Route path="/authPage" element={< AuthPage />} /> */}

            <Route path="*" element={<Navigate to={"/"} replace />} />
        </Routes>

    )

}