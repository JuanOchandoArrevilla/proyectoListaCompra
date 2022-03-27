module.exports = (sequelize, DataTypes) => {
    const itemList = sequelize.define(
        "listas_con_productos", {
          
        }, 
        {
            timestamps: false,
          }
    );

    itemList.associate = (models) => {}

    return itemList;
}