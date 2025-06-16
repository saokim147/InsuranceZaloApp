import { App, SnackbarProvider, ZMPRouter } from "zmp-ui";
import Layout from "./layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

function InsuranceApp() {
  return (
    <QueryClientProvider client={queryClient}>
      <App>
        <SnackbarProvider>
          <ZMPRouter>
            <Layout />
            <Toaster
              position="top-left"
              mobileOffset={{ top: "16px" }}
              duration={3000}
            />
          </ZMPRouter>
        </SnackbarProvider>
      </App>
    </QueryClientProvider>
  );
}

export default InsuranceApp;
