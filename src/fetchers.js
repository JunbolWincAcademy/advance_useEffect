const delay = () =>
  new Promise((resolve, reject) => {
    setTimeout(resolve, 1000 - Math.random() * 500);
  });

export const fetchPeople = async () => {
  await delay();
  return [
    {
      id: 1,
      name: "John",
    },
    {
      id: 2,
      name: "Jane",
    },
    {
      id: 3,
      name: "Bob",
    },
    {
      id: 4,
      name: "Alice",
    },
  ];
};

export const fetchPerson = async (id) => {
  await delay();
  return id
    ? [
        {
          id: 1,
          name: "John",
          age: 42,
          hobbies: ["Witchcraft", "Magick", "Tarot"],
        },
        {
          id: 2,
          name: "Jane",
          age: 74,
          hobbies: ["Bungy Jumping", "Knitting"],
        },
        {
          id: 3,
          name: "Bob",
          age: 18,
          hobbies: ["Cow herding", "Training dogs"],
        },
        {
          id: 4,
          name: "Alice",
          age: 28,
          hobbies: ["Gardening", "Playing the Banjo"],
        },
      ].find((p) => p.id === id)
    : null;
};
