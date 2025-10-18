import { MineType } from "@/api/event/stakemine";

interface MineProps {
  revealed: boolean;
  type: MineType;
  onToggle?: () => void; // optional callback when button is clicked
}

const Mine: React.FC<MineProps> = ({ revealed, type, onToggle }) => {
  return (
    <div className="flex items-center justify-center">
      <button
        onClick={onToggle}
        className={`relative z-10 flex items-center justify-center w-20 aspect-square text-4xl font-bold bg-neutral-700 text-neutral-500 rounded-lg transform transition-all duration-500 ${
          revealed ? "scale-0 rotate-180" : "scale-100 rotate-0"
        }`}
      >
        ?
      </button>
      <div
        className={`absolute z-0 flex items-center justify-center w-20 aspect-square text-4xl bg-neutral-700 text-neutral-500 rounded-lg transform transition-all duration-500 border-2  ${
          type == "hidden"
            ? "border-transparent"
            : type == "diamond"
            ? "border-sky-400"
            : "border-red-600"
        }
  ${revealed ? "scale-100 rotate-0" : "scale-0 rotate-180"}}`}
      >
        {type == "hidden" ? <></> : type == "diamond" ? <>💎</> : <>💣</>}
      </div>
    </div>
  );
};

export default Mine;
