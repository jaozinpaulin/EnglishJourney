// @ts-nocheck

import { Route, Routes } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Vocabulary from "../pages/Vocabulary";

import Grammar from "../pages/Grammar";
import Listening from "../pages/Listening";

import Speaking from "../pages/Speaking";
import Progress from "../pages/Progress";


export default function Router() {
    return (
        <Routes>
            <Route path="/" element={< Dashboard />} />
            <Route path="/vocabulary" element={< Vocabulary />} />

            <Route path="/grammar" element={< Grammar />} />
            <Route path="/listening" element={< Listening />} />

            <Route path="/speaking" element={< Speaking />} />
            <Route path="/progress" element={< Progress />} />
        </Routes>

    )


}
