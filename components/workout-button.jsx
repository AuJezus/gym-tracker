"use client";

import { startWorkout } from "@/lib/workout";
import { Button } from "./ui/button";

function WorkoutButton({ workoutId, children }) {
  return (
    <Button onClick={() => startWorkout(workoutId)} variant="outline">
      {children}
    </Button>
  );
}

export default WorkoutButton;
