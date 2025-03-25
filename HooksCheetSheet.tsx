import React, {
  useState,
  useReducer,
  useEffect,
  useLayoutEffect,
  useInsertionEffect,
  useRef,
  useMemo,
  useCallback,
  useContext,
  createContext,
  useTransition,
  useDeferredValue,
  useDebugValue,
  useId,
  use,
} from "react";

// -------------------------------
// 1. useState
// -------------------------------
//The useState Hook allows you to add state to a function component & make sure that the component re-renders when the state changes

const UseStateExample: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <button onclick={() => setCount(count + 1)}>
      useState increment: {count}
    </button>
  );
};

// -------------------------------
// 2. useReducer
// -------------------------------
//The useReducer Hook is a more complex version of useState.
//Used for complex state logic and updates
const UseReducerExample: React.FC = () => {
  function reducer(state, action) {
    switch (action.type) {
      case "increment":
        return { count: state.count + 1 };
      case "decrement":
        return { count: state.count - 1 };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, { count: 0 });
  return (
    <button onclick={() => dispatch({ type: "increment" })}>
      useReducer increment: {state.count}
    </button>
  );
};

// -------------------------------
// 3. useSyncExternalStore
// -------------------------------
// Example usage of useSyncExternalStore

const UseSyncExternalStoreExample: React.FC = () => {
  return <div>useSyncExternalStore Example</div>;
};

// -------------------------------
// 4. useEffect
// -------------------------------
//The useEffect Hook allows you to perform side effects in your components after rendering

const UseEffectExample: React.FC = () => {
  const [response, setResponse] = useState([]);

  useEffect(async () => {
    const res = await fetch("https://api.example.com/data");
    setResponse(res);
  }, []);
  return (
    <div>
      useEffect Example{" "}
      {response.data.map((item) => (
        <li>{item.name}</li>
      ))}
    </div>
  );
};

// -------------------------------
// 5. useLayoutEffect
// -------------------------------
//Preaty much the same as useEffect, but it will run before the DOM is updated

const UseLayoutEffectExample: React.FC = () => {
  const [response, setResponse] = useState([]);
  useLayoutEffect(async () => {
    const res = await fetch("https://api.example.com/data");
    setResponse(res);
  });

  return (
    <div>
      useLayoutEffect Example{" "}
      {response.data.map((item) => (
        <li>{item.name}</li>
      ))}
    </div>
  );
};

// -------------------------------
// 6. useInsertionEffect
// -------------------------------
//useInsertionEffect runs before React updates the DOM, but after the render calculations are completed.

const UseInsertionEffectExample: React.FC = () => {
  const [dependencies, setDependencies] = useState([]);

  useInsertionEffect(async () => {}, [dependencies]);
  return <div>useInsertionEffect Example</div>;
};

// -------------------------------
// 7. useRef
// -------------------------------
// This is a mutable ref object that allows you to persist values between renders

const UseRefExample: React.FC = () => {
  let refExample = useRef("");

  return (
    <div>
      <h1>useRef Example</h1>
      <input type="text" ref={refExample} />
      <p>{refExample.current.value}</p>
    </div>
  );
};

// -------------------------------
// 8. useMemo
// -------------------------------
// useMemo is a React Hook that lets you cache the result of a calculation between re-renders

const UseMemoExample: React.FC = () => {
  const [count, setCount] = useState(0);

  function expensiveComputation(num: number) {
    console.log("Computing...");
    return num * 2;
  }

  const memoizedValue = useMemo(() => {
    // Calculate the memoized value only when 'count' changes
    return expensiveComputation(count);
  }, [count]);

  return (
    <div>
      <h1>useMemo Example</h1>
      <p>Computed Value: {memoizedValue}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

// -------------------------------
// 9. useCallback
// -------------------------------
// useCallback returns a memoized function, preventing unnecessary re-creation of the function on each render

const ChildComponent = React.memo(({ onClick }: { onClick: () => void }) => {
  console.log("Child rendered");
  return <button onClick={onClick}>Click me</button>;
});

const UseCallbackExample: React.FC = () => {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    // This function will not be recreated on every render
    console.log("Button clicked");
  }, []);

  return (
    <div>
      <h1>useCallback Example</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      {/* Passing a memoized function to prevent unnecessary child re-renders */}
      <ChildComponent onClick={handleClick} />
    </div>
  );
};

// -------------------------------
// 10. useContext
// -------------------------------
//use in a component to access the context of every nested component in a global way

// Create a Context
const ThemeContext = createContext("light");

function UseContextExample() {
  return (
    <div>
      <h1>useContext Example</h1>
      {/**provide a value to the context */}
      <ThemeContext.Provider value="dark">
        <ChildComponentContext />
      </ThemeContext.Provider>
    </div>
  );
}
function ChildComponentContext() {
  //use in inside a component to access the context
  const theme = useContext(ThemeContext);
  return <p>Current theme: {theme}</p>;
}

// -------------------------------
// 11. useTransition
// -------------------------------
//useTransition is a React Hook that allows you to perform side effects in your components after rendering, unlike useDeferredValue useTransition defers the UI update of the value until the next render

const UseTransitionExample: React.FC = () => {
  const [isPending, startTransition] = useTransition();

  startTransition(() => {
    // Perform side effects here
  });

  return (
    <div>
      useTransition Example
      {isPending && <div>Loading...</div>}
      {!isPending && <div>Loaded</div>}
    </div>
  );
};

// -------------------------------
// 12. useDeferredValue
// -------------------------------
//useDeferredValue is a React Hook that allows you to defer the update of a value, unlike useState useDeferredValue defers the update of the value until the next render

const UseDeferredValueExample: React.FC = () => {
  const [input, setInput] = useState("");
  const deferredInput = useDeferredValue(input); // defer the update of the input value

  return (
    <div>
      <h1>useDeferredValue Example</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <p>Deferred Value: {deferredInput}</p>
    </div>
  );
};

// -------------------------------
// 13. useDebugValue
// -------------------------------

const UseDebugValueExample: React.FC = () => {
  // useDebugValue is a new React Hook(V19) that allows you to provide a custom debug value for use in the React DevTools
  const debugValue = "some debug value";

  useDebugValue(debugValue);

  return <div>useDebugValue Example</div>;
};

// -------------------------------
// 14. useId
// -------------------------------

const UseIdExample: React.FC = () => {
  // useId is a new React Hook(V19) that allows you to generate unique IDs for elements.
  //It usful when you need to create unique IDs for elements in your React components
  //Note: you can't use this to create unique keys.

  const ID = useId();
  const ID2 = useId();
  return (
    <div>
      useId Example
      <form action="">
        <label htmlFor="{ID}">first input</label>{" "}
        <input type="text" id="{ID}" />
        <label htmlFor="{ID2}">second input</label>
        <input type="text" id="{ID2}" />
      </form>
    </div>
  );
};

// -------------------------------
// 15. use
// -------------------------------
//Use() is a new React Hook (V19) that allows you to simplify complex fetching of data and perform side effects in your components
function MyComponent() {
  const data = use(fetchDataFromAPI());

  return <div>{data ? <div>{data}</div> : <p>Loading...</p>}</div>;
}

async function fetchDataFromAPI() {
  return await fetch("https://api.example.com/data").then((res) => res.json());
}
