const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll({
    include: [ { model: Product }]
  })
    .then(dbCategory => res.json(dbCategory))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  // find all categories
  // be sure to include its associated Products
});

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
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name
  })
    .then(dbCategoryName => res.json(dbCategoryName))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  // create a new category
});

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
  // update a category by its `id` value
});

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
  // delete a category by its `id` value
});

module.exports = router;
