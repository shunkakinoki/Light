export const Coinbase = ({ className = "", ...props }) => {
  return (
    <svg
      width="256"
      height="256"
      viewBox="0 0 256 256"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path d="M256 0H0V256H256V0Z" fill="#0052FF" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M38 128C38 177.706 78.2943 218 128 218C177.706 218 218 177.706 218 128C218 78.2943 177.706 38 128 38C78.2943 38 38 78.2943 38 128ZM105 99C101.686 99 99 101.686 99 105V151C99 154.314 101.686 157 105 157H151C154.314 157 157 154.314 157 151V105C157 101.686 154.314 99 151 99H105Z"
        fill="white"
      />
    </svg>
  );
};
