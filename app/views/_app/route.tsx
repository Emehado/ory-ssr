import { Link, Outlet, redirect } from "react-router";
import { ory } from "~/api/ory";
import type { Session } from "@ory/client-fetch";

interface LoaderData {
  session: Session;
  logout_url: string;
}

export async function loader({ request }: { request: Request }) {
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
    // Create a login flow and redirect to custom login page
    const { id } = await ory.createBrowserLoginFlow({
      returnTo: `${import.meta.env.VITE_APP_URL}/`,
    });
    throw redirect(`/login?flow=${id}`);
  } catch (error) {
    // Create a login flow and redirect to custom login page
    try {
      const { id } = await ory.createBrowserLoginFlow({
        returnTo: `${import.meta.env.VITE_APP_URL}/`,
      });
      throw redirect(`/login?flow=${id}`);
    } catch (flowError) {
      // If flow creation fails, redirect to login without flow
      throw redirect("/login");
    }
  }
}

const App = ({ loaderData }: { loaderData: LoaderData }) => {
  const userEmail = loaderData?.session?.identity?.traits?.email || "User";
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex">
              <div className="flex flex-shrink-0 items-center">
                <h1 className="text-xl font-semibold text-gray-900">My App</h1>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  to="/"
                  className="inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-sm font-medium text-gray-900"
                >
                  Dashboard
                </Link>
                <Link
                  to="/settings"
                  className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                >
                  Settings
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Welcome, {userEmail}</span>
              <Link
                to={loaderData?.logout_url}
                className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Sign out
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          {/* Welcome Section */}
          <div className="overflow-hidden rounded-lg bg-white shadow">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Welcome to your dashboard!
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                You're successfully authenticated with Ory. This is a protected area of the application.
              </p>
              
              <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {/* Stats Card 1 */}
                <div className="overflow-hidden rounded-lg bg-gray-50 px-4 py-5 shadow sm:p-6">
                  <dt className="truncate text-sm font-medium text-gray-500">
                    Account Status
                  </dt>
                  <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                    Active
                  </dd>
                </div>
                
                {/* Stats Card 2 */}
                <div className="overflow-hidden rounded-lg bg-gray-50 px-4 py-5 shadow sm:p-6">
                  <dt className="truncate text-sm font-medium text-gray-500">
                    Authentication Method
                  </dt>
                  <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                    Ory
                  </dd>
                </div>
                
                {/* Stats Card 3 */}
                <div className="overflow-hidden rounded-lg bg-gray-50 px-4 py-5 shadow sm:p-6">
                  <dt className="truncate text-sm font-medium text-gray-500">
                    Session Active
                  </dt>
                  <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                    Yes
                  </dd>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Quick Actions</h3>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm hover:border-gray-400">
                <div>
                  <div className="text-lg font-medium text-gray-900">Update Profile</div>
                  <p className="mt-1 text-sm text-gray-500">
                    Change your personal information and preferences
                  </p>
                </div>
              </div>
              
              <div className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm hover:border-gray-400">
                <div>
                  <div className="text-lg font-medium text-gray-900">Security Settings</div>
                  <p className="mt-1 text-sm text-gray-500">
                    Manage your password and security options
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Outlet for child routes */}
        <Outlet />
      </main>
    </div>
  );
};

export default App;
