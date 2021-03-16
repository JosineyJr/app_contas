REPLACE INTO `roles` VALUES (1,'ADMIN');
REPLACE INTO `roles` VALUES (2,'USUARIO');

REPLACE INTO `users` (`user_id`, `active`, `email`, `last_name`, `name`, `password`, `user_name`) VALUES
(1, b'1', 'admin@localhost', 'Do Sistema', 'Adminstrador', '$2a$10$A5c6LmhsiFydP7IKJ3QIcu433x2Ow5Q.Jgw8GmgJ4q1freC/eyOO6', 'admin');