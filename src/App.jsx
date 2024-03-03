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
  

/* The decision not to include a cleanup function in the fetchDataPeople useEffect is based on the specific purpose and behavior of that effect compared to the fetchDataPerson effect. The fetchDataPeople effect is designed to fetch an initial list of people only once when the component mounts and does not require cleanup cleanup for several reasons:

 One-time Fetch: This effect fetches the initial list of people and is intended to run only
    once because of the empty dependency array []. There's no subsequent data fetching that might
    require the previous state to be cleared or reset.

No Temporary State: Unlike fetching details for a specific person, where you might want to clear 
out the displayed person's information while new data is loading, fetching the list of people doesn't 
involve displaying temporary or transitional state that needs to be reset.

Static Data: The list of people is typically static data that doesn't change frequently. Once fetched,
 there's no immediate need to reset or update this data until the component is re-mounted, which would
  naturally trigger a re-fetch anyway.

No Dynamic Dependencies: Since the effect doesn't depend on any state or props that change over time 
(e.g., a selected id), there's no scenario where fetching would be re-initiated, and thus no need for 
a cleanup function to reset the state before a new fetch operation. */
  }, []); // 🚩 Dependency array is correctly empty to run once on mount


    //-----fetchDataPerson useEffect hook
  useEffect(() => {
    // 🚩 Check if 'id' before fetching to avoid unnecessary calls. the reason of the why the use of 'if' is explained bellow
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
/* ---including a cleanup function to reset the state of person

before the next effect runs or before the component unmounts.This approach can prevent potential bugs or inconsistencies in your UI by ensuring that stale data is cleared out.\If you're going to clear the selected person's data immediately when a new fetch operation is initiated (for example, when a user clicks on another person), adding such a cleanup function makes sense. 
It ensures that your application's state remains consistent and predictable providing a better user experience by temporarily clearing previously displayed details until the new data is loaded. */
      return () => {
        console.log("cleaning up the person effect");
        setPerson(null);//clean up or reset person
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

// REASON FOR THE IF:

/* The decision to use an if statement within the fetchDataPerson useEffect hook before attempting to fetch person data based on an id is a precautionary measure to ensure that the fetch operation only occurs when a valid id is present. This approach addresses a few practical considerations:

Prevent Unnecessary Fetch Calls: Without the if statement, the fetchDataPerson function would be called every time the component renders and the effect's dependencies change, including when id is null or not yet set. This could lead to unnecessary fetch calls to the backend or API with an invalid or undefined id, potentially causing errors or unwanted network requests.

Conditional Execution: The if statement ensures that the fetch operation is only executed when there's a meaningful id to use for the request. This makes the effect more efficient and prevents the execution of fetch operations that are guaranteed to fail or return no useful data.

Enhanced Readability and Maintenance: Using an explicit conditional check makes the intent of the code clearer to other developers and yourself in the future. It explicitly communicates that fetching person data is contingent on having a valid id.

Error Handling and Debugging: It simplifies error handling and debugging by reducing the number of failed fetch attempts that need to be investigated. By only fetching when id is set, you can more easily identify and troubleshoot issues with the fetch operation or the data it returns. */
