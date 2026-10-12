import { Check } from "lucide-react";
import { useEffect, useState } from "react";

export interface SelectorOption {
  value: string;
  label: string;
}

interface SelectorProps {
  choicesList: readonly (string | SelectorOption)[];
  mainFilter: string;
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
}
export const Selector: React.FC<SelectorProps> = ({
  choicesList,
  mainFilter,
  filter,
  setFilter,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    setIsOpen(false);
  }, [mainFilter, filter]);

  const options = choicesList.map((choice) =>
    typeof choice === "string"
      ? { value: choice, label: choice }
      : choice,
  );
  const selectedLabel = options.find(
    (choice) => choice.value === filter,
  )?.label;

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-80 h-10 max-sm:text-[0.9rem] sm:h-12 bg-white text-black rounded-xl flex items-center justify-between px-4"
      >
        {filter === ""
          ? "--รวมกีฬาทุกประเภท--"
          : selectedLabel ?? filter}
        <span>{isOpen ? "▲" : "▼"}</span>
      </button>
      {isOpen && (
        <div className="absolute mt-2 w-80 bg-white rounded-xl shadow-lg overflow-hidden">
          {options.map((choice) => (
            <div
              key={choice.value}
              className={`${
                filter === choice.value ? "bg-neutral-100" : "bg-white"
              } h-9 max-sm:text-[0.8rem] sm:h-10 text-black flex items-center px-4 hover:bg-neutral-200 cursor-pointer z-30 relative`}
              onClick={() => setFilter(choice.value)}
            >
              {filter === choice.value ? (
                <Check className="w-6 h-5" />
              ) : (
                <div className="h-1 w-6" />
              )}
              {choice.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
