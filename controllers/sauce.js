const Sauce = require('../models/Sauce');
const fs = require('fs');


// Get all sauces
exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then((sauces) => { res.status(200).json(sauces); })
    .catch((error) => { res.status(400).json({ error: error }); });
};

// Get only one sauce by Id
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => { res.status(200).json(sauce); })
    .catch((error) => {
      res.status(404).json({ error: error });
    });
};

// Create new sauce
exports.createSauce = (req, res, next) => {
  console.log(req.body.sauce);
  const sauceObject = JSON.parse(req.body.sauce);

  delete sauceObject._id;
  delete sauceObject._userId;
  const sauce = new Sauce({
    ...sauceObject,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
  });

  sauce.save()
    .then(() => { res.status(201).json({ message: 'Sauce saved !' }) })
    .catch(error => { res.status(400).json({ error }) })
};

// Modify existing sauce
exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file ? {
    ...JSON.parse(req.body.sauce),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body };

  delete sauceObject._userId;
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      if (sauce.userId != req.auth.userId) {
        res.status(403).json({ message: '403: unauthorized request.' });
      } else {
        Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
          .then(() => {
            if (req.file) {
              const filename = sauce.imageUrl.split('/images/')[1];
              fs.unlink(`images/${filename}`,
                (err) => {
                  if (err) console.log(err);
                })
            }
            res.status(200).json({ message: 'Sauce modified !' })
          })
          .catch(error => res.status(401).json({ error }));
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

// Delete sauce
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      if (sauce.userId != req.auth.userId) {
        res.status(403).json({ message: '403: unauthorized request.' });
      } else {
        const filename = sauce.imageUrl.split('/images/')[1];
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => {
            fs.unlink(`images/${filename}`,
              (err) => {
                if (err) console.log(err);
                else {
                  res.status(200).json({ message: 'Sauce deleted !' })
                }
              })
          })
          .catch(error => { console.log(error); res.status(401).json({ message: error }) });
      };
    })
    .catch(error => {
      res.status(400).json({ error });
    });
};

// Like and dislike sauce
exports.likeDislike = (req, res, next) => {
  let like = req.body.like;

  if (like === 1) {
    Sauce.findOne({ _id: req.params.id })
      .then(sauce => {
        if (!sauce.usersLiked.includes(req.body.userId)) {
          Sauce.updateOne({ _id: req.params.id }, { $inc: { likes: like++ }, $push: { usersLiked: req.body.userId } })
            .then(() => res.status(200).json({ message: 'Nice one !' }))
            .catch(error => res.status(400).json({ error }));
        } else {
          res.status(400).json({ message: "request error" })
        }
      });
  } else if (like === -1) {
    Sauce.findOne({ _id: req.params.id })
      .then(sauce => {
        if (!sauce.usersDisliked.includes(req.body.userId)) {
          Sauce.updateOne({ _id: req.params.id }, { $inc: { dislikes: like-- }, $push: { usersDisliked: req.body.userId } })
            .then(() => res.status(200).json({ message: 'I\'m too weak for that  !' }))
            .catch(error => res.status(400).json({ error }));
        } else {
          res.status(400).json({ message: "request error" })
        }
      });
  } else {
    Sauce.findOne({ _id: req.params.id })
      .then(sauce => {
        if (sauce.usersLiked.includes(req.body.userId)) {
          Sauce.updateOne({ _id: req.params.id }, { $pull: { usersLiked: req.body.userId }, $inc: { likes: -1 } })
            .then(() => { res.status(200).json({ message: 'Like removed !' }) })
            .catch(error => res.status(400).json({ error }))
        } else if (sauce.usersDisliked.includes(req.body.userId)) {
          Sauce.updateOne({ _id: req.params.id }, { $pull: { usersDisliked: req.body.userId }, $inc: { dislikes: -1 } })
            .then(() => { res.status(200).json({ message: 'Dislike removed !' }) })
            .catch(error => res.status(400).json({ error }))
        }
      })
      .catch(error => res.status(400).json({ error }))
  }
};