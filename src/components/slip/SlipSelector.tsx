import { Check } from "lucide-react";
import { useEffect, useState } from "react";

interface SelectorProps extends React.ComponentProps<'div'> {
  choicesList: string[];
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
  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-12 bg-white text-black rounded-xl flex items-center justify-between px-4"
      >
        {filter === "" ? "--รวมกีฬาทุกประเภท--" : filter}
        <span>{isOpen ? "▲" : "▼"}</span>
      </button>
      {isOpen && (
        <div className="absolute mt-2 bg-white rounded-xl shadow-lg overflow-hidden">
          {choicesList.map((choice, index) => (
            <div
              key={index}
              className={`${
                filter === choice ? "bg-neutral-100" : "bg-white"
              } h-10 text-black flex items-center px-4 hover:bg-neutral-200 cursor-pointer`}
              onClick={() => setFilter(choice)}
            >
              {filter === choice ? (
                <Check className="w-6 h-5" />
              ) : (
                <div className="h-1 w-6" />
              )}
              {choice}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
