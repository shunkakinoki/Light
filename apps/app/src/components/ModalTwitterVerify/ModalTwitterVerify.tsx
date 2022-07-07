import { twitterAuthorize, twitterVerify } from "@cyberlab/social-verifier";

import { useCallback, useMemo, useState } from "react";

import { useContext } from "wagmi";

import { Modal } from "@lightdotso/app/components/Modal";
import { PlaceholderProfile } from "@lightdotso/app/components/PlaceholderProfile";
import { useCyberConnectIdentity } from "@lightdotso/app/hooks/useCyberConnectIdentity";
import { useEns } from "@lightdotso/app/hooks/useEns";
import { useModalTwitterVerify } from "@lightdotso/app/hooks/useModalTwitterVerify";
import { useWallet } from "@lightdotso/app/hooks/useWallet";
import { error } from "@lightdotso/app/libs/toast/error";
import { success } from "@lightdotso/app/libs/toast/sucess";
import { splitAddress } from "@lightdotso/app/utils/splitAddress";

export const ModalTwitterVerify = () => {
  const {
    modalTwitterVerifyState,
    setModalTwitterVerifyState,
    closeModalTwitterVerify,
  } = useModalTwitterVerify();
  const { address } = useWallet();
  const { ens } = useEns(address);
  const [twitterHandle, setTwitterHandle] = useState("");
  const context = useContext();
  const { mutate: mutateIdentity } = useCyberConnectIdentity();

  const verifyText = useMemo(() => {
    if (!modalTwitterVerifyState.sig) {
      return;
    }
    const text = `Verifying my Twitter on @LightDotSo %0A%0A${`https://light.so/${
      ens ?? address
    }`} %0A%0A${modalTwitterVerifyState.sig}`;
    return text;
  }, [address, ens, modalTwitterVerifyState.sig]);

  const onClickTwitterVerify = useCallback(async () => {
    if (!twitterHandle) {
      error("Twitter Handle Empty!");
      return;
    }
    if (!modalTwitterVerifyState.sig) {
      const provider = context.state.connector?.getProvider();
      const sig = await twitterAuthorize(provider, address, twitterHandle);
      setModalTwitterVerifyState({ ...modalTwitterVerifyState, sig: sig });
      return;
    }
    if (typeof window === "undefined") {
      return;
    }
    if (!modalTwitterVerifyState.hasTweeted) {
      window.open(
        `https://twitter.com/intent/tweet?text=${verifyText}`,
        "_blank",
      );
      setTimeout(() => {
        setModalTwitterVerifyState({
          ...modalTwitterVerifyState,
          hasTweeted: true,
        });
      }, 300);
      return;
    }
    try {
      await twitterVerify(address, twitterHandle, "Light");
      success("Twitter Successfully Verified!");
      closeModalTwitterVerify();
      mutateIdentity(
        { identity: { social: { twitter: twitterHandle } } },
        false,
      );
      return;
    } catch (err) {
      error(`Please try again! ${err.message}`);
    }
  }, [
    address,
    closeModalTwitterVerify,
    context.state.connector,
    modalTwitterVerifyState,
    mutateIdentity,
    setModalTwitterVerifyState,
    twitterHandle,
    verifyText,
  ]);

  return (
    <Modal
      show={modalTwitterVerifyState.open}
      onClose={closeModalTwitterVerify}
    >
      <div className="max-w-xl bg-bg p-6">
        <div className="block w-[9999px]" />
        <h1 className="text-2xl font-extrabold leading-8 text-contrast-higher">
          {!modalTwitterVerifyState.sig
            ? "Sign Message"
            : !modalTwitterVerifyState.hasTweeted
            ? "Tweet it out!"
            : "Verify"}
        </h1>
        {!modalTwitterVerifyState.sig &&
          !modalTwitterVerifyState.hasTweeted && (
            <p className="mt-4 text-contrast-medium">
              Sign and tweet a message that will be used to link your wallet
              address and Twitter handle.
            </p>
          )}
        {modalTwitterVerifyState.sig && modalTwitterVerifyState.hasTweeted && (
          <p className="mt-4 text-contrast-medium">
            Enter your twitter handle to verify the tweet.
          </p>
        )}
        <div className="mt-4 flex items-center justify-between rounded-md bg-bg-lighter p-4">
          <div className="flex items-center">
            <PlaceholderProfile address={address} />
            <h3 className="ml-4 text-lg font-semibold text-contrast-higher">
              {ens ?? splitAddress(address)}
            </h3>
          </div>
          <div className="text-sm text-warning">Unverified</div>
        </div>
        {!modalTwitterVerifyState.sig ? (
          <div className="relative mt-1 rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-contrast-higher sm:text-lg">@</span>
            </div>
            <input
              className="mt-4 block w-full rounded-md border-contrast-medium p-4 pr-12 pl-7 text-contrast-higher focus:border-primary focus:ring-primary sm:text-lg"
              placeholder="Your Twitter Handle"
              onChange={e => {
                setTwitterHandle(e.target.value);
              }}
            />
          </div>
        ) : !modalTwitterVerifyState.hasTweeted ? (
          <p className="mt-4 flex w-full break-all bg-bg-lighter p-4 text-contrast-higher">
            {verifyText}
          </p>
        ) : null}
        <button
          className="mt-4 w-full rounded-md bg-contrast-higher p-3 text-contrast-lower hover:bg-contrast-high"
          onClick={onClickTwitterVerify}
        >
          {!modalTwitterVerifyState.sig
            ? "Sign"
            : !modalTwitterVerifyState.hasTweeted
            ? "Tweet"
            : "Verify"}
        </button>
        {modalTwitterVerifyState.sig && (
          <button
            className="mt-4 text-contrast-medium underline"
            onClick={() => {
              if (modalTwitterVerifyState.hasTweeted) {
                return setModalTwitterVerifyState({
                  ...modalTwitterVerifyState,
                  hasTweeted: false,
                });
              }
              return setModalTwitterVerifyState({
                ...modalTwitterVerifyState,
                hasTweeted: true,
              });
            }}
          >
            {!modalTwitterVerifyState.hasTweeted
              ? "Already tweeted this?"
              : "Haven't tweeted yet? Go back."}
          </button>
        )}
      </div>
    </Modal>
  );
};
