import { UserComponent } from "./components/UserList";

export default function App() {
  return (
    <div className="min-h-dvh bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 overflow-x-hidden overscroll-none">
      {/* Optional background effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-gray-800/20 via-transparent to-transparent pointer-events-none"></div>

      {/* Main content */}
      <div className="relative z-10">
        <UserComponent />
      </div>
    </div>
  );
}
