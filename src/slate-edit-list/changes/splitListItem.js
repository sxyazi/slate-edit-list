import { getCurrentItem } from '../utils'

/**
 * Split a list item at the start of the current range.
 */
function splitListItem(opts, editor) {
  const { value } = editor
  const currentItem = getCurrentItem(opts, value)
  if (!currentItem) {
    return editor
  }

  const { selection } = value

  return editor.splitDescendantsByKey(
    currentItem.key,
    selection.start.key,
    selection.start.offset
  )
}

export default splitListItem
