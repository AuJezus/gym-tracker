import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function HomePage() {
  const supabase = createServerComponentClient({ cookies });
  const { data: workouts, error } = await supabase.from("workouts").select();

  if (error) return <p>There was an error: {error}</p>;

  return (
    <div>
      {workouts.map((workout) => (
        <div key={workout.id}>{workout.name}</div>
      ))}
    </div>
  );
}
