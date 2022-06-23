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
      if (!twitterHandle) {
        error("Twitter Handle Empty!");
        return;
      }
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
      <div className="p-6 max-w-xl bg-bg">
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
        <div className="flex justify-between items-center p-4 mt-4 bg-bg-lighter rounded-md">
          <div className="flex items-center">
            <PlaceholderProfile address={address} />
            <h3 className="ml-4 text-lg font-semibold text-contrast-higher">
              {ens ?? splitAddress(address)}
            </h3>
          </div>
          <div className="text-sm text-warning">Unverified</div>
        </div>
        {modalTwitterVerifyState.sig &&
          (!modalTwitterVerifyState.hasTweeted ? (
            <p className="flex p-4 mt-4 w-full text-contrast-higher break-all bg-bg-lighter">
              {verifyText}
            </p>
          ) : (
            <div className="relative mt-1 rounded-md shadow-sm">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <span className="sm:text-lg text-contrast-higher">@</span>
              </div>
              <input
                className="block p-4 pr-12 pl-7 mt-4 w-full sm:text-lg text-contrast-higher rounded-md border-contrast-medium focus:border-primary focus:ring-primary"
                placeholder="Your Twitter Handle"
                onChange={e => {
                  setTwitterHandle(e.target.value);
                }}
              />
            </div>
          ))}
        <button
          className="p-3 mt-4 w-full text-contrast-lower bg-contrast-higher hover:bg-contrast-high rounded-md"
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
