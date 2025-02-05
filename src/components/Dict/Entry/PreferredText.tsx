import { cloneElement, JSX, ReactNode } from "react";
import { MinorText, MinorTextProps } from "~components/ui";

const PreferredTextSign = (props: MinorTextProps) => (
  <MinorText className="select-none" {...props} />
);

const ReadingSign = ({ children }: { children: ReactNode }) => (
  <PreferredTextSign
    style={{
      fontSize: "60%",
      verticalAlign: "40%",
    }}
  >
    {children}
  </PreferredTextSign>
);

const Njok = () => <ReadingSign>△</ReadingSign>;

const Njk = () => <ReadingSign>╳</ReadingSign>;

type PreferredTextProps = { text: string };

const PIECE_MAP: Record<string, JSX.Element> = {
  "△": <Njok />,
  "×": <Njk />,
  "(": <PreferredTextSign>(</PreferredTextSign>,
  ")": <PreferredTextSign>)</PreferredTextSign>,
  "{": <PreferredTextSign>《</PreferredTextSign>,
  "}": <PreferredTextSign>》</PreferredTextSign>,
  "〈": <PreferredTextSign>〈</PreferredTextSign>,
  "〉": <PreferredTextSign>〉</PreferredTextSign>,
};

export function PreferredText({ text }: PreferredTextProps): JSX.Element {
  return <>{mapPieces(text)}</>;
}

/**
 * Maps defined elements to the given string if they exist.
 * Returns a list of mapped elements and strings, which are not mapped.
 * This function should keep strings together instead of returned every
 * character as entry of the array (there are many utf8 chracters which must
 * be used combined - if each character is returned react will create an
 * own text node for each character which might lead to hyradtion errors,
 * e.g. with 167612 (棟)).
 *
 * @param text The text to use.
 */
function mapPieces(text: string): (JSX.Element | string)[] {
  const strings: string[] = [];
  const combined: (JSX.Element | string)[] = [];
  const pieces = text.split("");

  for (let i = 0; i < pieces.length; i++) {
    const piece = pieces[i];
    const mapped = PIECE_MAP[piece];
    if (mapped) {
      if (strings.length) {
        combined.push(strings.join(""));
        strings.splice(0);
      }

      combined.push(cloneElement(mapped, { key: i }));
    } else {
      strings.push(piece);
    }
  }

  if (strings.length) {
    combined.push(strings.join(""));
  }

  return combined;
}
