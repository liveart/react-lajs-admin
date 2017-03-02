module.exports = function (app) {
  const User = app.models.Client;
  const Role = app.models.Role;
  const RoleMapping = app.models.RoleMapping;

  User.find((err, users) => {
    if (users && !users.length) {
      User.create([
        {email: 'admin@example.com', password: 'password'}
      ], function (err, users) {
        if (err) throw err;

        Role.create({
          name: 'admin'
        }, function (err, role) {
          if (err) throw err;

          role.principals.create({
            principalType: RoleMapping.USER,
            principalId: users[0].id
          }, function (err, principal) {
            if (err) throw err;

            console.log('Created principal:', principal);
          });
        });
      });
    }
  });
};
