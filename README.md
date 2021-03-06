Some of the screenshots are 
![Screenshot (83)](https://user-images.githubusercontent.com/67138916/170677132-5ac63d5f-550c-44d4-ae46-ca19c7ba515d.png)
![Screenshot (84)](https://user-images.githubusercontent.com/67138916/170677155-71da9438-7e6d-405b-9ad3-95f309f80055.png)
![Screenshot (85)](https://user-images.githubusercontent.com/67138916/170677172-1deeb2d7-ccee-4ec8-8886-63e15191a9c0.png)
![Screenshot (86)](https://user-images.githubusercontent.com/67138916/170677241-337f34fe-a532-4dfe-907b-fe03fe3eea03.png)



## Features

1. **Tab Based Interface**: An easy-to-use tab based interface allows the user to switch between multiple queries at once. Want to view a table _and_ run a query at the same time? Sure, go right ahead. Each tab maintains its own separate state, so as long as you don't reload the page, you can jump right back to where you left a tab.
2. **Dynamic Table Views**: The list of tables is fetched at first, but the actual data isn't. Only when you click on the name of a table, are the entries fetched. Keeping the application lightweight, and blazing fast.
3. **Defining Custom Types for Columns**: Each person is not the same; similarly, each column is not the same. You might want to specify certain processing functions: want to parse an image, or return an integer. You can do all this, and the table will display the processed result.
4. **Result Statistics**: The user will also be alerted about the time taken to complete a query, giving the user a measure to check the performance of the system.
\

## Optimisations
- The most time-saving optimisation would be **dynamic fetching**. The rows of a table are fetched only when the user requests it. Not a second before. This shaves a lot of seconds off our initial load time, by distributing that across requests.
- **Extensive use of the `useMemo` hook**. The `useMemo` hook reduces the number of re-computations by storing the results of computations with the same dependencies. The data of tables is entirely 'memoised'.
- **Intelligent use of the React-Bootstrap library.** Let's suppose we want to import a `Alert` component. There are two ways to do that:
  - `import { Alert } from "react-bootstrap";`
  - `import Alert from "react-bootstrap/Alert";`   
  The first option imports the entire library, and then imports the Alert component, whereas the second, more optimised, way imports just the Alert component, and nothing else. This too, shaves a lot of the load time, and this is what this project uses.
- **Keeping the number of state changes as low as possible**. While this has been accompanied by a slight reduction in the feature set, it has more than made up for it in the load time of a re-render.
- **Reduced the number of API calls**. I have reduced the number of API calls, by using the `useEffect` hook, which shaved off almost 2 seconds after each click.


