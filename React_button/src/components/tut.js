import { func } from "prop-types";

// functions
function func1() {}

export default function func2() {
  return <div>hello</div>;
}

const func3 = () => {};

export const func4 = () => {
  return <div>hello</div>;
};

// name less functions
<button
  onClick={() => {
    console.log("hello world");
  }}
>
  Hello
</button>;

// ifs in react

if (true) {
  // do something
} else {
  // do something else
}

let age = 10;
let name = age > 10 && "Pedro"; // sets the name to perdo if name greater than 10
let otherName = age > 10 ? "Pedro" : "Jack"; // sets the name to pedro if name greater than 10 or jack

// objects

const Person = {
  name: "Pedro",
  age, // this is the same as setting age to the age above since they have the same name
  isMarried: false,
};

const name2 = person.name; // made easier
const { name3, age2, isMarried2 } = person; // destruct the object

const person2 = { ...person, name: "Jack" }; // setting person2 to the same as person except for the name

//arrays

const names = ["Pedro", "Jack", "Jessica"];
const names2 = [...names, "Joel"]; // adding an element to an array (used for changing states)

names.map((name) => {
  // map to access every element in an array
  return name + "1"; // returns the map with 1 at the end
  //return <h1>name</h1> if used in in an export function
});

return names2.map((name) => {
  // return the name for any name longer than 5 or the null
  name.length > 5 ? name : null;
});

const names3 = [...names2, "Pedro"];

names.filter((name) => {
  // filter through elements in an array
  return name !== "Pedro";
});

// promise object

const data1 = new Promise((resolve, reject) => {
  if (name === "Pedro") {
    // usually something related to the data being loaded
    setTimeout(() => {
      resolve(name);
    }, 300);
  } else {
    reject("Name is not Pedro");
  }
});

// chaining then statements
data1
  .then((data) => {
    return data.height;
  })
  .then((height) => {
    console.log(height);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    console.log("Promise finished");
  });

// async function logHeight(){

// }

// importing
const axios = require("axios"); // library which fetches data
const data2 = axios.get("link"); // return a promise
data2
  .then((res) => {
    console.log(res);
    return res; //console logging the data2 will return a promise
  })
  .then((res) => {
    console.log(res.data);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    "promise complete";
  });

const fetchData = async (link) => {
  // async function fetchData(){}
  try {
    const data = await axios.get(link); // the await will cause the response
    console.log(data.person?.name); // this is if the person exists or null so no error
  } catch (err) {
    console.log(err);
  } finally {
    console.log("Hello");
  }
};

// the awaid abstract aways the promise which causes the code block to look more synchronous code

// fetcher function makeing ZMLHTTPRequest)()

function simplifiedGet(url) {
  return new Promise((resolve, reject) => {
    // Simulating an HTTP GET request with XMLHttpRequest
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        // Success status lies within the range of 200 to 299
        const response = {
          data: xhr.responseText, // The response payload as a string
          status: xhr.status, // HTTP status code
          statusText: xhr.statusText, // Status text as reported by the server
        };
        resolve(response);
      } else {
        // We hit an HTTP error status, so we reject the promise
        reject(new Error(`Request failed with status: ${xhr.status}`));
      }
    };
    xhr.onerror = () => {
      // Network errors or other issues with the request
      reject(new Error("Network error"));
    };
    xhr.send();
  });
}

// Usage example:
simplifiedGet("https://api.example.com/data")
  .then((response) => {
    console.log("Success:", response);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

// the fetch API works similarly to axios library but doesn't directly output onto a json

const fetchAPIdata = async (link) => {
  try {
    const response = await fetch(link);
    return response.json().people?.name;
  } catch (err) {
    return err;
  }
};
const fetch = require("node-fetch");

fetch(`https://api.example.com/data/${idNumber}`)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`); // allows to insert js into strings
    }
    return response.json();
  })
  .then((data) => {
    console.log(data); // Your JSON data
  })
  .catch((error) => {
    console.error("There was an error!", error);
  });

  // only async on click functionality
  // action={async () => {
  //         "use server";
  //         await logout();
  //         redirect("/");
  //       }}

// importing and exporting
import some from "some"; // same as const some = require('some');

// export default thisModule; //module.export = {anObj}; // to export the js code
