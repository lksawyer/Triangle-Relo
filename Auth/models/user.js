module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        // Giving the User model a name of type STRING
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {len:[1]},
            unique: true
        },
        pass: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {len:[1]}
        },
        email: {
            type: DataTypes.STRING,
            defaultValue: ''
        }},{
        timestamps: false
    });
    User.associate = function (models) {
        // Associating User with Posts
        // When an Author is deleted, also delete any associated Posts
        User.hasMany(models.Page, {
            onDelete: "cascade"
        });
    };

    User.associate = function (models) {
        User.hasMany(models.Comment, {
            onDelete: "cascade"
        });
    };

    return User;
};
