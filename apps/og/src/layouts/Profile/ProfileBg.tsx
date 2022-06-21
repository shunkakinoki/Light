import type { FC } from "react";

export type ProfileBgProps = {
  className?: string;
};

export const ProfileBg: FC<ProfileBgProps> = ({ className }) => {
  return (
    <svg
      width="1200"
      height="630"
      viewBox="0 0 1200 630"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#clip0_2063_7777)">
        <rect width="1200" height="630" fill="#09090A" />
        <g
          style={{ mixBlendMode: "screen" }}
          filter="url(#filter0_f_2063_7777)"
        >
          <circle
            cx="1200"
            cy="626"
            r="626"
            transform="rotate(-90 1200 626)"
            fill="url(#paint0_radial_2063_7777)"
          />
        </g>
        <g filter="url(#filter1_f_2063_7777)">
          <path
            d="M872.08 170.365C871.881 170.123 871.621 169.936 871.33 169.821C765.537 128.279 670.588 98.9902 592.141 83.7014C513.585 68.3911 453.19 67.4343 414.565 80.8882C375.941 94.3421 359.88 121.931 367.342 162.005C374.783 201.968 405.464 253.529 457.558 313.623C457.843 313.951 458.209 314.208 458.616 314.362V314.362C461.171 315.33 463.337 312.211 461.571 310.126C414.042 254.015 385.968 205.745 378.935 167.975C371.573 128.438 387.419 101.219 425.526 87.9455C463.633 74.6719 523.219 75.6159 600.723 90.7211C676.583 105.506 768.084 133.56 869.97 173.261C871.744 173.952 873.291 171.834 872.08 170.365V170.365Z"
            fill="url(#paint1_linear_2063_7777)"
          />
        </g>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M152.666 551.182V516.5H156.262V551.182H152.666ZM161.704 522.194V516.5H165.25V522.194H161.704ZM161.704 551.183V525.301H165.25V551.183H161.704ZM180.183 525.093C173.291 525.093 169.445 529.752 169.445 536.999C169.445 544.246 173.341 548.908 180.134 548.905C184.43 548.905 187.526 546.524 188.674 543.574H188.724V550.096C188.724 555.221 186.877 557.188 181.582 557.188C176.389 557.188 174.341 555.375 174.341 551.183H170.794C170.794 557.083 175.239 560.5 181.532 560.5C188.025 560.5 192.32 557.032 192.32 550.096V525.611H189.124V530.58H188.925C187.825 527.319 184.529 525.093 180.183 525.093ZM188.724 537.775C188.724 543.056 185.428 545.696 180.983 545.696C176.188 545.696 173.042 543.78 173.042 536.999C173.042 530.27 176.089 528.302 180.783 528.302C185.378 528.302 188.724 530.943 188.724 536.223V537.775ZM197.911 551.182V516.5H201.508V530.377H201.707C202.656 527.943 205.203 525.096 210.198 525.096C216.641 525.096 219.388 529.548 219.388 535.398V551.185H215.84V536.326C215.84 530.787 214.042 528.354 209.047 528.354C204.103 528.354 201.504 530.735 201.504 536.481V551.182H197.911ZM226.83 528.821V543.935C226.83 549.371 229.476 551.235 234.022 551.235C235.429 551.224 236.833 551.085 238.218 550.821V547.818H234.971C231.775 547.818 230.425 547.144 230.425 544.143V528.821H238.218V525.611H230.425V519.089H227.725L226.875 525.611H222.685V528.821H226.83Z"
          fill="#F9F9FF"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M101.334 503.666C96.1317 503.66 91.0228 505.044 86.5359 507.676H116.129C111.643 505.045 106.535 503.66 101.334 503.666ZM122.569 512.776C123.753 514.016 124.826 515.357 125.777 516.784H76.8877C77.5897 515.746 78.3579 514.754 79.1877 513.814H79.1524C79.2243 513.732 79.3007 513.655 79.377 513.579C79.4417 513.514 79.5063 513.45 79.5677 513.382C79.6436 513.298 79.7168 513.211 79.79 513.125C79.8903 513.006 79.9905 512.888 80.0973 512.776H80.1471C81.1518 511.706 82.2346 510.713 83.3868 509.804H99.606C98.4534 510.712 97.3704 511.706 96.3663 512.776H122.569ZM129.796 525.891C129.456 524.525 129.017 523.185 128.482 521.882H90.4205C90.8309 520.867 91.2975 519.875 91.8182 518.911H75.599C75.0783 519.875 74.612 520.867 74.2024 521.882H74.1848C74.1563 521.952 74.1311 522.024 74.1058 522.096L74.1058 522.096C74.0831 522.161 74.0603 522.226 74.0353 522.289C74.0033 522.369 73.9692 522.449 73.9349 522.529C73.88 522.658 73.8246 522.788 73.7767 522.921H73.8027C73.4376 523.893 73.1256 524.885 72.8681 525.891H129.796ZM130.592 530.993H88.3127C88.3737 529.997 88.4852 529.006 88.647 528.022H72.4289C72.2663 529.006 72.1543 529.997 72.0935 530.993H72.0758C72.0675 531.112 72.0642 531.231 72.0611 531.349C72.0587 531.436 72.0563 531.523 72.0519 531.609C72.0489 531.676 72.0437 531.743 72.0383 531.809C72.0325 531.883 72.0266 531.956 72.0239 532.031H72.0364C72.0323 532.135 72.0271 532.239 72.0219 532.343C72.0109 532.56 72 532.777 72 532.997C72 533.671 72.0311 534.339 72.0758 535.001H130.592C130.636 534.339 130.667 533.671 130.667 532.997C130.667 532.324 130.636 531.656 130.592 530.993ZM82.3484 555.348H98.5676C99.8774 556.461 101.282 557.456 102.766 558.324H116.131C111.645 560.955 106.536 562.34 101.334 562.333C96.8818 562.335 92.4884 561.318 88.4903 559.36H88.4633C88.4345 559.345 88.4066 559.329 88.3788 559.313C88.3434 559.294 88.3083 559.274 88.2723 559.256C88.1849 559.213 88.0991 559.166 88.0131 559.12C87.9571 559.089 87.901 559.059 87.8445 559.03C87.4354 558.818 87.0293 558.602 86.6317 558.371C86.615 558.361 86.5977 558.352 86.5804 558.343C86.5719 558.339 86.5635 558.334 86.5551 558.33C86.5484 558.326 86.5417 558.322 86.5351 558.318H86.5465C85.0632 557.453 83.6584 556.459 82.3484 555.348ZM91.381 546.24H75.1618C75.6897 547.264 76.2771 548.256 76.9208 549.211H76.8897C76.9536 549.306 77.0227 549.398 77.0917 549.489L77.0918 549.489C77.1471 549.562 77.2025 549.635 77.2551 549.71C77.3078 549.786 77.3598 549.866 77.4125 549.947C77.4783 550.049 77.5452 550.152 77.6155 550.249H77.6487C78.3998 551.291 79.2176 552.284 80.0971 553.221H122.566C123.75 551.98 124.823 550.638 125.774 549.211H93.1369C92.4935 548.256 91.9071 547.264 91.381 546.24ZM72.295 537.131H88.5141C88.6609 538.131 88.8606 539.123 89.1122 540.101H129.796C129.456 541.468 129.017 542.808 128.482 544.11H74.1848C73.7938 543.139 73.4552 542.147 73.1703 541.14H73.1537C73.1306 541.06 73.1115 540.979 73.0924 540.898C73.0762 540.829 73.0601 540.761 73.0415 540.693C73.0185 540.609 72.9931 540.525 72.9678 540.441C72.9338 540.329 72.8998 540.216 72.8712 540.101H72.893C72.6419 539.122 72.4423 538.131 72.295 537.131Z"
          fill="#F9F9FF"
        />
        <g filter="url(#filter2_f_2063_7777)">
          <circle
            cx="793.173"
            cy="630.173"
            r="72.1727"
            transform="rotate(-180 793.173 630.173)"
            fill="url(#paint2_radial_2063_7777)"
          />
        </g>
        <g filter="url(#filter3_f_2063_7777)">
          <circle
            cx="1069.15"
            cy="160.149"
            r="36.0864"
            transform="rotate(64.3557 1069.15 160.149)"
            fill="url(#paint3_radial_2063_7777)"
          />
        </g>
        <g filter="url(#filter4_f_2063_7777)">
          <circle
            cx="788.064"
            cy="241.064"
            r="16"
            transform="rotate(-180 788.064 241.064)"
            fill="url(#paint4_radial_2063_7777)"
          />
        </g>
      </g>
      <defs>
        <filter
          id="filter0_f_2063_7777"
          x="474"
          y="-100"
          width="1452"
          height="1452"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="50"
            result="effect1_foregroundBlur_2063_7777"
          />
        </filter>
        <filter
          id="filter1_f_2063_7777"
          x="363.001"
          y="68.8993"
          width="512.072"
          height="248.205"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="1.28081"
            result="effect1_foregroundBlur_2063_7777"
          />
        </filter>
        <filter
          id="filter2_f_2063_7777"
          x="719"
          y="556"
          width="148.346"
          height="148.346"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="1"
            result="effect1_foregroundBlur_2063_7777"
          />
        </filter>
        <filter
          id="filter3_f_2063_7777"
          x="1029.05"
          y="120.055"
          width="80.1895"
          height="80.1895"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="2"
            result="effect1_foregroundBlur_2063_7777"
          />
        </filter>
        <filter
          id="filter4_f_2063_7777"
          x="768.064"
          y="221.064"
          width="40"
          height="40"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="2"
            result="effect1_foregroundBlur_2063_7777"
          />
        </filter>
        <radialGradient
          id="paint0_radial_2063_7777"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(1200 642.919) rotate(90) scale(609.081)"
        >
          <stop stopColor="white" />
          <stop offset="0.266145" stopColor="white" />
          <stop offset="0.595433" stopColor="#FFAE38" />
          <stop offset="0.616919" stopColor="#FF9560" />
          <stop offset="1" stopColor="#193749" />
        </radialGradient>
        <linearGradient
          id="paint1_linear_2063_7777"
          x1="460.528"
          y1="317.366"
          x2="893.9"
          y2="160.492"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFDDAC" />
          <stop offset="0.0838498" stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <radialGradient
          id="paint2_radial_2063_7777"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(837.153 633.556) rotate(-172.807) scale(117.074 120.711)"
        >
          <stop stopColor="#2B3942" />
          <stop offset="0.806024" stopColor="#101417" />
          <stop offset="0.928916" stopColor="#FEC378" />
          <stop offset="1" stopColor="white" />
        </radialGradient>
        <radialGradient
          id="paint3_radial_2063_7777"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(1038.78 182.227) rotate(-40.4804) scale(75.2269 63.1784)"
        >
          <stop stopColor="#3D4F5A" />
          <stop offset="0.806024" stopColor="#101417" />
          <stop offset="0.928916" stopColor="#FEC378" />
          <stop offset="1" stopColor="white" />
        </radialGradient>
        <radialGradient
          id="paint4_radial_2063_7777"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(808.064 251.864) rotate(-149.34) scale(38.8278 32.9834)"
        >
          <stop stopColor="#6D93AD" />
          <stop offset="0.806024" stopColor="#101417" />
          <stop offset="0.928916" stopColor="#FEC378" />
          <stop offset="1" stopColor="white" />
        </radialGradient>
        <clipPath id="clip0_2063_7777">
          <rect width="1200" height="630" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
