import { IInitialState } from "../model/main.model";

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

  export const generateQuestion = (draft: IInitialState) => {
    if(draft.bigCollection.length <= 12) {
      draft.fetchCount++;
    }
    if(draft.currentQuestion) {
      draft.bigCollection = draft.bigCollection.slice(4, draft.bigCollection.length);
    }
  
    const tempRandom = Math.floor(Math.random() * 4);
    const justFour = draft.bigCollection.slice(0, 4);
    return {breed: justFour[tempRandom].split("/")[4], photos: justFour, answer: tempRandom}
  }