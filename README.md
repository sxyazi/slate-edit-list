# slate-edit-list

[![NPM version](https://badge.fury.io/js/slate-edit-list.svg)](http://badge.fury.io/js/slate-edit-list)
[![Linux Build Status](https://travis-ci.org/GitbookIO/slate-edit-list.png?branch=master)](https://travis-ci.org/GitbookIO/slate-edit-list)

A Slate plugin to handle keyboard events in lists. List items can contain blocks.

### Install

```
npm install slate-edit-list
```

### Features

Classic keybindings:

- Pressing <kbd>Enter</kbd> insert a new list item
- Pressing <kbd>Shift+Enter</kbd> split the block in the list item
- Pressing <kbd>Tab</kbd> increase the depth of the item (creates a sub-list)
- Pressing <kbd>Shift+Tab</kbd> decrease the depth of the item
- Pressing <kbd>Delete</kbd> at the start, remove the list item (or the list)

Simple validation/normalization:

- Lists can contain only list items, and at least one.
- List items can only be the direct children of a list.

Useful transforms: see [Utilities and Transform](#utilities-and-transform).

### Simple Usage

```js
import EditList from 'slate-edit-list'

const plugins = [
  EditList()
]
```

#### Arguments

- ``[typeUL: String]`` — type for bulleted lists.
- ``[typeOL: String]`` — type for numbered lists.
- ``[typeItem: String]`` — type for list items.

### Utilities and Transform

`slate-edit-list` exports utilities and transforms:

#### `utils.isSelectionInList`

`plugin.utils.isSelectionInList(state: State) => Boolean`

Return true if selection is inside a list (and it can be unwrap).

#### `transforms.wrapInList`

`plugin.transforms.wrapInList(transform: Transform, ordered: Boolean?) => Transform`

Wrap current block in a new list.

#### `transforms.unwrapList`

`plugin.transforms.unwrapList(transform: Transform, ordered: Boolean?) => Transform`

Unwrap block of current list.

#### `transforms.splitListItem`

`plugin.transforms.splitListItem(transform: Transform) => Transform`

Split current block into a new list item.
