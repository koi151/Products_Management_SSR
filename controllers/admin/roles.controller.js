const Role = require('../../models/roles.model');

const systemConfig = require('../../config/system');

// [GET] /admin/roles/
module.exports.index = async (req, res) => {
  try {
    const roles = await Role.find({ deleted: false });

    res.render('admin/pages/roles/index.pug', {
      pageTitle: "Roles Management Page",
      roles: roles
    });

  } catch (error) {
    console.log('ERROR OCCURED:', error);
    req.flash('error', "Error occured, page did not existed");
    res.redirect('back');
  }
}

// [GET] /admin/roles/create
module.exports.create = async (req, res) => {
  try {
    res.render('admin/pages/roles/create.pug', {
      pageTitle: "Create Role Page"
    });

  } catch (error) {
    console.log('ERROR OCCURED:', error);
    req.flash('error', "Error occured, page did not existed");
    res.redirect('back');
  }
}

// [POST] /admin/roles/create
module.exports.createPost = async (req, res) => {
  try {
    const newRole = new Role(req.body);
    await newRole.save();

    req.flash('success', "Create new group role successful !");
    res.redirect(`/${systemConfig.adminPrefix}/roles`);
    
  } catch (error) {
    console.log('ERROR OCCURED:', error);
    req.flash('error', "Error occured, can not create new group role");
    res.redirect('back');
  }
}