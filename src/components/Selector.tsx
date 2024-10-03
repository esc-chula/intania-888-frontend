import { Check } from "lucide-react";
import { useEffect, useState } from "react";
export const Selector = ({
  mainFilter,
  filter,
  setFilter,
}: {
  mainFilter: string;
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    setIsOpen(false);
  }, [mainFilter, filter]);
  const choicesList = [
    "รวมกีฬาทุกประเภท",
    "ฟุตบอลชาย ปี 1",
    "ฟุตบอลชาย ปี 2-4",
    "บาสเก็ตบอลชาย ปี 1",
    "บาสเก็ตบอลชาย ปี 2-4",
    "บาสเก็ตบอลหญิง รวมทุกชั้นปี",
    "วอลเลย์บอลชาย รวมทุกชั้นปี",
    "วอลเลย์บอลหญิง รวมทุกชั้นปี",
    "แชร์บอลหญิง ปี 1",
    "แชร์บอลหญิง ปี 2-4",
  ];
  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-80 h-12 bg-white text-black rounded-xl flex items-center justify-between px-4"
      >
        {filter === "" ? "--รวมกีฬาทุกประเภท--" : filter}
        <span>{isOpen ? "▲" : "▼"}</span>
      </button>
      {isOpen && (
        <div className="absolute mt-2 w-80 bg-white rounded-xl shadow-lg overflow-hidden">
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
