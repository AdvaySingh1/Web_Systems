import Button from "./components/Button";

export default function App() {
  console.log("hello");
  let heading = "i like people";
  let link = "https://en.wikipedia.org/wiki/Doraemon";

  return (
    <>
      <h1
        className="text-transparent bg-clip-text font-extrabold text-5xl text-center"
        style={{
          backgroundImage: "linear-gradient(to right, #141E30, #243B55)",
          animation: "cosmicShine 5s ease-in-out infinite", // Slower 5-second animation
        }}
      >
        {heading}!
      </h1>
      <Button text="Click Me" type="stary" link={link}></Button>
    </>
  );
}
