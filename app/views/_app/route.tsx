import { Link, Outlet, redirect, type Session } from "react-router";
import { ory, ory_self_service_url } from "~/api/ory";

interface LoaderData {
  session: Session;
  logout_url: string;
}

export async function loader({ request }: { request: Request }) {
  console.log(process.env.VITE_APP_URL);
  try {
    const cookie = request?.headers.get("cookie");
    if (cookie) {
      const session = await ory.toSession({ cookie: cookie });

      if (session) {
        // Create a logout flow
        const { logout_url } = await ory.createBrowserLogoutFlow({
          cookie: cookie || "",
        });

        return {
          session,
          logout_url,
        };
      }
    }
    throw redirect(
      `${ory_self_service_url}login?return_to=${process.env.VITE_APP_URL}`
    );
  } catch (error) {
    throw redirect(
      `${ory_self_service_url}login?return_to=${process.env.VITE_APP_URL}`
    );
  }
}

const App = ({ loaderData }: { loaderData: LoaderData }) => {
  return (
    <div>
      App Dashboard.
      <Link to={`${loaderData?.logout_url}`}>Logout</Link>
      <Outlet />
    </div>
  );
};

export default App;
