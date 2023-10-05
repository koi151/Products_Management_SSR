// [GET] /admin/dashboard
module.exports.dashboard = (req, res) => {
  res.render("admin/pages/dashboard/dashboard.pug", {
    pageTitle: 'DashBoard'
  })
}