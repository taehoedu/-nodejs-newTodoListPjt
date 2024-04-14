const DB = require("../db/db");

const todoPage = {

    list: (req, res) => {

        if (req.session.loginedMember === undefined) {
            res.redirect('/member/signin_form');   
        }

        let loginedMember = req.session.loginedMember;
        DB.query(`SELECT * FROM TBL_TODO WHERE T_OWNER_NO = ? ORDER BY T_NO DESC`, 
        [loginedMember.M_NO], 
        (error, todos) => {

            res.render('todo/list', 
            {
                loginedMember: req.session.loginedMember, 
                todos,
            });

        });

    },

    writeForm: (req, res) => {

        if (req.session.loginedMember === undefined) {
            res.redirect('/member/signin_form');   
        }

        res.render('todo/write_form', {loginedMember: req.session.loginedMember});

    },

    writeConfirm: (req, res) => {

        let post = req.body;
        let loginedMember = req.session.loginedMember;
        DB.query(`
            INSERT INTO TBL_TODO(T_OWNER_NO, T_TITLE, T_BODY, T_EXPIRATION_DATE) 
            VALUES(?, ?, ?, ?)
        `, 
        [loginedMember.M_NO, post.t_title, post.t_body, post.t_expiration_date], 
        (error, result) => {

            if (error) {
                res.render('todo/write_ng');

            } else {
                res.render('todo/write_ok');

            }

        });

    }, 

    completeUpdate: (req, res) => {

        let query = req.query;
        let t_no = query.t_no;
        let t_is_complete = query.t_is_complete;
        let targetIsComplete = (Number(t_is_complete) === 1) ? 0 : 1;

        DB.query(`UPDATE TBL_TODO SET T_IS_COMPLETE = ? WHERE T_NO = ?`, 
        [targetIsComplete, t_no],
        (error, result) => {

            if (error) {
                res.render('todo/is_complete_update_ng');
                
            } else {
                res.render('todo/is_complete_update_ok');

            }

        });

    },

    modifyForm: (req, res) => {

        let query = req.query;
        let t_no = query.t_no;

        DB.query(`SELECT * FROM TBL_TODO WHERE T_NO = ?`, 
        [t_no], 
        (error, todo) => {

            res.render('todo/modify_form', 
            {
                loginedMember: req.session.loginedMember, 
                todo,
            });

        });

    },

    modifyConfirm: (req, res) => {

        let post = req.body;
        console.log('post: ', post);

        DB.query(`
            UPDATE TBL_TODO 
            SET T_TITLE=?, T_BODY=?, T_EXPIRATION_DATE=?, T_MOD_DATE=NOW() 
            WHERE T_NO=?
        `, 
        [post.t_title, post.t_body, post.t_expiration_date, post.t_no], 
        (error, result) => {

            if (error) {
                console.log(error);
                res.render('todo/modify_ng');

            } else {
                res.render('todo/modify_ok');

            }

        });

    },

    deleteConfirm: (req, res) => {

        let query = req.query;
        let t_no = query.t_no;

        DB.query(`DELETE FROM TBL_TODO WHERE T_NO = ?`, 
        [t_no], 
        (error, todo) => {

            if (error) {
                res.render('todo/delete_ng');
                
            } else {
                res.render('todo/delete_ok');

            }

        });

    },


}

module.exports = todoPage;