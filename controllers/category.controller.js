function getCategories(req, res) {
//   // Simulate fetching categories from a database
//   const categories = [
//     { id: 1, name: 'Electronics' },
//     { id: 2, name: 'Books' },
//     { id: 3, name: 'Clothing' },
//   ];
  
  res.send("get categories");
}

function createCategory(req, res) {
    res.send("create category")
}

module.exports = {
    getCategories,
    createCategory
}
