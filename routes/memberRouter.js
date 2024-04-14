const express = require('express');
const router = express.Router();
const memberService = require('../lib/service/memberService');
const uploads = require('../lib/upload/uploads');

router.get('/signup_form', (req, res) => {
    console.log('/member/signup');
    memberService.signupForm(req, res);
    
});

router.post('/signup_confirm', uploads.UPLOAD_PROFILE_MIDDLEWARE(), (req, res) => {
    console.log('/member/signup_confirm');
    memberService.signupConfirm(req, res);
    
});

router.get('/signin_form', (req, res) => {
    console.log('/member/signin_form');
    memberService.signinForm(req, res);
});

router.post('/signin_confirm', (req, res) => {
    console.log('/member/signin_confirm');
    memberService.signinConfirm(req, res);
});

router.get('/modify_form', (req, res) => {
    console.log('/member/modify_form');
    memberService.modifyForm(req, res);
});

router.post('/modify_confirm', uploads.UPLOAD_PROFILE_MIDDLEWARE(), (req, res) => {
    console.log('/member/modify_confirm');
    memberService.modifyConfirm(req, res);
    
});

router.get('/signout_confirm', (req, res) => {
    console.log('/member/signout_confirm');
    memberService.signoutConfirm(req, res);

});

router.get('/delete_confirm', (req, res) => {
    console.log('/member/signout_confirm');
    memberService.deleteConfirm(req, res);

});

module.exports = router;