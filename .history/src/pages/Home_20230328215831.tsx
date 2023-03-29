import React, { useEffect, useState } from 'react'

function Home() {
    const [dogs, setDogs] = useState<any>([]);

    const getDogs = async (controller: AbortController) => {
        try {
            const res = await fetch("https://dog.ceo/api/breeds/image/random/4", {signal: controller.signal});
            const data = await res.json();
            setDogs(data.message);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const controller = new AbortController();
        getDogs(controller);
        return () => controller.abort();
    }, [])

  return (
    <div>
        {dogs.map((dog: string) => (
            <h4>{dog}</h4>
        ))}
    </div>
  )
}

export default Home