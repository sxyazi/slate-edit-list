import { unwrapList } from '../changes'
import { getCurrentItem } from '../utils'

/**
 * User pressed Delete in an editor
 */
function onBackspace(event, editor, next, opts) {
  const { value } = editor
  const { start, isCollapsed, isExpanded } = value.selection

  // Only unwrap...
  // ... with a collapsed selection
  if (isExpanded) {
    return next()
  }

  // ... when at the beginning of nodes
  if (start.offset > 0) {
    return next()
  }
  // ... in a list
  const currentItem = getCurrentItem(opts, value)
  if (!currentItem) {
    return next()
  }
  // ... more precisely at the beginning of the current item
  if (!isCollapsed || !start.isAtStartOfNode(currentItem)) {
    return next()
  }

  event.preventDefault()
  return unwrapList(opts, editor)
}

export default onBackspace
