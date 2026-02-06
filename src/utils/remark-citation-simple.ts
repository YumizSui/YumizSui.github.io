import { visit } from 'unist-util-visit';
import type { Root, Paragraph, Link, Text } from 'mdast';
import type { VFile } from 'vfile';

interface Reference {
  key: string;
  url?: string;
  title?: string;
}

interface CitationMap {
  [key: string]: number;
}

export function remarkCitationSimple() {
  return (tree: Root, file: VFile) => {
    // Get references from frontmatter
    const frontmatter = (file.data.astro as any)?.frontmatter;
    const references: Reference[] = frontmatter?.references || [];
    const lang = frontmatter?.lang || 'ja';
    const referencesHeading = lang === 'en' ? 'References' : '参考文献';

    console.log('[remarkCitationSimple] lang:', lang, 'referencesHeading:', referencesHeading, 'file:', file.path);

    if (references.length === 0) {
      return;
    }

    // Create a map of key -> citation number
    const citationMap: CitationMap = {};
    const citationOrder: string[] = [];

    // First pass: find all [@key] citations and assign numbers
    visit(tree, 'text', (node: Text) => {
      const matches = node.value.matchAll(/\[@([^\]]+)\]/g);
      for (const match of matches) {
        const key = match[1];
        // Check if the key exists in references
        const refExists = references.some(ref => ref.key === key);
        if (refExists && !citationMap[key]) {
          citationMap[key] = citationOrder.length + 1;
          citationOrder.push(key);
        }
      }
    });

    // Second pass: replace [@key] with numbered citations
    visit(tree, 'text', (node: Text, index, parent) => {
      if (!parent || index === null) return;

      const regex = /\[@([^\]]+)\]/g;
      const parts: (Text | Link)[] = [];
      let lastIndex = 0;
      let match;

      while ((match = regex.exec(node.value)) !== null) {
        const key = match[1];
        const citationNum = citationMap[key];

        // Add text before the citation
        if (match.index > lastIndex) {
          parts.push({
            type: 'text',
            value: node.value.slice(lastIndex, match.index),
          });
        }

        // Add the citation as a link if it exists, otherwise skip it
        if (citationNum) {
          parts.push({
            type: 'link',
            url: `#ref-${citationNum}`,
            children: [
              {
                type: 'text',
                value: `[${citationNum}]`,
              },
            ],
          });
        }

        lastIndex = regex.lastIndex;
      }

      // Add remaining text
      if (lastIndex < node.value.length) {
        parts.push({
          type: 'text',
          value: node.value.slice(lastIndex),
        });
      }

      // Replace the node if we found citations
      if (parts.length > 0) {
        parent.children.splice(index, 1, ...parts);
      }
    });

    // Third pass: Add references section at the end
    if (citationOrder.length > 0) {
      // Find and remove existing references section
      let referencesIndex = -1;
      for (let i = tree.children.length - 1; i >= 0; i--) {
        const node = tree.children[i];
        if (node.type === 'heading') {
          if (
            node.children.length > 0 &&
            node.children[0].type === 'text' &&
            (node.children[0].value === '参考文献' || node.children[0].value === 'References')
          ) {
            // Remove everything from this heading to the end
            tree.children.splice(i);
            referencesIndex = i;
            break;
          }
        }
      }

      // If no references section was found, append to the end
      const insertIndex = referencesIndex !== -1 ? referencesIndex : tree.children.length;

      // Create references section
      const referencesSection: (typeof tree.children[number])[] = [
        {
          type: 'heading',
          depth: 2,
          children: [
            {
              type: 'text',
              value: referencesHeading,
            },
          ],
        },
      ];

      // Add each reference as a list item
      const listItems = citationOrder.map((key, idx) => {
        const ref = references.find(r => r.key === key)!;
        const num = idx + 1;

        // Build the reference text
        let refText: (Text | Link)[];

        if (ref.url && ref.title) {
          // Both url and title: title as link text
          refText = [
            {
              type: 'link',
              url: ref.url,
              children: [{ type: 'text', value: ref.title }],
            },
          ];
        } else if (ref.url) {
          // URL only: show URL as link
          refText = [
            {
              type: 'link',
              url: ref.url,
              children: [{ type: 'text', value: ref.url }],
            },
          ];
        } else {
          // Title only: show title as plain text
          refText = [{ type: 'text', value: ref.title! }];
        }

        return {
          type: 'listItem' as const,
          spread: false,
          children: [
            {
              type: 'paragraph' as const,
              children: [
                {
                  type: 'html' as const,
                  value: `<span id="ref-${num}">[${num}]</span> `,
                },
                ...refText,
              ],
            },
          ],
        };
      });

      referencesSection.push({
        type: 'list',
        ordered: false,
        spread: false,
        children: listItems,
      });

      // Insert the references section
      tree.children.splice(insertIndex, 0, ...referencesSection);
    }
  };
}
