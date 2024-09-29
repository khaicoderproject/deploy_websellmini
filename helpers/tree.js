let count = 0;
function createTree(arr, parentId = "") {
  const tree = [];
  arr.forEach((item) => {
    if (item.parent_id === parentId) {
      count++;
      const newItem = item;
      newItem.index = count;
      const children = createTree(arr, item.id);
      if (children.length > 0) {
        newItem.children = children;
      }
      tree.push(newItem);
    }
  });
  return tree;
}

module.exports.tree = async (records, parentId = "") => {
  count = 0;
  const newRecords = await createTree(records, (parentId = ""));
  return newRecords;
};
