const express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'), // parse info from POST body
    methodOverride = require('method-override');  // used to manipulate POST data
const SHOW = require('../models/shows');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(methodOverride( (req) => {
    if (req.body && typeof req.body == 'object' && '_method' in req.body) {
        const method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

/* Find the last element of given array and return it. */
function lastElementOf(arr) {
    return arr[arr.length - 1];
}

/*  Error handling function.  Invoke with error information. */
function handleError(err, res, msg, statusCode) {
    res.status(statusCode);
    err.status = statusCode;
    err.message = `${err.status}, ${msg}. ${err.message}`;
    res.json(err);
}

/*  DONE: Create a member entry for the given show and update 
 *  show with new entry. Use JavaScript to populate the 
 *  members array with the new member entry.
 * */
function createMember(req, res, show) {
    const thisMember = req.body;
    show.members.push(thisMember);

    show.save( (err, show) => {
        if (err) {
            handleError(err, res, 'Could not add Member', 400);
        } else {
            res.json(show.members);
        }
    });
}

/*  DONE: Remove a member entry from the given show and save the show to 
 *  persist that change. 
 *  Consider using JavaScript to search for the member entry to delete.
 *  Be careful about how you compare object IDs.
 *  The IDs are actually objects. Call the toString() method on them
 *  before comparing them. 
 * */
function deleteMember(req, res, show) {
    const thisMemberId = show.members.filter( (member) => {
        console.log(member._id, req.params.memberId);
        return member._id == req.params.memberId;
    })[0]._id;
    const thisMemberIndex = findMemberId(show, thisMemberId);  
    console.log(thisMemberId);
    if (thisMemberIndex < 0) {
        handleError(new Error('Bad request error.'), res, 'Could not delete Member', 400);
    } else {
        show.members.splice(thisMemberIndex, 1);
        show.save( (err, show) => {
            if (err) {
                handleError(err, res, 'Could not delete Review', 400);
            } else {
                res.json(show.members);
            }
        });
    }
}

function findMemberId(show, memberId) {
    for (let i = 0; i < show.members.length; i++) {
        const curReview = show.members[i];
        if (memberId == curReview._id) {
            return i;
        }
    }
    return -1;
}

/*  DONE: Update a member entry of the given show and save the show to 
 *  persist that change. 
 *  Consider using JavaScript to search for the member entry to update.
 *  Be careful about how you compare object IDs.
 *  The IDs are actually objects. Call the toString() method on them
 *  before comparing them.
 * */
function updateMember(req, res, show) {
    let thisMember;
    if (show.members.length) {
        thisMember = show.members.filter( (member) => {
            return member._id == req.params.memberId;
        })[0];
        console.log(thisMember, req.body);

        if (!thisMember) {
            handleError(new Error(), res, 'Not Found', 404);
        } else {
            // thisMember = req.body;
            thisMember.name = req.body.name;
            thisMember.email = req.body.email;
            thisMember.note = req.body.note;

            show.save( (err, show) => {
                if (err) {
                    handleError(err, res, 'Could not update Show', 400);
                } else {
                    res.json(show.members.filter( (member) => {
                        return member._id == req.params.memberId;
                    })[0]);
                }
            });
        }
    } else {
        handleError(new Error('Not found error.'), res, 'No Member to update', 400);
    }
}

// BUILD THE REST API HERE
router.route('/')

    // GET all shows
    .get( (req, res) => {
        SHOW.find({},  (err, shows) => {
            if (err) {
                handleError(err, res, 'Shows Not Found', 404);
            } else {
                res.json(shows);
            }
        });
    })

    // ADD a new show
    .post((req, res) => {
        SHOW.create({
            name: req.body.name,
            location: req.body.location,
            start: new Date(req.body.start),
            end: new Date(req.body.end),
            members: []
        }, (err, show) => {
            if (err) {
                handleError(err, res, 'Could not save the show in the database', 500);
            } else {
                res.json(show);
            }
        });
    });

router.route('/:showId')

    // GET a show by id
    .get( (req, res) => {
        if (req.params && req.params.showId) {
            SHOW.findById(req.params.showId, (err, show) => {
                if (err) {
                    handleError(err, res, 'Show Not Found', 404);
                } else {
                    res.json(show);
                }
            });
        } else {
            handleError(new Error('Not found error.'), res, 'Unable to fetch show', 404);
        }
    });

router.route('/:showId/members')
    // DONE: CREATE a new member entry for this show.
    // Be sure to call handleError() and createMember() as appropriate
    .post( (req, res) => {
        if (req.params && req.params.showId) {
            SHOW.findById(req.params.showId, (err, show) => {
                if (err) {
                    handleError(err, res, 'Show Not Found', 404);
                } else {
                    createMember(req, res, show);
                }
            });
        } else {
            handleError(new Error('Not found error.'), res, 'Unable to fetch show to add member entry', 404);
        }
    });

router.route('/:showId/members/:memberId')

    // DONE: UPDATE a single member entry for a single show.
    // Hint: Get the show first. 
    // Be sure to call handleError() and updateMember() as appropriate.
    .put( (req, res) => {
        if (req.params.showId && req.params.memberId) {
            SHOW.findById(req.params.showId, (err, show) => {
                if (err) {
                    handleError(err, res, 'Show Not Found', 404);
                } else {
                    updateMember(req, res, show);
                }
            });
        } else {
            handleError(new Error('Not found error'), res, 'Unable to fetch show/member to update', 404);
        }
    })

    // DONE: DELETE a single member entry for a single show.
    // Hint: Get the show first.
    // Be sure to call handleError() and deleteMember() as appropriate.
    .delete( (req, res) => {
        if (req.params.showId && req.params.memberId) {
            SHOW.findById(req.params.showId, (err, show) => {
                if (err) {
                    handleError(err, res, 'Show Not Found', 404);
                } else {
                    console.log('delete member');
                    deleteMember(req, res, show);
                }
            });
        } else {
            handleError(new Error('Not found error'), res, 'Unable to fetch show/member to delete', 404);
        }
    });

module.exports = router;
