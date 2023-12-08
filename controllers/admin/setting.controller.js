const SettingGeneral = require('../../models/settings-general')

// [GET] /settings/general
module.exports.general = async (req, res) => {
  try {
    const settingGeneral = await SettingGeneral.findOne({});

    res.render('admin/pages/settings/general', {
      pageTitle: 'General Setting Page',
      settingGeneral: settingGeneral
    })

  } catch (error) {
    console.log('Error occurred in setting [GET]:', error);
    req.flash('error', 'Error occurred, redirected to previous page.')    
    res.redirect('back');
  }
}

// [PATCH] /settings/general
module.exports.generalPatch = async (req, res) => {
  try {
    const existedRecord = await SettingGeneral.findOne({});

    if (existedRecord) {
      await SettingGeneral.updateOne({
        _id: existedRecord.id
      }, req.body);
    } else {
      const record = new SettingGeneral(req.body);
      await record.save();
    }

    req.flash('success', 'Updated successfully !')
    res.redirect('back');

  } catch (error) {
    console.log('Error occurred in setting [GET]:', error);
    req.flash('error', 'Error occurred, redirected to previous page.')    
    res.redirect('back');
  }
}