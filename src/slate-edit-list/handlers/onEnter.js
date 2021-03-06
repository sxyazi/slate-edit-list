import { unwrapList, splitListItem, decreaseItemDepth } from '../changes'
import { getCurrentItem, getItemDepth } from '../utils'

/**
 * User pressed Enter in an editor
 *
 * Enter in a list item should split the list item
 * Enter in an empty list item should remove it
 * Shift+Enter in a list item should make a new line
 */
function onEnter(event, editor, next, opts) {
  // Pressing Shift+Enter
  // should split block normally
  if (event.shiftKey) {
    return next()
  }

  const { value } = editor
  const currentItem = getCurrentItem(opts, value)

  // Not in a list
  if (!currentItem) {
    return next()
  }

  event.preventDefault()

  // If expanded, delete first.
  if (value.selection.isExpanded) {
    editor.delete()
  }

  if (!editor.isVoid(currentItem) && currentItem.text === '') {
    // Block is empty, we exit the list
    if (getItemDepth(opts, value) > 1) {
      return decreaseItemDepth(opts, editor)
    }
    // Exit list
    return unwrapList(opts, editor)
  }
  // Split list item
  return splitListItem(opts, editor)
}

export default onEnter
