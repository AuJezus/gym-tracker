require("dotenv").config({ path: ".env.local" });
const fs = require("fs");
const { createClient } = require("@supabase/supabase-js");

const jsonString = fs.readFileSync("./data/data.json", "utf8");
const exersices = JSON.parse(jsonString);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PRIVATE_SUPABASE_SERVICE_ROLE
);

async function populateTableWithExercises() {
  const exersicesArr = [];

  exersices.forEach((muscleGroup) => {
    muscleGroup.muscles.forEach((muscle) => {
      muscle.exersices.forEach((exercise) => {
        exersicesArr.push({
          name: exercise.name,
          muscle: muscle.name,
          muscle_group: muscleGroup.muscleGroup,
        });
      });
    });
  });

  const { error } = await supabase.from("exercises").insert(exersicesArr);
  if (error) console.error(error);
}
populateTableWithExercises();
