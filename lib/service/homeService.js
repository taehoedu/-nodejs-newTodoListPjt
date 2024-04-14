const homePage = {

    home: (req, res) => {
        res.render('home/home', {loginedMember: req.session.loginedMember});
    },
}

module.exports = homePage;