export interface TextSegment {
  text: string;
  shouldFormat: boolean;
}

function isCJK(name: string): boolean {
  return /[\u3000-\u9fff\uff00-\uffef]/.test(name);
}

/**
 * Abbreviates an English full name to "LastName FirstInit [MiddleInit...]" format.
 * Handles † marker: strips it, abbreviates, re-adds.
 * Examples:
 *   "Kairi Furui"   → "Furui K"
 *   "Kairi Furui†"  → "Furui K†"
 */
function abbreviateName(fullName: string): string {
  const marker = fullName.endsWith('†') ? '†' : '';
  const name = marker ? fullName.slice(0, -1) : fullName;
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return fullName;
  const lastName = parts[parts.length - 1];
  const firstMiddle = parts.slice(0, -1);
  const initials = firstMiddle.map(p => p[0]).join(' ');
  return `${lastName} ${initials}${marker}`;
}

/**
 * Formats an array of author full names into display text with formatting metadata.
 * - CJK names are kept as-is
 * - English names are abbreviated to "LastName FirstInit [MiddleInit...]" format
 * - Self-author (Furui K / 古井海里) is highlighted with bold+underline
 * - Names are joined with ", " and terminated with "."
 *
 * @param authors - Array of author full names
 * @returns Array of text segments with formatting metadata
 */
export function formatAuthors(authors: string[]): TextSegment[] {
  const displayNames = authors.map(name =>
    isCJK(name) ? name : abbreviateName(name)
  );

  const joined = displayNames.join(', ') + '.';

  const selfPatterns = ['Furui K', '古井海里'];
  const matches: Array<{ start: number; end: number }> = [];

  for (const pattern of selfPatterns) {
    let idx = 0;
    while (true) {
      const pos = joined.indexOf(pattern, idx);
      if (pos === -1) break;
      matches.push({ start: pos, end: pos + pattern.length });
      idx = pos + pattern.length;
    }
  }

  matches.sort((a, b) => a.start - b.start);

  const nonOverlapping: Array<{ start: number; end: number }> = [];
  for (const m of matches) {
    if (nonOverlapping.length === 0 || m.start >= nonOverlapping[nonOverlapping.length - 1].end) {
      nonOverlapping.push(m);
    }
  }

  const segments: TextSegment[] = [];
  let currentIndex = 0;

  for (const m of nonOverlapping) {
    if (m.start > currentIndex) {
      segments.push({ text: joined.substring(currentIndex, m.start), shouldFormat: false });
    }
    segments.push({ text: joined.substring(m.start, m.end), shouldFormat: true });
    currentIndex = m.end;
  }

  if (currentIndex < joined.length) {
    segments.push({ text: joined.substring(currentIndex), shouldFormat: false });
  }

  if (segments.length === 0) {
    segments.push({ text: joined, shouldFormat: false });
  }

  return segments;
}
