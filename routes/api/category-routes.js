const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// find all categories and the products in each
router.get('/', (req, res) => {
  Category.findAll({
    include: [ { model: Product }]
  })
    .then(dbCategory => res.json(dbCategory))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });   
});

// find one category by its `id` value and the products associated 
router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: [{ model: Product }]
  })
    .then(dbCategoryId => {
      if (!dbCategoryId) {
        res.status(404).json({ message: 'No category found with this id' });
        return;
      }
      res.json(dbCategoryId);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });  
});

// create a new category
router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name
  })
    .then(dbCategoryName => res.json(dbCategoryName))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });  
});

// update a category by its `id` value
router.put('/:id', (req, res) => {
  Category.update({
      category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id
      }
    })
    .then(dbUpdateCategory => {
      if(!dbUpdateCategory) {
        res.status(404).json({ message: 'No category found with this id '});
        return;
      }
      res.json(dbUpdateCategory);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });  
});

// delete a category by its `id` value
router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbDeleteCategory => {
    if(!dbDeleteCategory) {
      res.status(404).json({ message: 'No category found with this id' });
      return;
    }
    res.json(dbDeleteCategory);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });  
});

module.exports = router;
