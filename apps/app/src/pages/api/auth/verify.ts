import type { CredentialsMessage } from "@lightdotso/types";
import { credentialsMessageSchema } from "@lightdotso/types";
import type { NextApiRequest, NextApiResponse } from "next";
import { SiweMessage } from "siwe";

import { validateSchema } from "@lightdotso/app/libs/api/validateSchema";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        const { message, signature } = req.body;

        const safeResult: CredentialsMessage = validateSchema(
          credentialsMessageSchema,
          message,
        );
        const siweMessage = new SiweMessage(safeResult);
        await siweMessage.validate(signature);

        //  const fields = await siweMessage.validate(signature);
        // if (fields.nonce !== req.session.nonce) {
        //   res.status(422).json({
        //     message: "Invalid nonce.",
        //   });
        //   return;
        // }

        res.json({ ok: true });
      } catch (err) {
        console.error(err?.message);
        res.json({ ok: false });
      }
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
