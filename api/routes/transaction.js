const router = require('express').Router();
const Transaction = require('../models/Transaction');

//CREATE
router.post('/', async (req, res) => {
  console.log('Going to create a new transaction...');
  console.log(req.body);

  try {
    let savedTransaction = null;
    const transExists = await Transaction.exists({ date: req.body.date });
    if (transExists) {
      savedTransaction = await Transaction.findOneAndUpdate(
        { date: req.body.date },
        { $push: { items: req.body.items } },
        {
          returnOriginal: false,
        }
      );
    } else {
      console.log('The date not exists in db yet...');
      const newTransaction = new Transaction(req.body);
      savedTransaction = await newTransaction.save();
    }
    res.status(201).json(savedTransaction);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//GET ALL
router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({
      date: 1,
    });
    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET by date/trans_id
router.get('/find/:trans_id', async (req, res) => {
  try {
    console.log(
      `Going to get the targeted transaction date with id : ${req.params.trans_id}`
    );
    const transactions = await Transaction.findById(req.params.trans_id);
    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET by date
router.get('/find/date/:date', async (req, res) => {
  try {
    const targetDate = new Date(req.params.date);

    console.log(
      `Going to get the targeted transaction date with date : ${targetDate}`
    );

    const transactions = await Transaction.find({ date: targetDate });

    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET specific transaction
router.get('/find/specific/:id', async (req, res) => {
  try {
    console.log(
      `Going to get the targeted transaction with id : ${req.params.id}`
    );
    //var fields = { 'properties.OBJECTID': 1, 'properties.TIMESTAMP': 1 };
    //query.where('comment').elemMatch({ author: 'autobot', votes: {$gte: 5}})

    const transactions = await Transaction.find(
      { 'items._id': req.params.id },
      { 'items.$': 1, date: 1 }
    );

    //console.log(`this is the type ${typeof transactions}`);
    console.log(`this is the ${JSON.stringify(transactions)}`);
    //
    var data_filter = transactions.filter((element) => {
      console.log(`${element.items.account}`);
      element.items._id == req.params.id;
    });

    console.log(`Transaction is ${JSON.stringify(data_filter)}`);

    res.status(200).json(transactions);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//UPDATE specific item
router.put('/:trans_id/:id', async (req, res) => {
  try {
    // need to see if the updated date is same or different with the existing one
    const exists = await Transaction.findById({ _id: req.params.trans_id });
    var mydate = new Date(req.body.date);
    console.log(`db date is ${JSON.stringify(exists.date)}`);
    console.log(`my date is ${JSON.stringify(mydate)}`);

    if (exists.date.toDateString() == mydate.toDateString()) {
      console.log('Date is not updated for the transaction');
      const updatedTrans = await Transaction.findOneAndUpdate(
        { date: req.body.date },
        {
          $set: {
            'items.$[outer]': req.body.items,
          },
        },
        { arrayFilters: [{ 'outer._id': req.params.id }] }
      );
    } else {
      // need to delete and recreate to tie with new date object
      console.log('gg');
      const updatedTrans = await Transaction.findOneAndUpdate(
        { _id: req.params.trans_id },
        {
          $pull: {
            items: { _id: req.params.id },
          },
        }
      );

      // create a new one if the date object not exists
      try {
        let savedTransaction = null;
        const transExists = await Transaction.exists({ date: req.body.date });
        if (transExists) {
          savedTransaction = await Transaction.findOneAndUpdate(
            { date: req.body.date },
            { $push: { items: req.body.items } }
          );
        } else {
          console.log('not exists');
          console.log(`${JSON.stringify(req.body)}`);
          const newTransaction = new Transaction(req.body);
          savedTransaction = await newTransaction.save();
        }
      } catch (err) {
        res.status(500).json(err);
      }
    }
    // successfully updated
    res.status(200).json('Transaction has been updated ...');
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//DELETE
router.delete('/:trans_id/:id', async (req, res) => {
  try {
    //check if the data exists in the db
    const exists = await Transaction.find({
      items: { $elemMatch: { _id: req.params.id } },
    });

    console.log(`Exist length is ${exists.length}`);
    console.log(`Exist object is ${JSON.stringify(exists)}`);

    if (exists.length > 0) {
      console.log(`Going to delete the transaction with id : ${req.params.id}`);
      const updatedTrans = await Transaction.findOneAndUpdate(
        { _id: req.params.trans_id },
        {
          $pull: {
            items: { _id: req.params.id },
          },
          multi: true,
        }
      );
      console.log(`${JSON.stringify(updatedTrans)}`);
      res.status(200).json('Transaction has been deleted ...');
    } else {
      res.status(200).json('Targeted transaction is not found ...');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
