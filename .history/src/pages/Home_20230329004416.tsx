import React, { useEffect, useState } from "react";

interface IDogsPics {
  message: string[];
  status: string;
}

const onlyUniqueBreeds = (pics: string[]) => {
  const uniqueBreeds: string[] = [];
  const uniquePics = pics.filter((pic) => {
    const breed = pic.split("/")[4];
    if (uniqueBreeds.includes(breed)) {
      uniqueBreeds.push(breed);
      return true;
    }
  });
};

function Home() {
  const [dogs, setDogs] = useState<any>([]);

  const getDogs = async (controller: AbortController) => {
    try {
      const res = await fetch("https://dog.ceo/api/breeds/image/random/50", {
        signal: controller.signal,
      });
      const data: IDogsPics = await res.json();
      const uniquePics = onlyUniqueBreeds(data.message);
      setDogs(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    getDogs(controller);

    //! Clean-up
    return () => controller.abort();
  }, []);

  return (
    <div>
      {/* {dogs.map((dog: string) => (
        <h4>{dog}</h4>
      ))} */}
    </div>
  );
}

export default Home;
