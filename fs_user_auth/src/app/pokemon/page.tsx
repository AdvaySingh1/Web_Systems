import PocketBase from "pocketbase";
import Card from "../lib/Card";

async function fetchCards() {
  const pb = new PocketBase("http://127.0.0.1:8090");
  // Use try-catch to handle any errors that might occur during fetch
  const records = await pb.collection("Cards").getFullList({});

  // try {
  //   // Use await to wait for the promise to resolve
  //   const records = await pb.collection("cards").getFullList({
  //     sort: "-created",
  //   });

  if (Array.isArray(records)) {
    const cards = records.map((record) => {
      return {
        id: record.id,
        name: record.Name,
        move: record.Move,
        damage: record.Damage,
        image: record.Img_Link,
      };
    });
    // const data = {
    //   Name: "test",
    //   Move: "test",
    //   Damage: 123,
    //   Img_Link: "test",
    // };
    // await pb.collection("Cards").update(cards[0].id, data);

    return cards;
  } else {
    throw new Error("Fetched data is not an array");
  }
  // } catch (error) {
  //   console.error("Error fetching cards:", error);
  //   throw error; // Rethrow error to be handled where the function is called
  // }
}

export default async function faveNUmber() {
  try {
    // `fetchCards()` should return a Promise that resolves to the cards data
    const cards = await fetchCards();
    // Once the promise resolves, it returns the JSX with the expected cards property
    if (Array.isArray(cards)) {
      // Map the cards array to JSX elements
      return cards.map((card) => (
        <Card
          title={card.name}
          imageUrl={card.image}
          move={card.move}
          damage={card.damage}
        />
      ));
    } else {
      return <p>No cards</p>;
    }
  } catch (e) {
    // If an error occurs, return the error JSX
    return <p>{`error`}</p>;
  }
}
