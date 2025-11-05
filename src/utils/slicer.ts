export default function slicer(text: string, slice: boolean) {
  if (text.length <= 100) return text;
  if (!slice) return text;
  return text.slice(0, 100) + "...";
}
