export const MatchColorLogo = (props: { color: string, size?: string }) => {
    return (
      <div className="flex flex-row space-x-2 items-center">
        <Shirt color={props.color} size={props.size? props.size : ""} /> <p>{colorMap[props.color].name}</p>
      </div>
    );
  };
  
  export const colorMap: { [key: string]: { name: string; color: string } } = {
    pink: {
      name: "สีชมพู",
      color: "#EC6FBF",
    },
    purple : {
      name: "สีม่วง",
      color: "#C450F5",
    },
    violet : {
      name: "สีม่วง",
      color: "#C450F5",
    },
    yellow: {
      name: "สีเหลือง",
      color: "#F9DF70",
    },
    green: {
      name: "สีเขียว",
      color: "#67DF80",
    },
    orange: {
      name: "สีส้ม",
      color: "#EF965C",
    },
    blue: {
      name: "สีฟ้า",
      color: "#60B4F7",
    },
    TBA: {
      name: "TBA",
      color: "#D4D4D4",
    },
  };
  
  const Shirt = (props: { color: string, size: string }) => {
    return (
      <svg
        viewBox="0 0 36 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={props.size ?  `h-[${props.size}px]`: "h-[25px] sm:h-[36px]"}
      >
        <path
          d="M31.9665 4.76665L24.6665 2.33331C24.6665 4.10142 23.9641 5.79712 22.7139 7.04736C21.4636 8.2976 19.7679 8.99998 17.9998 8.99998C16.2317 8.99998 14.536 8.2976 13.2858 7.04736C12.0355 5.79712 11.3332 4.10142 11.3332 2.33331L4.03316 4.76665C3.27879 5.01797 2.63912 5.53067 2.22958 6.21222C1.82004 6.89376 1.66762 7.69925 1.79982 8.48331L2.76649 14.2666C2.82995 14.6582 3.03096 15.0142 3.33339 15.2708C3.63582 15.5274 4.01986 15.6678 4.41649 15.6666H7.99982V32.3333C7.99982 34.1666 9.49982 35.6666 11.3332 35.6666H24.6665C25.5505 35.6666 26.3984 35.3155 27.0235 34.6903C27.6486 34.0652 27.9998 33.2174 27.9998 32.3333V15.6666H31.5832C31.9798 15.6678 32.3638 15.5274 32.6663 15.2708C32.9687 15.0142 33.1697 14.6582 33.2332 14.2666L34.1998 8.48331C34.332 7.69925 34.1796 6.89376 33.7701 6.21222C33.3605 5.53067 32.7208 5.01797 31.9665 4.76665Z"
          fill={colorMap[props.color].color}
          stroke="black"
          stroke-width="3.33333"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    );
  };
