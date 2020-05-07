
////////////////////////////////////
// REQUIRES
const utils = require('./comp/utils')
    , path = utils.path
    , fs = utils.fs
    , moment = utils.moment
    , renderError = require('./comp/utils.rendering').renderError
    , renderUiError = require('./comp/utils.rendering').renderUiError;

////////////////////////////////////
// UI Endpoints
const init = (app) => {

    // app.get('/api/ui/todolist', (req, res) => {
    //     twitter.getTodoList()
    //         .then(todos => {
    //             res.render('partials/twitter/dashboard-simplelist', { layout: false, ...todos });
    //         })
    //         .catch(e => renderUiError(e));
    // });

    // app.get('/api/ui/modalContent', (req, res) => {
    //     res.render('partials/modals/global-tweet', { layout: false });
    // });

    // app.get('/api/ui/profileCard', (req, res) => {
    //     const layout = {
    //         success: 'partials/modals/profile-card',
    //         error: 'partials/modals/profile-card-error'
    //     };
    //     twitter.getUser(req.query)
    //         .then(user => {
    //             user.getFF5().then(() => {
    //                 res.render(layout.success, {
    //                     user,
    //                     layout: false
    //                 });
    //             });
    //         })
    //         .catch(e => {
    //             e.allErrors.push({ code: 69, message: `Could not find user. ${JSON.stringify(req.query)}` });
    //             renderUiError(res, e, layout.error);
    //         });
    // })
    
};

module.exports = {
    init
};