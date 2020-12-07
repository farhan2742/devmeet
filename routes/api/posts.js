const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Input Validation

const ValidatePostInput = require('../../validation/post');

// Load Post Model

const User = require('../../models/Post');
const Post = require('../../models/Post');

// @route GET api/profile/test
// @desc Tests profile route
// @access Public

router.get('/test', (req, res) => res.json({msg: "Profile works"}));

// @route Post api/posts
// @desc Create Post
// @access Private

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {

    // Check Validation

    const { errors, isValid } = ValidatePostInput(req.body);
    if(!isValid) {
        return res.status(400).json(errors);
    }

    const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id,
    });

    newPost.save().then(post => res.json(post))

});


// @route GET api/posts
// @desc Get Post
// @access Public

router.get('/', (req, res) => {
    Post.find()
        .sort({date: -1})
        .then(posts => res.json(posts))
        .catch(err => res.status(404).json({Error: "There are no posts to display."}));
});


// @route GET api/posts/:id
// @desc Get post by id
// @access Public

router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(posts => res.json(posts))
        .catch(err => res.status(404).json({Error: "There is no post to display."}));
});

/*
// @route GET api/profile
// @desc Get current users profile
// @access Private

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if (!profile) {
                errors.noProfile = "There is no profile for this user";
                return res.status(404).json(errors);
            }
            res.json(profile);
        })
        .catch(err => res.status(404).json(err));
});

// @route GET api/profile/all
// @desc Get all profiles
// @access Public

router.get('/all', (req, res) => {
    const errors = {};

    Profile.find()
        .populate('user', ['name', 'avatar'])
        .then(profiles => {
            if(!profiles) {
                errors.noProfile = "There are no profiles.";
                return res.status(404).json(errors)
            }
            res.json(profiles);
        })
        .catch(err => res.status(404).json({ profile: 'There are no profiles.' }));
});

// @route GET api/profile/handle/:handle
// @desc Get profile by handle
// @access Public

router.get('/handle/:handle', (req, res) => {
    const errors = {};

    Profile.findOne({ handle: req.params.handle })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
        if(!profile) {
            errors.noProfile = 'There is no profile for this user.'
            res.status(404).json(errors);
        }

        res.json(profile);
    })
    .catch(err => res.status(404).json(error));
});

// @route GET api/profile/user/:user_id
// @desc Get profile by user ID
// @access Public

router.get('/user/:user_id', (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.params.user_id })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
        if(!profile) {
            errors.noProfile = 'There is no profile for this user.'
            res.status(404).json(errors);
        }

        res.json(profile);
    })
    .catch(err => res.status(404).json({ profile: 'There is no profile for this user.' }));
});



// @route Post api/profile/experience
// @desc Add experience to profile
// @access Private

router.post('/experience', passport.authenticate('jwt', { session: false }), (req, res) => {

    // Check Validation

    const { errors, isValid } = ValidateExperienceInput(req.body);
    if(!isValid) {
        return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id })
        .then(profile => {
            const newExp = {
                title: req.body.title,
                company: req.body.company,
                location: req.body.location,
                from: req.body.from,
                to: req.body.to,
                current: req.body.current,
                description: req.body.description
            }

            // Add to exp array
            profile.experience.unshift(newExp);
            profile.save()
                .then(profile => res.json(profile));
        })

});

// @route Post api/profile/education
// @desc Add education to profile
// @access Private

router.post('/education', passport.authenticate('jwt', { session: false }), (req, res) => {

    // Check Validation

    const { errors, isValid } = ValidateEducationInput(req.body);
    if(!isValid) {
        return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id })
        .then(profile => {
            const newEdu = {
                school: req.body.school,
                degree: req.body.degree,
                fieldofstudy: req.body.fieldofstudy,
                from: req.body.from,
                to: req.body.to,
                current: req.body.current,
                description: req.body.description
            }

            // Add to exp array
            profile.education.unshift(newEdu);
            profile.save()
                .then(profile => res.json(profile));
        })

});

// @route DELETE api/profile/experience/:exp_id
// @desc Delete experience from profile
// @access Private

router.delete('/experience/:exp_id', passport.authenticate('jwt', { session: false }), (req, res) => {

    Profile.findOne({ user: req.user.id })
        .then(profile => {
            // Get remove index

            const removeIndex = profile.experience
                .map(item => item.id)
                .indexOf(req.params.exp_id);
            
            // Splice out of array
            
            profile.experience.splice(removeIndex, 1);

            // Save
            
            profile.save().then(profile => res.json(profile));
        })
        .catch(err => res.status(404).json(err))
});

// @route DELETE api/profile/education/:edu_id
// @desc Delete education from profile
// @access Private

router.delete('/education/:edu_id', passport.authenticate('jwt', { session: false }), (req, res) => {

    Profile.findOne({ user: req.user.id })
        .then(profile => {
            // Get remove index

            const removeIndex = profile.experience
                .map(item => item.id)
                .indexOf(req.params.exp_id);
            
            // Splice out of array
            
            profile.education.splice(removeIndex, 1);

            // Save
            
            profile.save().then(profile => res.json(profile));
        })
        .catch(err => res.status(404).json(err))
});


// @route DELETE api/profile
// @desc Delete user and profile
// @access Private

router.delete('/', passport.authenticate('jwt', { session: false }), (req, res) => {

    Profile.findOne({ user: req.user.id })
        .then( () => {
            User.findOneAndRemove({ _id: req.user.id})
                .then(() => res.json({ success: true}))
        });
});
*/
module.exports = router;