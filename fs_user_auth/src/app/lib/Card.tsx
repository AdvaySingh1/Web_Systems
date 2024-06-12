interface Props {
  title: string;
  imageUrl: string;
  move: string;
  damage: number;
}

export default function Card({ title, imageUrl, move, damage }: Props) {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4 bg-white">
      <img className="w-full" src={imageUrl} alt={title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <span className="text-gray-700 text-base">Move: {move}</span>
        <span className="text-gray-700 text-base">Damage: {damage}</span>
      </div>
    </div>
  );
}
