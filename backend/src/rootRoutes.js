import { Router } from 'express';
const jwt = require('jsonwebtoken');
var path = require('path');
var multer = require('multer');
var isAdmin = false;
var storage = multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, '../frontend/public/uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});
var upload = multer({ storage: storage });

import loginFormRoutes from './modules/login-form/routes';
import addUserFormRoutes from './modules/add-user-form/routes';
import addTaskFormRoutes from './modules/add-task-form/routes';
import addGroupFormRoutes from './modules/add-group-form/routes';
import userListRoutes from './modules/user-list/routes';
import newPassRoutes from './modules/new-pass/routes';
import resetPassRoutes from './modules/reset-pass/routes';
import updateUserFormRoutes from './modules/update-user-form/routes';
import departmentListRoutes from './modules/department-list/routes';
import taskListRoutes from './modules/task-list/routes';
import changePassRoutes from './modules/change-pass/routes';
import currentUserRoutes from './modules/current-user/routes';
import tasksRoutes from './modules/tasks/routes';
import userAdministrationRoutes from './modules/user-administration/routes';
import assignTaskRoutes from './modules/assign-task/routes';
import deleteUserTaskRoutes from './modules/delete-user-task/routes';
import uploadTaskFileRoutes from './modules/upload-task-file/routes';
import modifyUserTaskRoutes from './modules/modify-user-task/routes';
import taskDetailRoutes from './modules/task-detail/routes';
import groupListRoutes from './modules/group-list/routes';
import userGroupsRoutes from './modules/user-groups/routes';
import assignUserUploadsRoutes from './modules/assign-user-uploads/routes';
import assignedTasksRoutes from './modules/assigned-tasks/routes';
import allTasksRoutes from './modules/all-tasks/routes';
import tbdTasksRoutes from './modules/tbd-tasks/routes';
import doneTasksRoutes from './modules/done-tasks/routes';


const router = Router({ mergeParams: true });

router.use('/api/auth', loginFormRoutes);
//dummy route in progress

router.use('/api/newPass', newPassRoutes);
router.use('*', (req, res, next) => {
  const x = jwt.verify(req.get('Authorization'), '2', (err, decoded) => {
    if (err) {
      res.status(401).send('unauthorized');
    } else {
      req.user = {
        id: decoded.id,
        email: decoded.email,
        firstName: decoded.firstName,
        lastName: decoded.lastName,
        department: decoded.department,
        isAdmin: decoded.isAdmin,
      };
      next();
    }
  });
});
router.use('/api/currentUser', currentUserRoutes);
router.use('/api/updateUser', updateUserFormRoutes);
router.use('/api/userList', userListRoutes);
router.use('/api/changePass', changePassRoutes);
router.use('/api/resetPass', resetPassRoutes);
router.use('/api/departmentList', departmentListRoutes);
router.use('/api/taskList/:id', taskListRoutes);
router.use('/api/assignedTasks/:id', assignedTasksRoutes);
router.use('/api/tasks', tasksRoutes);
router.use('/api/userAdministration/:id', userAdministrationRoutes);
router.use('/api/userGroups/:id', userGroupsRoutes);
router.use('/api/taskDetail/:id', taskDetailRoutes);
router.use('/api/allTasks/:id', allTasksRoutes);
router.use('/api/tbdTasks/:id', tbdTasksRoutes);
router.use('/api/doneTasks/:id', doneTasksRoutes);
router.use('/api/uploadTaskFile', upload.single('file'), uploadTaskFileRoutes);
router.use('/api/groupList', groupListRoutes);
router.use('/api/assignUserUploads', assignUserUploadsRoutes);
router.use('/api/addUser', addUserFormRoutes);
router.use('/api/addTask', addTaskFormRoutes);
router.use('/api/addGroup', addGroupFormRoutes);
router.use('/api/assignTask', assignTaskRoutes);
router.use('/api/deleteUserTask', deleteUserTaskRoutes);
router.use('/api/modifyUserTask', modifyUserTaskRoutes);


router.use('/api/', (req, res) => {
  res.json({
    status: true,
  });
});

export default router;
