import { Route, Routes, Navigate } from "react-router-dom";

// Componentes Públicos (Tela Cheia, sem Aside)
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
            {/* 1. Rotas Públicas / Fluxo de Entrada (Sem Menu Lateral) */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/authPage" element={<AuthPage />} />
            <Route path="/onboarding" element={<Onboarding />} />

            {/* 2. Rotas Internas da Aplicação (Com Header + Sidebar) */}
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

            {/* Redirecionamento padrão para rotas inválidas */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}

/* ==========================================================================
   TODO: IMPLEMENTAR AUTENTICAÇÃO REAL & REFACTOR DE ROUTE GUARD
   --------------------------------------------------------------------------
   ESTADO ATUAL (PROVISÓRIO):
   - O controle de acesso usa apenas o estado local/localStorage `isLogin`.
   - Utilizado apenas para desenvolvimento e testes de fluxo.

   PASSOS PARA O REFACTOR DEFINITIVO:
   1. Substituir `isLogin` por um AuthContext real (Firebase, Supabase, NextAuth ou JWT/Node).
   2. Validar o token de sessão (Bearer Token) no backend em cada troca de rota protegida.
   3. Adicionar verificação de status do onboarding (`hasCompletedOnboarding`):
      - Se logado SEM onboarding -> redirecionar para '/onboarding'.
      - Se logado COM onboarding -> liberar acesso ao '/dashboard'.
   4. Tratar limpeza de sessão (logout) e expiração de token com interceptor HTTP.
   ========================================================================== */