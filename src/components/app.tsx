import { App, SnackbarProvider, ZMPRouter } from "zmp-ui";
import Layout from "./layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function InsuranceApp() {
  return (
    <QueryClientProvider client={queryClient}>
      <App>
        <SnackbarProvider>
          <ZMPRouter>
            <Layout />
          </ZMPRouter>
        </SnackbarProvider>
      </App>
    </QueryClientProvider>
  );
}

export default InsuranceApp;
