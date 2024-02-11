const express = require('express');
const router = express.Router();

const { 
    registerUser, 
    loginUser, 
    logoutUser,
    getUserProfile, 
    resetPasswordToken,
    updatePassword,
    updateProfil,
    getUserDetails,
    getAllUsers,
    updateUserDetails,
    deleteUser
} = require('../controllers/authController');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);
router.route('/password/reset/:token').put(resetPasswordToken);
router.route('/me').get(isAuthenticatedUser, getUserProfile);
router.route('/password/update').put(isAuthenticatedUser, updatePassword);
router.route('/me/update').put(isAuthenticatedUser, updateProfil);
router.route('/admin/users').get(isAuthenticatedUser, authorizeRoles('admin'),getAllUsers);
router.route('/admin/user/:id')
    .get(isAuthenticatedUser, authorizeRoles('admin'),getUserDetails)
    .put(isAuthenticatedUser, authorizeRoles('admin'),updateUserDetails)
    .delete(isAuthenticatedUser, authorizeRoles('admin'),deleteUser);

module.exports = router;