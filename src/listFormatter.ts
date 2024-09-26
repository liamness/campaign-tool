// Intl.ListFormat is nice but might not exist on some browsers
// So provide a fallback

let listFormatter = (list: string[]) => list.join(", ");

// @ts-ignore
if (Intl.ListFormat) {
  // @ts-ignore
  const formatter = new Intl.ListFormat("en", {
    style: "long",
    type: "conjunction",
  });

  listFormatter = (list: string[]) => formatter.format(list);
}

export { listFormatter };
