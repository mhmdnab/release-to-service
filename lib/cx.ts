/** Join class names, skipping falsy values. */
export function cx(...parts: ReadonlyArray<string | false | null | undefined>): string | undefined {
  const s = parts.filter(Boolean).join(" ");
  return s === "" ? undefined : s;
}
