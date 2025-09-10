import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TaskPage from "./pages/TaskPage";
import PrivateRoute from "./routes/ PrivateRoute";
import Welcome from "./pages/Welcome";
import Navbar from "./components/Navbar";
import { ROUTES } from "./routes/Route";
import NotFoundPage from "./pages/NotFoundPage";
import Footer from "./components/Footer";
import { ModalProvider } from "./context/ModalProvider";
import TaskCalendar from "./pages/TaskCalender";
import Analytics from "./pages/Analytics";
function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-900 dark:to-purple-900">
      {/* Background Effects */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        aria-hidden="true"
      >
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-400/10 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>
      <Router>
        <ModalProvider>
          <Navbar />
          <div className="pt-20">
            <Routes>
              <Route path={ROUTES.HOME} element={<Welcome />} />
              <Route element={<PrivateRoute />}>
                <Route path={ROUTES.TASKS} element={<TaskPage />} />
                <Route path={ROUTES.CALENDER} element={<TaskCalendar/>} />
                <Route path={ROUTES.ANALYTICS} element={<Analytics/>}
                />
                <Route
                  path={ROUTES.SETTINGS}
                  element={<div>Settings Page</div>}
                />
              </Route>
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
          <Footer />
        </ModalProvider>
      </Router>
    </div>
  );
}

export default App;
