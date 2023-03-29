export const onlyUniqueBreeds = (pics: string[]) => {
    const uniqueBreeds: string[] = [];
    const uniquePics = pics.filter((pic) => {
      const breed = pic.split("/")[4];
      if (!uniqueBreeds.includes(breed) && !pic.includes(" ")) {
        uniqueBreeds.push(breed);
        return true;
      }
    });
    return uniquePics.slice(0, Math.floor(uniquePics.length/4) * 16);
  };