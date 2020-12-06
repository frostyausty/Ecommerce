const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// find all tags and the associated product data
router.get('/', (req, res) => {
  Tag.findAll({
    include: [{ 
        model: Product,
        as: 'tag_product'  
      }]    
  })
    .then(dbTag => res.json(dbTag))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// find a single tag by its `id` and its associated product data
router.get('/:id', (req, res) => {
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: [{
        model: Product,
        as: 'tag_product' 
      }]
  })
    .then(dbTag => {
      if (!dbTag) {
        res.status(404).json({ message: 'No tag found with this id' });
        return;
      }
      res.json(dbTag);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });  
});

 // create a new tag
router.post('/', (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name
  })
    .then(dbTag => res.json(dbTag))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// update a tag's name by its `id` value
router.put('/:id', (req, res) => {
  Tag.update({
    tag_name: req.body.tag_name
  },
  {
    where: {
      id: req.params.id
    }
  })
  .then(dbTag => {
    if(!dbTag) {
      res.status(404).json({ message: 'No tag found with this id '});
      return;
    }
    res.json(dbTag);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });  
});

// delete on tag by its `id` value
router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbTag => {
    if(!dbTag) {
      res.status(404).json({ message: 'No tag found with this id' });
      return;
    }
    res.json(dbTag);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });  
});

module.exports = router;
