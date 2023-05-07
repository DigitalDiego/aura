import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ClerkProvider } from "@clerk/clerk-react";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Router>
    <QueryClientProvider client={queryClient}>
      <ClerkProvider
        publishableKey={import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY}
      >
        <App />
      </ClerkProvider>
    </QueryClientProvider>
  </Router>
);
