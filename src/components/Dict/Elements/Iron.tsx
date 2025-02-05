import type { JSX } from "react";
import type { IronModel } from "~services/VocabularyService";
import { createElements } from "./helper/createElements";

export function Iron({ textAndToken }: IronModel): JSX.Element {
  return (
    <span className='before:content-["»"] after:content-["«"]'>
      {createElements(textAndToken)}
    </span>
  );
}
