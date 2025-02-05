import clsx from "clsx";
import type { JSX } from "react";
import type { SenseModel } from "~services/VocabularyService";
import { SenseEntry } from "./SenseEntry";

type SenseGroupProps = {
  senses: SenseModel[];
  display?: "block" | "inline";
};

export function SenseGroup({
  senses,
  display = "block",
}: SenseGroupProps): JSX.Element {
  return (
    <li
      className={clsx(
        "marker:text-neutral-700 marker:dark:text-neutral-300",
        display == "inline" && "inline",
      )}
    >
      <ul className="inline">
        {senses.map((sense, index) => (
          <SenseEntry key={index} senseEntry={sense} />
        ))}
      </ul>
    </li>
  );
}
