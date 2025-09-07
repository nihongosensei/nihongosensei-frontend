import clsx from "clsx";
import { type ChangeEvent, useCallback } from "react";
import type { FuriganaModel } from "~services/FuriganaService";
import { Ruby } from "../Ruby";

export type JapaneseTextInputProps = {
  onRubyClick: (model: FuriganaModel) => void;
  value?: string | null;
  furigana?: ReadonlyArray<FuriganaModel | string> | null;
  onChange?: (value: string) => void;
  textSize?: number;
};

const TEXT_SIZE_MAP: Record<number, string> = {
  70: "text-[70%]",
  80: "text-[80%]",
  90: "text-[90%]",
  100: "text-[100%]",
  110: "text-[110%]",
  120: "text-[120%]",
  130: "text-[130%]",
  140: "text-[140%]",
  150: "text-[150%]",
};

export function JapaneseTextInput({
  onRubyClick,
  value,
  furigana,
  onChange,
  textSize = 100,
}: JapaneseTextInputProps) {
  const changeHandler = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => onChange?.(e.target.value),
    [onChange],
  );

  return (
    <div
      className={clsx(
        "relative min-h-full leading-[2]",
        TEXT_SIZE_MAP[textSize],
      )}
    >
      <textarea
        value={value ?? ""}
        onChange={changeHandler}
        className="outline-hidden bg-transparent resize-none overflow-hidden absolute inset-0"
        placeholder="Tippen Sie japanischen Text ein..."
        lang="ja"
        autoFocus={true}
      />
      {furigana && (
        <Ruby
          furigana={furigana}
          className="min-h-full w-full whitespace-pre-wrap inset-0 pointer-events-none"
          onClick={onRubyClick}
        />
      )}
    </div>
  );
}
