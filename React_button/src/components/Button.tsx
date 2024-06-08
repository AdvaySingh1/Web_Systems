interface Props {
  text: string;
  type: string;
  link: string;
}

import starIcon from "../assets/starIcon.svg";

export default function Button({ text, type, link }: Props) {
  if (type === "stary") {
    return (
      <a href={link} className=" flex justify-center my-80">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
          type="button"
        >
          <img
            src={starIcon}
            alt="Star"
            className="fill-current w-4 h-4 mr-2"
          />
          <span>{text}</span>
        </button>
      </a>
    );
  }

  return (
    <a href={link} className=" flex justify-center my-80">
      <button
        className={
          type === "primary"
            ? "bg-purple-500 hover:bg-purple-700 text-white font-bold py-9 px-24 rounded-full shadow-lg border-2 border-purple-600"
            : "bg-purple-500 hover:bg-purple-700 text-white font-bold py-9 px-24 rounded-full shadow-lg border-2 border-purple-600"
        }
      >
        {text}
      </button>
    </a>
  );
}
