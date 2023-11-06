import { Outlet } from "react-router-dom";
import Sidebar from './Components/Sidebar'
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

export const Layout = () => {
  const queryConfig = {
    suspense: true,
    staleTime: 5 * 60 * 1000,
  };

  const queryClient = new QueryClient({ suspense: true });
  return (
    <>
      <Sidebar/> 

      <main>
        <QueryClientProvider client={queryClient} config={queryConfig}>
          <Outlet />
          <ReactQueryDevtools />
        </QueryClientProvider>
      </main>
    </>
  );
};

export default Layout;