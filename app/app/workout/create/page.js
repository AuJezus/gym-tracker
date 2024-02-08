"use client";

import ExerciseAddModal from "@/components/exercise-add-modal";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import { useRouter } from "next/navigation";

function WorkoutCreatePage() {
  const [sets, setSets] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const disableSave = isSaving || sets.length < 1 || !name;

  const router = useRouter();

  const addNewSet = (exercise) => {
    setSets((sets) => [...sets, { exercise, reps: "0", weight: "0" }]);
  };

  const copyLastSet = () => {
    setSets((sets) => [...sets, { ...sets.at(-1) }]);
  };

  const setReps = (index, amount) => {
    amount = Number(amount);
    if (amount === NaN) console.error(`NaN reps value: index: ${index}`);

    setSets((sets) => {
      const newSets = [...sets];
      newSets[index].reps = amount.toString();
      return newSets;
    });
  };

  const setWeight = (index, amount) => {
    amount = Number(amount);
    if (amount === NaN) console.error(`NaN weight value: index: ${index}`);

    setSets((sets) => {
      const newSets = [...sets];
      newSets[index].weight = amount.toString();
      return newSets;
    });
  };

  const saveWorkout = async () => {
    setIsSaving(true);
    const supabase = createClientComponentClient();

    const workout = {
      name,
      description,
    };

    const { data: workoutData, error: workoutErr } = await supabase
      .from("workouts")
      .insert(workout)
      .select()
      .limit(1)
      .single();
    if (workoutErr) {
      console.error(workoutErr);
      return;
    }

    const workoutSets = sets.map((set) => ({
      workout_id: workoutData.id,
      exercise_id: set.exercise.id,
      reps: Number(set.reps),
      weight: Number(set.weight),
    }));

    const { error: setsError } = await supabase
      .from("workout-sets")
      .insert(workoutSets);
    if (setsError) {
      console.error(setsError);
      return;
    }

    setIsSaving(false);
    router.push("/app");
  };

  return (
    <>
      <div className="flex items-center gap-4">
        <Label>Name: </Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-4">
        <Label>Description: </Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="divide-y-2">
        {sets.map((set, index) => (
          <div
            className="grid w-1/2 grid-cols-3 items-center justify-around gap-4 py-2"
            key={index}
          >
            <p>{set.exercise.name}</p>
            <div className="flex items-center gap-2">
              <Label htmlFor={`reps-${index}`}>Reps: </Label>
              <Input
                id={`reps-${index}`}
                value={set.reps}
                onChange={(e) => setReps(index, e.target.value)}
                type="number"
              />
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor={`weight-${index}`}>Weight: </Label>
              <Input
                id={`weight-${index}`}
                value={set.weight}
                onChange={(e) => setWeight(index, e.target.value)}
                type="number"
              />
            </div>
          </div>
        ))}
        {sets.length > 0 && (
          <button onClick={copyLastSet} className="mb-2 border px-2">
            +
          </button>
        )}
        <ExerciseAddModal onAdd={addNewSet} />
      </div>
      <Button disabled={disableSave} onClick={saveWorkout} type="submit">
        Save
      </Button>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="destructive">Cancel</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
          </DialogHeader>
          <Link
            href="/app"
            className={buttonVariants({ variant: "destructive" })}
          >
            Absolutely!
          </Link>
          <Button variant="outline">Stay here</Button>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default WorkoutCreatePage;
