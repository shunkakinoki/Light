import { toast } from "react-hot-toast";

import { ToastError } from "@lightdotso/app/components/ToastError";

export const error = (text: string) => {
  toast.custom(
    t => {
      return <ToastError show={t.visible}>{text}</ToastError>;
    },
    { duration: 800 },
  );
};
