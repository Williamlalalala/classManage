----使用语言为PHP7.0，服务器为Apache，并在上面搭载MongoDB
----有以上3样东西才能成功运行
----使用了https://github.com/PHPOffice/PHPExcel中的Classes文件夹来导入Excel文件
----上面的文件夹位于./Lib并改名为phpexcel
----使用的时候可以把该文件夹改名为CreateDB
========================================================================================================================
----根目录下运行文件有：createTeacherSet.php -> 创建教师集合
						----路径：CreateDB/createTeacherSet.php
						----传入方法：post	//还没写
						----传入：教师文件地址(string)
						----传出：布尔类型判断值(json)
						createTeacherCourse.php -> 创建教师下的课程
						----路径：CreateDB/createTeacherCourse.php
						----传入方法：post	//还没写
						----传入：教师ID(string)、课程信息(课程名字，课程内容)(string)、教师文件地址(string)	//待议
						----传出：布尔类型判断值(json)
						createStudentSet.php -> 创建学生集合
						----路径：CreateDB/createStudentSet.php
						----传入方法：post	//还没写
						----传入：学生文件地址(string)
						----传出：布尔类型判断值(json)
----且根目录下存放导入execl文件：teacherList.xlsx与studentList.xlsx
----以及存放该文件夹说明文件README.txt以及数据库结构说明文件structOfDB.txt
----运行顺序：/createTeacherSet.php -> /createTeacherCourse.php -> /createStudentSet.php
========================================================================================================================
----根目录下/Lib中有运行文件：structOfDb.php -> 数据库文档结构的定义检查的相关函数
							  ----该文档与前端无连接
							  openExcel.php -> 打开并读Excel文件的相关函数
							  ----该文档与前端无连接
							  以及phpexcel文件夹中相关文件
========================================================================================================================
----根目录下/Create中运行文件：createSet.php -> 创建数据库文件
							   ----该文档与前端无连接
========================================================================================================================
----根目录下/Add中运行文件：addTeacher.class.php -> 添加教师类，通过Excel文档批量添加	//以后可以在类中写单个添加方法
							addCourse.class.php -> 添加课程类，且现有教师单个课程添加以及学生课程批量添加方法
							addStudent.class.php -> 添加学生类
							和还没写的addHomework.class.php
========================================================================================================================