function BinaryTree() {
  var root = null

  // 生成二叉树
  this.node = function(key) {
    this.key = key
    this.left = this.right = null
  }

  this.insert = function(key) {
    var newNode = new this.node(key)
    if (root === null) {
      root = newNode
    } else {
      insertNode(root, newNode)
    }
  }

  var insertNode = function(node, newNode) {
    if (node.key > newNode.key) {
      if (node.left === null) {
        node.left = newNode
      } else {
        insertNode(node.left, newNode)
      }
    } else {
      if (node.right === null) {
        node.right = newNode
      } else {
        insertNode(node.right, newNode)
      }
    }
  }

  // 中序遍历
  this.inorderTraversal = function(callback) {
    inorderTraversalNode(root, callback)
  }

  var inorderTraversalNode = function(node, callback) {
    if (node !== null) {
      inorderTraversalNode(node.left, callback)
      callback(node.key)
      inorderTraversalNode(node.right, callback)
    }
  }

  // 前序遍历
  this.preorderTraversal = function(callback) {
    preorderTraversalNode(root, callback)
  }

  var preorderTraversalNode = function(node, callback) {
    if (node !== null) {
      callback(node.key)
      preorderTraversalNode(node.left, callback)
      preorderTraversalNode(node.right, callback)
    }
  }

  // 后序遍历
  this.postorderTraversal = function(callback) {
    postorderTraversalNode(root, callback)
  }

  var postorderTraversalNode = function(node, callback) {
    if (node !== null) {
      postorderTraversalNode(node.left, callback)
      postorderTraversalNode(node.right, callback)
      callback(node.key)
    }
  }

  // 查找最小值
  this.min = function() {
    return minNode(root)
  }

  var minNode = function(node) {
    if (node) {
      while (node && node.left !== null) {
        node = node.left
      }
      return node.key
    }
    return null
  }

  // 查找最大值
  this.max = function() {
    return maxNode(root)
  }

  var maxNode = function(node) {
    if (node) {
      while (node && node.right !== null) {
        node = node.right
      }
      return node.key
    }
    return null
  }

  // 查找指定值
  this.search = function(value) {
    return searchNode(value, root)
  }

  var searchNode = function(value, node) {
    if (node === null) {
      return false
    }
    if (node.key > value) {
      return searchNode(value, node.left)
    }else if (node.key < value) {
      return searchNode(value, node.right)
    }else {
      return true
    }
  }

  // 删除指定节点
  this.remove = function(value) {
    return removeNode(value, root)
  }

  var removeNode = function(value, node) {
    if (node === null) {
      return null
    }
    if (node.key > value) {
      node.left = removeNode(value, node.left)
      return node
    }else if (node.key < value) {
      node.right = removeNode(value, node.right)
      return node
    }else {
      if (node.left === null && node.right === null) {
        node = null
        return node
      }
      if (node.left === null) {
        node = node.right
        return node
      } else if (node.right === null) {
        node = node.left
        return node
      } else {
        // ..................... 待改
        var left = node.left
        while (left !== null) {
          left = left.left
        }
        node.key = left.key
        left = null
        return
        // .....................
      }
    }
  }
}

// 排序二叉树
var nodes = [8, 3, 10, 1, 6, 14, 4, 7, 13]
var binaryTree = new BinaryTree()
nodes.forEach(function(key) {
  binaryTree.insert(key)
})

// 中序遍历
// 中序遍历排序二叉树，排序结果是递增的
var callback = function(key) {
  console.log(key)
}
binaryTree.inorderTraversal(callback)

// 前序遍历
// 想要复制一个二叉树时，前序遍历效果最好
// 前序遍历二叉树来复制，比重新构造一个二叉树快得多
binaryTree.preorderTraversal(callback)

// 后序遍历
// 可用于操作系统文件的遍历中
binaryTree.postorderTraversal(callback)

// 二叉树查找
// 最小值：根节点出发，不断进入左孩子节点，直至无左孩子
console.log('min node is ' + binaryTree.min())

// 最大值：根节点出发，不断进入右孩子节点，直至无右孩子
console.log('max node is ' + binaryTree.max())
// 指定值：根节点出发，指定值比节点小，则查找左节点，指定值比节点大，则查找右节点
var search = 7
console.log(search + ' is in binaryTree? ' + binaryTree.search(search))
var search = 99
console.log(search + ' is in binaryTree? ' + binaryTree.search(search))