import AppErrorBoundary from "../components/ui/AppErrorBoundry";
import PwaUpdatePrompt from "../components/ui/PwaUpdatePrompt";
import { ThemeProvider } from "../context/ThemeContext";
import { UIProvider } from "../context/UIContext";

export default function Providers({ children }) {
  return (
    <ThemeProvider>
      <UIProvider>
        <AppErrorBoundary>
          {children}
          <PwaUpdatePrompt />
        </AppErrorBoundary>
      </UIProvider>
    </ThemeProvider>
  );
}
