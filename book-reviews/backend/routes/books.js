const express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'), // mongodb connection
    bodyParser = require('body-parser'), // parse info from POST
    methodOverride = require('method-override');  // used to manipulate POST data
const BOOK = mongoose.model('Book');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(methodOverride( (req) => {
    if (req.body && typeof req.body == 'object' && '_method' in req.body) {
        const method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

function handleError(err, res, msg, statusCode) {
    res.status(statusCode);
    err.status = statusCode;
    err.message = msg;
    res.json({ message: err.status + ' ' + err }); 
}

// DONE: Complete this function
function createReview(req, res, book) {
    const thisReview = req.body;
    book.reviews.push(thisReview);

    // Create an object to add to the array of reviews for this book.
    // add the object to the array using the push method, just a JS array of reviews
    // save the book and do error checking

    book.save( (err, book) => {
        if (err) {
            handleError(err, res, 'Could not add Review', 400);
        } else {
            res.json(book.reviews);
        }
    });
}

// DONE: Complete this function
function deleteReview(req, res, book) {
    const thisReviewId = book.reviews.filter( (review) => {
        return review._id == req.params.reviewid;
    })[0]._id;
    const thisReviewIndex = findReviewId(book, thisReviewId);

    if (thisReviewIndex < 0) {
        handleError(new Error(), res, 'Could not delete Review', 400);
    } else {
        book.reviews.splice(thisReviewIndex, 1);
        book.save( (err, book) => {
            if (err) {
                handleError(err, res, 'Could not delete Review', 400);
            } else {
                res.json(book.reviews);
            }
        });
    }
}

function findReviewId(book, reviewId) {
    for (let i = 0; i < book.reviews.length; i++) {
        const curReview = book.reviews[i];
        if (reviewId == curReview._id) {
            return i;
        }
    }
    return -1;
}

function updateReview(req, res, book) {
    let thisReview;
    if (book.reviews.length) {
        thisReview = book.reviews.filter( (review) => {
            return review._id == req.params.reviewid;
        })[0];

        if (!thisReview) {
            handleError(new Error(), res, 'Not Found', 404);
        } else {
            thisReview.review = req.body.review;
            thisReview.author = req.body.author;
            thisReview.when = req.body.when;
            thisReview.stars = req.body.stars;
            book.save( (err, book) => {
                if (err) {
                    handleError(err, res, 'Could not update Review', 400);
                } else {
                    res.json(book.reviews.filter( (review) => {
                        return review._id == req.params.reviewid;
                    })[0]);
                }
            });
        }
    } else {
        handleError(new Error(), res, 'Could not update Review', 400);
    }
}

// READY to build our API
router.route('/')
    // GET all books
    .get( (req, res) => {
        BOOK.find({},  (err, books) => {
            if (err) {
                handleError(err, res, 'Not Found', 404);
            } else {
                res.json(books);
            }
        });
    })
    // TODO: ADD a book
    .post((req, res) => {
        // This is just a start of what you need to do
        BOOK.create({
            isbn: req.body.isbn,
            title: req.body.title,
            author: req.body.author,
            coverImage: req.body.coverImage,
            printType: req.body.printType,
            pageCount: req.body.pageCount,
            publisher: req.body.publisher,
            publishedDate: req.body.publishedDate,
            webReaderLink: req.body.webReaderLink,
            reviews: [] // Initially has no reviews
        },
        (err, book) => {
            if (err) {
                handleError(err, res, 'Problem creating Book', 400);
            } else {
                res.json(book);
            }
        });

    });

router.route('/:bookid')
    // GET book by id
    .get( (req, res) => {
        if (req.params && req.params.bookid) {
            BOOK.findById(req.params.bookid, (err, book) => {
                if (err) {
                    handleError(err, res, 'Not Found', 404);
                } else {
                    res.json(book); 
                }
            });
        } else {
            handleError(new Error(), res, 'GET error, problem retrieving data', 404);
        }
    });

router.route('/:bookid/reviews')
    // DONE CREATE a review for this book. Use JavaScript to update the reviews array.
    .post( (req, res) => {
        if (req.params && req.params.bookid) {
            BOOK.findById(req.params.bookid, (err, book) => {
                if (err) {
                    handleError(err, res, 'Book Not Found', 404);
                } else {
                    createReview(req, res, book);
                }
            });
        } else {
            handleError({}, res, 'GET error, problem retrieving data', 404);
        }
    });

router.route('/:bookid/reviews/:reviewid')
    // UPDATE single review for single book.
    // Get book first, then use JavaScript to search for the review
    .put( (req, res) => {
        if (req.params.bookid && req.params.reviewid) {
            BOOK.findById(req.params.bookid,  (err, book) => {
                if (err) {
                    handleError(err, res, 'Book Not Found', 404);
                } else {
                    updateReview(req, res, book);
                }
            });
        } else {
            handleError(new Error(), res, 'GET error, problem retrieving data', 404);
        }
    })
    // DONE: DELETE single review for single book
    // Get book first, then use JavaScript to search for the review
    // Remove review from array and save book
    .delete( (req, res) => {
        if (req.params.bookid && req.params.reviewid) {
            BOOK.findById(req.params.bookid, (err, book) => {
                if (err) {
                    handleError(err, res, 'Book Not Found', 404);
                } else {
                    deleteReview(req, res, book);
                }
            });
        } else {
            handleError(new Error(), res, 'GET error, problem retrieving data', 404);
        }
    });

module.exports = router;
