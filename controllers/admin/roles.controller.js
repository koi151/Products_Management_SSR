const Role = require('../../models/roles.model');

const systemConfig = require('../../config/system');

// [GET] /admin/roles/
module.exports.index = async (req, res) => {
  try {
    const allRoles = await Role.find({ deleted: false });

    res.render('admin/pages/roles/index.pug', {
      pageTitle: "Roles Management Page",
      allRoles: allRoles
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

// [GET] /admin/roles/edit/:id
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Role.findOne({ _id: id }) 

    res.render("admin/pages/roles/edit.pug", {
      pageTitle: "Edit Role Page",
      data: data
    })
  } catch (error) {
    console.log('ERROR OCCURED:', error);
    req.flash('error', "Error occured, page did not existed");
    res.redirect('back');
  }
}

// [PATCH] /admin/roles/edit/:id
module.exports.editPatch = async (req, res) => {
  try {
    const id = req.params.id;
    await Role.updateOne({ _id: id }, req.body);

    req.flash('success', 'Update status successful !');
    res.redirect('back');

  } catch (error) {
    console.log('ERROR OCCURED:', error);
    req.flash('error', "Error occured, can not update group role");
    res.redirect('back');
  }
}

// [GET] /admin/roles/permissions
module.exports.permissions = async (req, res) => {

  const records = await Role.find({ deleted: false });

  res.render("admin/pages/roles/permissions.pug", {
    pageTitle: "Permissions Page",
    records: records
  })
}

// [GET] /admin/detail/:id
module.exports.detail = async (req, res) => {
  const id = req.params.id;
  const data = await Role.findOne({ _id: id });

  res.render("admin/pages/roles/detail.pug", {
    pageTitle: "Detail Role",
    data: data
  })
}


// [PATCH] /admin/roles/permissions
module.exports.permissionsPatch = async (req, res) => {
  try {
    const permissions = JSON.parse(req.body.permissions); 

    for (const item of permissions) {
      await Role.updateOne(
        { 
          _id: item.id 
        },
        {
          permissions: item.permissions
        }
      )
    }

    req.flash('success', 'Create new role successful !');
    res.redirect('back')

  } catch (error) {
    console.log('ERROR OCCURED:', error);
    req.flash('error', 'Error occured, can not create new role');
    res.redirect('back');
  }
}

// [DELETE] /admin/roles/delete/:id
module.exports.deleteItem = async (req, res) => {
  try {
    const id = req.params.id;

    await Role.updateOne({ _id: id }, {
      deleted: true,
      deletedAt: Date()
    });

    req.flash('success', 'Delete role successful !');
    res.redirect('back');

  } catch (error) {
    console.log('ERROR OCCURED WHILE DELETING ROLE:', error);
    req.flash('error', 'Error occured, can not delete role');
    res.redirect('back');
  }
}