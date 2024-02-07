import Link from "next/link";

function AppLayout({ children }) {
  return (
    <>
      <nav className="py-2">
        <ul className="flex justify-center">
          <li>
            <Link href="app/workout/create">Create Workout</Link>
          </li>
        </ul>
      </nav>
      <main>{children}</main>
    </>
  );
}

export default AppLayout;
