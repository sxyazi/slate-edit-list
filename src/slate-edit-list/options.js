import { Record } from 'immutable'

/**
 * The plugin options
 */
class Options extends Record({
  types: ['ul_list', 'ol_list'],
  typeItem: 'list_item',
  typeDefault: 'paragraph',
  canMerge: (a, b) => a.type === b.type
}) {}

export default Options
