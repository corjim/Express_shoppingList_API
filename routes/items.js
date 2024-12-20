const Item = require('../item');
const express = require('express');

const router = express.Router();

/** GET / => [item, ...] */

router.get('', (req, res, next) => {
  try {
    return res.json({ items: Item.findAll() });
  } catch (err) {
    return next(err)
  }
});

/** POST / {name, price} => new-item */

router.post('', (req, res, next) => {
  try {
    let newItem = new Item(req.body.name, req.body.price);
    return res.json({ item: newItem });
  } catch (err) {
    return next(err)
  }
});

/** GET /[name] => item */

router.get('/:name', (req, res, next) => {
  try {
    let foundItem = Item.find(req.params.name);
    return res.json({ item: foundItem });
  } catch (err) {
    return next(err)
  }
});

/** PATCH /[name] => item */

router.patch('/:name', (req, res, next) => {
  try {
    let foundItem = Item.update(req.params.name, req.body);
    return res.json({ item: foundItem });
  } catch (err) {
    return next(err)
  }
});

/** DELETE /[name] => "Removed" */

router.delete('/:name', (req, res, next) => {
  try {
    Item.remove(req.params.name);
    return res.json({ message: 'Deleted' });
  } catch (err) {
    return next(err)
  }
});

module.exports = router;

// THE CODE BELOW ALSO ACCOMPLISH THE SAME TASK, ITS JUST MORE DIRECT AND SELF EXPLANATORY.



// // GET /items - Get all items
// router.get("/", (req, res) => {
//   return res.json(items);
// });

// // POST /items - Add an item
// router.post("/", (req, res) => {
//   const { name, price } = req.body;
//   if (!name || !price) {
//     return res.status(400).json({ error: "Name and price are required" });
//   }
//   const newItem = { name, price };
//   items.push(newItem);
//   return res.status(201).json({ added: newItem });
// });

// // GET /items/:name - Get a single item by name
// router.get("/:name", (req, res) => {
//   const item = items.find(i => i.name === req.params.name);
//   if (!item) {
//     return res.status(404).json({ error: "Item not found" });
//   }
//   return res.json(item);
// });

// // PATCH /items/:name - Update an item by name
// router.patch("/:name", (req, res) => {
//   const item = items.find(i => i.name === req.params.name);
//   if (!item) {
//     return res.status(404).json({ error: "Item not found" });
//   }
//   const { name, price } = req.body;
//   if (name !== undefined) item.name = name;
//   if (price !== undefined) item.price = price;
//   return res.json({ updated: item });
// });

// // DELETE /items/:name - Delete an item by name
// router.delete("/:name", (req, res) => {
//   const itemIndex = items.findIndex(i => i.name === req.params.name);
//   if (itemIndex === -1) {
//     return res.status(404).json({ error: "Item not found" });
//   }
//   items.splice(itemIndex, 1);
//   return res.json({ message: "Deleted" });
// });

// module.exports = router;

