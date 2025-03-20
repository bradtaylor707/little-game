import { useAtom } from "jotai";
import { messageAtom } from "../store";
import { useCallback, useEffect, useRef, useState } from "react";

export default function Jotai() {
  const [message, setMessage] = useAtom(messageAtom);
  const [savedMessage, setSavedMessage] = useState("");

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const saveTimeoutRef = useRef<number>(null);
  const messageTimeoutRef = useRef<number>(null);

  const save = useCallback(() => {
    setMessage(textareaRef.current?.value ?? "");
    setSavedMessage("Saved!!");

    if (messageTimeoutRef.current) {
      clearTimeout(messageTimeoutRef.current);
    }

    messageTimeoutRef.current = setTimeout(() => {
      setSavedMessage("");
    }, 500);
  }, [setMessage]);

  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }

      if (messageTimeoutRef.current) {
        clearTimeout(messageTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div id={"jotai"}>
      <h1>Leave a message for yourself for later</h1>
      <div>
        <textarea
          ref={textareaRef}
          defaultValue={message}
          maxLength={1200}
          onKeyDown={(event) => {
            if (saveTimeoutRef.current) {
              clearTimeout(saveTimeoutRef.current);
            }

            if (event.key === "Enter") {
              save();
            } else {
              saveTimeoutRef.current = setTimeout(() => {
                save();
              }, 1000);
            }
          }}
        />
      </div>
      {!!savedMessage && <div id={"saved-feedback"}>{savedMessage}</div>}
    </div>
  );
}
