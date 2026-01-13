export interface TextSegment {
  text: string;
  shouldFormat: boolean;
}

/**
 * Formats author names by identifying "Furui K" and "古井海里" patterns
 * and marking them for bold and underline formatting.
 *
 * @param authors - The author string to format
 * @returns Array of text segments with formatting metadata
 */
export function formatAuthors(authors: string): TextSegment[] {
  const segments: TextSegment[] = [];

  // Pattern for "Furui K" (with optional space, optional comma/period after K)
  // Matches: "Furui K", "Furui K,", "Furui K."
  const furuiPattern = /Furui\s+K[,.]?/g;

  // Pattern for "古井海里" (with optional comma/period)
  // Matches: "古井海里", "古井海里,", "古井海里."
  const japanesePattern = /古井海里[,.]?/g;

  // Find all matches with their positions
  const matches: Array<{ start: number; end: number; text: string }> = [];

  let match;

  // Find all "Furui K" matches
  while ((match = furuiPattern.exec(authors)) !== null) {
    matches.push({
      start: match.index,
      end: match.index + match[0].length,
      text: match[0]
    });
  }

  // Find all "古井海里" matches
  while ((match = japanesePattern.exec(authors)) !== null) {
    matches.push({
      start: match.index,
      end: match.index + match[0].length,
      text: match[0]
    });
  }

  // Sort matches by position
  matches.sort((a, b) => a.start - b.start);

  // Remove overlapping matches (keep the first one)
  const nonOverlappingMatches: Array<{ start: number; end: number; text: string }> = [];
  for (const match of matches) {
    if (nonOverlappingMatches.length === 0 || match.start >= nonOverlappingMatches[nonOverlappingMatches.length - 1].end) {
      nonOverlappingMatches.push(match);
    }
  }

  // Build segments
  let currentIndex = 0;

  for (const match of nonOverlappingMatches) {
    // Add text before the match
    if (match.start > currentIndex) {
      segments.push({
        text: authors.substring(currentIndex, match.start),
        shouldFormat: false
      });
    }

    // Add the matched text (to be formatted)
    segments.push({
      text: match.text,
      shouldFormat: true
    });

    currentIndex = match.end;
  }

  // Add remaining text after the last match
  if (currentIndex < authors.length) {
    segments.push({
      text: authors.substring(currentIndex),
      shouldFormat: false
    });
  }

  // If no matches found, return the entire string as one segment
  if (segments.length === 0) {
    segments.push({
      text: authors,
      shouldFormat: false
    });
  }

  return segments;
}

