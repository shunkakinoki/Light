export const IconMirror = ({ className = "", ...props }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      {...props}
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask id="path-1-inside-1_2273_9151">
        <path d="M4 11C4 6.58172 7.58172 3 12 3C16.4183 3 20 6.58172 20 11V21H4V11Z" />
      </mask>
      <path
        d="M20 21V23H22V21H20ZM4 21H2V23H4V21ZM18 11V21H22V11H18ZM20 19H4V23H20V19ZM6 21V11H2V21H6ZM12 5C15.3137 5 18 7.68629 18 11H22C22 5.47715 17.5228 1 12 1V5ZM12 1C6.47715 1 2 5.47715 2 11H6C6 7.68629 8.68629 5 12 5V1Z"
        mask="url(#path-1-inside-1_2273_9151)"
      />
    </svg>
  );
};
