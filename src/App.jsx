import { useEffect, useState } from 'react';
import { Heading, Flex, Button } from '@chakra-ui/react';
import { fetchPeople, fetchPerson } from './fetchers';

export const App = () => {
  const [people, setPeople] = useState([]);
  const [person, setPerson] = useState(null);
  const [id, setId] = useState(null);

  //-----fetchDataPeopple useEffect hook

  useEffect(() => {
    const fetchDataPeople = async () => {
      try {
        const result = await fetchPeople();
        setPeople(result);
      } catch (error) {
        console.error('Failed to fetch people:', error);
      }
    };

    fetchDataPeople();
  }, []); // 🚩 Dependency array is correctly empty to run once on mount


    //-----fetchDataPerson useEffect hook
  useEffect(() => {
    // 🚩 Check if 'id' before fetching to avoid unnecessary calls
    if (id) {
      const fetchDataPerson = async () => {
        try {
          const result = await fetchPerson(id);
          setPerson(result);
        } catch (error) {
          console.error('Failed to fetch person:', error);
        }
      };

      fetchDataPerson();
      return () => {
        console.log("cleaning up the person effect");
        setPerson(null);
      };
    }
  }, [id]); // 🚩 'id' in dependency array to fetch person data when 'id' changes
  
  // no dependency list, runs each time the component is rendered.
  useEffect(() => {
    console.log("rendering...");
  });

  return (
    <>
      <Flex flexDir="column">
        <div className="App">
          <Heading>React Hooks Exercise Starter</Heading>
        </div>
        {/* 🚩 Render buttons for each person from fetched data */}
        {people.map((person) => (
          <Button key={person.id} onClick={() => setId(person.id)}>
            {person.name}
          </Button>
        ))}
        <div>
          {/*🚩optional chaining conditional was used in the rendering of
           each person property ({person?.name}, {person?.age}, {person?.hobbies}) 
           to ensure that attempts to access properties on person do not cause errors
            if person is null or undefined. This is particularly useful for accessing 
            nested properties where a parent may not exist.Optional chaining is used 
            to safely access properties of an object that might not yet be initialized,
             preventing errors if the object is null or undefined.*/}
          <h2>{person ? person.name : 'Select a person'}</h2>
          <p>{person ? person.age : ''}</p>
          <p>{person ? person.hobbies.join(", ") : ''}</p>{/*🚩check the use of join()*/}
        </div>
      </Flex>
    </>
  );
};
