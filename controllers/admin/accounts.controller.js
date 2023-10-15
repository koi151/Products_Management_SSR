const Account = require('../../models/accounts.model');
const Role = require('../../models/roles.model');
const md5 = require('md5');

const systemConfig = require('../../config/system');

// [GET] /admin/accounts
module.exports.index = async (req, res) => {
  try {
    const records = await Account.find({
      deleted: false,
    });

    for (const record of records) {
      const role = await Role.findOne({ _id: record.role_id });
      record.role = role;
    }

    res.render("admin/pages/accounts/index.pug", {
      pageTitle: "Accounts Page",
      records: records
    })

  } catch (error) {
    console.log('ERROR OCCURED:', error);
    req.flash('error', "Error occured, page did not existed");
    res.redirect('back');
  }
}

// [GET] /admin/accounts/create
module.exports.create = async (req, res) => {
  try {
    const roles = await Role.find({ deleted: false });

    res.render("admin/pages/accounts/create.pug", {
      pageTitle: "Create Account",
      roles: roles
    })

  } catch (error) {
    console.log('ERROR OCCURED:', error);
    req.flash('error', "Error occured, page did not existed");
    res.redirect('back');
  }
}

// [POST] /admin/accounts/create
module.exports.createPost = async (req, res) => {
  try {
    req.body.password = md5(req.body.password);

    const newAccount = new Account(req.body)
    await newAccount.save();
    
    req.flash('success', 'Create new account successful !');
    res.redirect(`/${systemConfig.adminPrefix}/accounts`);

  } catch (error) {
    console.log('ERROR OCCURED:', error);
    req.flash('error', "Error occured, can not create account");
    res.redirect('back');
  }
}

// [GET] /admin/accounts/edit/:id
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Account.findOne({ 
      _id: id,
      deleted: false 
    });

    const roles = await Role.find({ 
      deleted: false 
    });
    
    res.render("admin/pages/accounts/edit.pug", {
      pageTitle: "Edit Account",
      data: data,
      roles: roles
    })

  } catch (error) {
    console.log('ERROR OCCURED:', error);
    req.flash('error', "Error occured, page did not existed");
    res.redirect('back');
  }
}

// [PATCH] /admin/accounts/edit/:id
module.exports.editPatch = async (req, res) => {
  try {
    const id = req.params.id;
    if(req.body.password) {
      req.body.password = md5(req.body.password);
    } else {
      delete req.body.password;
    }

    await Account.updateOne({ _id: id }, req.body);
    
    req.flash('success', 'Account has been updated successfully !');
    res.redirect(`/${systemConfig.adminPrefix}/accounts`);

  } catch (error) {
    console.log('ERROR OCCURED:', error);
    req.flash('error', "Error occured, can not update account");
    res.redirect('back');
  }
}

// [GET] /admin/accounts/detail/:id
module.exports.detail = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Account.findOne({ 
      _id: id,
      deleted: false
    });

    const role_id = data.role_id; 

    const role = await Role.findOne({
      _id: role_id,
      deleted: false
    })
    
    res.render("admin/pages/accounts/detail.pug", {
      pageTitle: "Account Detail",
      data: data,
      role: role
    })

  } catch (error) {
    console.log('ERROR OCCURED:', error);
    req.flash('error', "Error occured, page did not existed");
    res.redirect('back');
  }
}