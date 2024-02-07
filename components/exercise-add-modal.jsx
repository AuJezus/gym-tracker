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
    <Dialog>
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
        <ScrollArea className="max-h-64 rounded-md border">
          {results.map((exercise) => (
            <div key={exercise.id}>{exercise.name}</div>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

export default ExerciseAddModal;
