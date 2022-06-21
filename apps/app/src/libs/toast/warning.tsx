import { toast } from "react-hot-toast";

import { ToastWarning } from "@lightdotso/app/components/ToastWarning";

export const warning = (text: string) => {
  toast.custom(
    t => {
      return <ToastWarning show={t.visible}>{text}</ToastWarning>;
    },
    { duration: 800 },
  );
};
