const express = require('express');
const router = express.Router();
const todoService = require('../lib/service/todoService');

router.get('/list', (req, res) => {
    console.log('/todo/list');
    todoService.list(req, res);
    
});

router.get('/write_form', (req, res) => {
    console.log('/todo/write_form');
    todoService.writeForm(req, res);
    
});

router.post('/write_confirm', (req, res) => {
    console.log('/todo/write_confirm');
    todoService.writeConfirm(req, res);
    
});

router.get('/complete_update', (req, res) => {
    console.log('/todo/complete_update');
    todoService.completeUpdate(req, res);

});

router.get('/modify', (req, res) => {
    console.log('/todo/modify');
    todoService.modifyForm(req, res);

});

router.post('/modify_confirm', (req, res) => {
    console.log('/todo/modify_confirm');
    todoService.modifyConfirm(req, res);
    
});

router.get('/delete_confoirm', (req, res) => {
    console.log('/todo/delete_confoirm');
    todoService.deleteConfirm(req, res);

});









module.exports = router;