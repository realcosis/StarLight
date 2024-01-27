-- ----------------------------
-- Table structure for `starlight_permissions`
-- ----------------------------
DROP TABLE IF EXISTS `starlight_permissions`;
CREATE TABLE `starlight_permissions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `permission` int DEFAULT NULL,
  `rank` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of starlight_permissions
-- ----------------------------
INSERT INTO `starlight_permissions` VALUES ('1', '1', '7');
INSERT INTO `starlight_permissions` VALUES ('2', '2', '7');
INSERT INTO `starlight_permissions` VALUES ('3', '3', '7');
INSERT INTO `starlight_permissions` VALUES ('4', '4', '7');
INSERT INTO `starlight_permissions` VALUES ('5', '5', '7');
INSERT INTO `starlight_permissions` VALUES ('6', '6', '7');
INSERT INTO `starlight_permissions` VALUES ('7', '7', '7');
INSERT INTO `starlight_permissions` VALUES ('8', '8', '7');
INSERT INTO `starlight_permissions` VALUES ('9', '9', '7');
INSERT INTO `starlight_permissions` VALUES ('10', '10', '7');
INSERT INTO `starlight_permissions` VALUES ('11', '11', '7');
INSERT INTO `starlight_permissions` VALUES ('12', '12', '7');
INSERT INTO `starlight_permissions` VALUES ('13', '13', '7');
INSERT INTO `starlight_permissions` VALUES ('14', '14', '7');
INSERT INTO `starlight_permissions` VALUES ('15', '1', '7');
INSERT INTO `starlight_permissions` VALUES ('16', '1', '7');

-- ----------------------------
-- Table structure for `starlight_permission_names`
-- ----------------------------
DROP TABLE IF EXISTS `starlight_permission_names`;
CREATE TABLE `starlight_permission_names` (
  `id` int NOT NULL AUTO_INCREMENT,
  `permission` varchar(50) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of starlight_permission_names
-- ----------------------------
INSERT INTO `starlight_permission_names` VALUES ('1', 'admin.login', 'Ability to use admin panel');
INSERT INTO `starlight_permission_names` VALUES ('2', 'admin.news', 'Ability to use news section');
INSERT INTO `starlight_permission_names` VALUES ('3', 'admin.news.list', 'Ability to see news list');
INSERT INTO `starlight_permission_names` VALUES ('4', 'admin.news.edit', 'Ability to edit the news');
INSERT INTO `starlight_permission_names` VALUES ('5', 'admin.news.delete', 'Ability to delete the news');
INSERT INTO `starlight_permission_names` VALUES ('6', 'admin.user', 'Ability to use user section');
INSERT INTO `starlight_permission_names` VALUES ('7', 'admin.user.list', 'Ability to see user list');
INSERT INTO `starlight_permission_names` VALUES ('8', 'admin.user.ranks', 'Ability to edit user rank');
INSERT INTO `starlight_permission_names` VALUES ('9', 'admin.user.clone', 'Ability to check the clone for user');
INSERT INTO `starlight_permission_names` VALUES ('10', 'admin.user.currency', 'Ability to edit user currency');
INSERT INTO `starlight_permission_names` VALUES ('11', 'admin.starlight', 'Ability to edit the cms settings');
INSERT INTO `starlight_permission_names` VALUES ('12', 'admin.starlight.permission', 'Ability to manager the permissions');
INSERT INTO `starlight_permission_names` VALUES ('13', 'maintenance.login', 'Ability to login when maintenace mode is true');
INSERT INTO `starlight_permission_names` VALUES ('14', 'admin.news.new', 'Ability to create new news');

-- ----------------------------
-- Table structure for `starlight_settings`
-- ----------------------------
DROP TABLE IF EXISTS `starlight_settings`;
CREATE TABLE `starlight_settings` (
  `key` varchar(100) CHARACTER SET utf8 NOT NULL,
  `value` varchar(512) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
