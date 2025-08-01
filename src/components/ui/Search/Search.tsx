import { useRouter } from "next/router";
import {
  type FormEvent,
  type HTMLProps,
  useCallback,
  useEffect,
  useState,
} from "react";

type SearchProps = Pick<HTMLProps<HTMLFormElement>, "className" | "style"> &
  Pick<HTMLProps<HTMLInputElement>, "autoFocus">;

export function Search({ autoFocus, ...formProps }: SearchProps) {
  const router = useRouter();
  const defaultValue = router.query.q ?? "";
  const [value, setValue] = useState(defaultValue ?? "");
  const submitHandler = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      router
        .push({
          pathname: "/search",
          query: {
            q: value,
          },
        })
        .catch(console.error);
    },
    [router, value],
  );
  const handleChange: NonNullable<HTMLProps<HTMLInputElement>["onChange"]> =
    useCallback((e) => setValue(e.currentTarget.value), []);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return (
    <form action="/search" method="get" onSubmit={submitHandler} {...formProps}>
      <input
        type="text"
        value={value}
        placeholder="Einträge suchen..."
        onChange={handleChange}
        className="w-full px-3 py-2 bg-transparent text-black dark:text-white border border-neutral-300 dark:border-neutral-700 rounded-sm outline-hidden focus:border-neutral-500"
        autoFocus={autoFocus}
      />
    </form>
  );
}
