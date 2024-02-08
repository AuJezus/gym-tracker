"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

function ExerciseAddModal({ onAdd }) {
  const supabase = createClientComponentClient();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);

  const addExercise = (exercise) => {
    onAdd(exercise);
    setOpen(false);
  };

  useEffect(() => {
    async function queryData() {
      const { data, error } = await supabase
        .from("exercises")
        .select()
        .textSearch("name", query.trim().split(" ").join(" & "));

      if (error) {
        console.error(error);
        setResults([]);
      }

      console.log(data);
      setResults(data || []);
    }
    queryData();
  }, [query, supabase]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add set</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Select exercise</DialogTitle>
          <DialogDescription>
            Select the exercise you wish to add to your workout.
          </DialogDescription>
        </DialogHeader>
        <Input value={query} onChange={(e) => setQuery(e.target.value)} />
        <ScrollArea className="max-h-96 rounded-md border">
          <div className="divide-y-2">
            {results.map((exercise) => (
              <div
                key={exercise.id}
                onClick={() => addExercise(exercise)}
                className="flex cursor-pointer p-2 hover:bg-accent"
              >
                {exercise.name}
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

export default ExerciseAddModal;
