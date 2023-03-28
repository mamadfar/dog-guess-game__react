import React, { useEffect, useState } from 'react'

function Home() {
    const [dogs, setDogs] = useState<any>([]);

    const getDogs = async () => {
        try {
            const res = await fetch("https://dog.ceo/api/breeds/image/random/4");
            const data = await res.json();
            setDogs(data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getDogs();
    }, [])

  return (
    <div>Home</div>
  )
}

export default Home