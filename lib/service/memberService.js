const DB = require("../db/db");
const bcrypt = require('bcrypt');
const fs = require('fs');

const memberPage = {

    signupForm: (req, res) => {
        res.render('member/sign_up_form', {loginedMember: req.session.loginedMember});

    },

    signupConfirm: (req, res) => {
        let post = req.body;

        let sql = `
            INSERT INTO 
                TBL_MEMBER(M_ID, M_PW, M_MAIL, M_PHONE ${ (req.file !== undefined) ? `, M_PROFILE_THUM` : `` }) 
            VALUES(?, ?, ?, ? ${ (req.file !== undefined) ? `, ?` : `` })
        `;

        let state = [post.m_id, bcrypt.hashSync(post.m_pw, 10), post.m_mail, post.m_phone];
        if (req.file !== undefined) state.push(req.file.filename);

        DB.query(sql, state, 
        (error, result) => {

            if (error) {
                if (req.file !== undefined) {
                    fs.unlink(`C:\\newTodoList\\upload\\profile_thums\\${post.m_id}\\${req.file.filename}`, (error) => {

                    });
                }

                res.render('member/signup_ng');

            } else {
                
                if (req.file !== undefined) {
                    DB.query(`
                    INSERT INTO TBL_PROFILE_THUMS(PT_OWNER_NO, PT_NAME) 
                    VALUES(?, ?)`, 
                    [result.insertId, req.file.filename], 
                    (error, result) => {
                        res.render('member/signup_ok');
    
                    });

                } else {
                    res.render('member/signup_ok');

                }

            }

        });

    },

    signinForm: (req, res) => {
        res.render('member/sign_in_form', {loginedMember: req.session.loginedMember});

    },

    signinConfirm: (req, res) => {
        let post = req.body;

        DB.query(`SELECT * FROM TBL_MEMBER WHERE M_ID=?`, 
        [post.m_id], 
        (error, member) => {

            if (error) res.render('member/signin_ng');

            if (member.length > 0) {
                if (bcrypt.compareSync(post.m_pw, member[0].M_PW)) {
                    req.session.loginedMember = member[0];
                    res.render('member/signin_ok');

                } else {
                    res.render('member/signin_ng');

                }

            } else {
                res.render('member/signin_ng');

            }

        });

    },

    signoutConfirm: (req, res) => {
        req.session.destroy(() => {
            res.redirect('/');
        });

    },

    modifyForm: (req, res) => {

        DB.query(`SELECT PT_NAME FROM TBL_PROFILE_THUMS where PT_OWNER_NO = ? ORDER BY PT_NO DESC`, 
        [req.session.loginedMember.M_NO],
        (error, thumNames) => {

            res.render('member/modify_form', {loginedMember: req.session.loginedMember, thumNames});

        });

    },

    modifyConfirm: (req, res) => {

        let post = req.body;
        let sql = `
            UPDATE 
                TBL_MEMBER 
            SET 
                M_PW = ?, 
                M_MAIL = ?, 
                M_PHONE = ?, 
                ${post.cover_profile_thum_delete === 'on' ? `M_PROFILE_THUM = ?, ` : ``}
                M_MOD_DATE = NOW() 
            WHERE 
                M_NO = ?
        `;

        console.log('sql: ', sql);

        let state = [bcrypt.hashSync(post.m_pw, 10), post.m_mail, post.m_phone];
        if (post.cover_profile_thum_delete === 'on') {  // CHANGE or DELETE 요청
            if (req.file !== undefined) {               // 첨부 했다면         --> CHANGE 요청
                state.push(req.file.filename);

            } else {                                    // 첨부 하지 않았다면   --> DELETE 요청
                state.push('');

            }

        } else {                                        // CURRENT 유지

        }
        state.push(post.m_no);

        console.log('state: ', state);

        DB.query(sql, state, (error, result) => {

            if (error) {
                res.render('member/modify_ng');

            } else {

                if (req.file !== undefined) {
                    DB.query(`
                        INSERT INTO TBL_PROFILE_THUMS(PT_OWNER_NO, PT_NAME) 
                        VALUES(?, ?)`, 
                        [post.m_no, req.file.filename], 
                        (error, result) => {

                            if (error) {
                                res.render('member/modify_ng');

                            } else {
                                DB.query(`SELECT * FROM TBL_MEMBER WHERE M_NO = ?`, 
                                [post.m_no], 
                                (error, member) => {
                                    
                                    req.session.loginedMember = member[0];
                                    res.render('member/modify_ok');

                                });
                                
                            }

                    });

                } else {
                    DB.query(`SELECT * FROM TBL_MEMBER WHERE M_NO = ?`, 
                    [post.m_no], 
                    (error, member) => {
                        
                        req.session.loginedMember = member[0];
                        res.render('member/modify_ok');

                    });

                }

            }

        });

    },

    deleteConfirm: (req, res) => {
        
        DB.query(`DELETE FROM TBL_MEMBER WHERE M_NO = ?`, 
        [req.session.loginedMember.M_NO], 
        (error, result) => {

            if (error) {
                res.render('member/delete_ng');

            } else {
                req.session.destroy(() => {
                    res.render('member/delete_ok');
                });

            }

        });

    }
    
}

module.exports = memberPage;