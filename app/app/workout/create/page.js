"use client";

import ExerciseAddModal from "@/components/exercise-add-modal";
import { Input } from "@/components/ui/input";
import { useState } from "react";

function WorkoutCreatePage() {
  const [sets, setSets] = useState([]);

  const addNewSet = (exercise) => {
    setSets((sets) => [...sets, { exercise, reps: 0, weight: 0 }]);
  };

  const copyLastSet = () => {
    setSets((sets) => [...sets, sets.at(-1)]);
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

  return (
    <>
      <div className="divide-y-2">
        {sets.map((set, index) => (
          <div
            className="grid w-1/2 grid-cols-3 justify-around gap-4 py-2"
            key={index}
          >
            <p>{set.exercise.name}</p>
            <div className="flex items-center gap-2">
              <p>Reps: </p>
              <Input
                value={set.reps}
                onChange={(e) => setReps(index, e.target.value)}
                type="number"
              />
            </div>
            <div className="flex items-center gap-2">
              <p>Weight: </p>
              <Input
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
      </div>
      <ExerciseAddModal onAdd={addNewSet} />
    </>
  );
}

export default WorkoutCreatePage;
