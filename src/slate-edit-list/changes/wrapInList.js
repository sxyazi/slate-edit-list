import { Data } from 'slate'
import { List } from 'immutable'
import { isList } from '../utils'

/**
 * Wrap the blocks in the current selection in a new list. Selected
 * lists are merged together.
 */
function wrapInList(opts, change, type, data) {
  const selectedBlocks = getHighestSelectedBlocks(change.value)
  type = type || opts.types[0]

  // Wrap in container
  change.wrapBlock(
    {
      type,
      data: Data.create(data)
    },
    { normalize: false }
  )

  // Wrap in list items
  selectedBlocks.forEach(node => {
    if (isList(opts, node)) {
      // Merge its items with the created list
      node.nodes.forEach(({ key }) =>
        change.unwrapNodeByKey(key, { normalize: false })
      )
    } else {
      change.wrapBlockByKey(node.key, opts.typeItem, {
        normalize: false
      })
    }
  })

  return change.normalize()
}

/**
 * Returns the highest list of blocks that cover the current selection
 */
function getHighestSelectedBlocks(value) {
  const range = value.selection
  const { document } = value
  const startBlock = document.getClosestBlock(range.start.key)
  const endBlock = document.getClosestBlock(range.end.key)

  if (startBlock === endBlock) {
    return List([startBlock])
  }
  const ancestor = document.getCommonAncestor(startBlock.key, endBlock.key)
  const startPath = ancestor.getPath(startBlock.key)
  const endPath = ancestor.getPath(endBlock.key)

  return ancestor.nodes.slice(startPath[0], endPath[0] + 1)
}

export default wrapInList
