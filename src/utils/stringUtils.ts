export function truncateText(text: string, maxLength: number = 100): string {
  if (text.length <= maxLength) return text;

  // Find the last space before maxLength
  const trimmedText = text.slice(0, maxLength).trim();
  const lastSpaceIndex = trimmedText.lastIndexOf(" ");

  // Cut at the last space if possible, otherwise cut at maxLength
  return (
    (lastSpaceIndex > 0 ? trimmedText.slice(0, lastSpaceIndex) : trimmedText) +
    "..."
  );
}
