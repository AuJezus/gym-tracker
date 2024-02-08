import { Button } from "@/components/ui/button";
import WorkoutButton from "@/components/workout-button";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function HomePage() {
  const supabase = createServerComponentClient({ cookies });
  const { data: workouts, error } = await supabase.from("workout-templates").select();

  if (error) return <p>There was an error: {error}</p>;

  return (
    <div className="ml-4 flex flex-col items-start gap-4">
      {workouts.map((workout) => (
        <WorkoutButton workoutId={workout.id} key={workout.id}>
          {workout.name}
        </WorkoutButton>
      ))}
    </div>
  );
}
