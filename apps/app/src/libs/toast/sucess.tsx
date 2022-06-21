import { toast } from "react-hot-toast";

import { ToastSuccess } from "@lightdotso/app/components/ToastSuccess";

export const success = (text: string) => {
  toast.custom(
    t => {
      return <ToastSuccess show={t.visible}>{text}</ToastSuccess>;
    },
    { duration: 1500 },
  );
};
