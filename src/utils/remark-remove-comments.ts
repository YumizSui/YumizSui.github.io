import { visit } from 'unist-util-visit';
import type { Root } from 'mdast';

/**
 * Remark plugin to remove HTML comments from markdown
 */
export function remarkRemoveComments() {
  return (tree: Root) => {
    visit(tree, 'html', (node, index, parent) => {
      if (parent && typeof index === 'number') {
        // Check if the node is an HTML comment
        if (node.value.trim().startsWith('<!--') && node.value.trim().endsWith('-->')) {
          // Remove the comment node
          parent.children.splice(index, 1);
          return index; // Return the current index to visit the next node at the same position
        }
      }
    });
  };
}
