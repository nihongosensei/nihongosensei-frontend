import type { JSX } from "react";
import { MinorText } from "~components/ui/Typography/MinorText";
import { setKeyProperty } from "../../../helper";
import { isBirthDeath, isDate, isDef, isExpl, isTrans } from "./guards";
import { mapElement } from "./mapElement";

type ElementType<T> = T | null | JSX.Element;

const WHITESPACE = <> </>;

function isExplOrDefOrBirthDeath(input: unknown) {
  return isExpl(input) || isDef(input) || isBirthDeath(input) || isDate(input);
}

export function createElements<T>(
  elements?: ReadonlyArray<ElementType<T>>,
): JSX.Element[] | null {
  if (!elements || !elements.length) {
    return null;
  }

  const created: JSX.Element[] = [];

  let carry: JSX.Element[] | undefined = undefined;

  for (let index = 0; index < elements.length; index++) {
    const element = elements[index];
    const requiresSemicolon = isExplOrDefOrBirthDeath(element);

    if (isTrans(element) && isTrans(elements[index - 1])) {
      created.push(<MinorText>;</MinorText>);
    }
    if (requiresSemicolon && isExplOrDefOrBirthDeath(elements[index - 1])) {
      (carry ?? created).push(<>;</>);
    }

    if (index !== 0) {
      if (!carry) {
        created.push(WHITESPACE);
      } else if (carry?.length > 0) {
        carry.push(WHITESPACE);
      }
    }

    if (requiresSemicolon && !carry) {
      carry = [];
    } else if (!requiresSemicolon && carry) {
      created.push(<MinorText>({carry.map(setKeyProperty())})</MinorText>);
      carry = undefined;
    }

    const mappedElement = mapElement(element);
    if (!mappedElement) {
      console.warn("element could not be mapped", element);

      continue;
    }

    (carry ?? created).push(mappedElement);
  }

  if (carry) {
    created.push(<MinorText>({carry.map(setKeyProperty())})</MinorText>);
  }

  return created.map(setKeyProperty());
}
