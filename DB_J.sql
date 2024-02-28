create database PWB;
use PWB;
create table Role_(
RoleID int not null primary key,
Description_ longtext not null
);
create table User_(
UserID int not null primary key,
F_Name varchar(20) not null,
L_Name varchar(20) not null,
Password_ longtext not null,
Email varchar(70) not null,
rollid int,
constraint user_roles_fk FOREIGN KEY(rollid) REFERENCES Role_(RoleID)
);
create table Administrator(
AdministratorID int not null primary key,
Userid int,
constraint user_admin_fk FOREIGN KEY(Userid) REFERENCES User_(UserID)
);
create table Customer(
CustomerID int not null primary key,
Userid int,
constraint user_cust_fk FOREIGN KEY(Userid) REFERENCES User_(UserID)
);
create table TeamMember(
MemberID int not null primary key,
Userid int,
constraint user_team_fk FOREIGN KEY(Userid) REFERENCES User_(UserID)
);
create table ProjectManager(
ManagerID int not null primary key,
Userid int,
constraint user_man_fk FOREIGN KEY(Userid) REFERENCES User_(UserID)
);
create table Project(
ProjectName varchar(20),
ProjectID int not null primary key,
DueDate date,
managerid int,
custid int,
adminid int,
constraint proj_admin1_fk FOREIGN KEY(adminid) REFERENCES Administrator(AdministratorID),
constraint proj_cust_fk FOREIGN KEY(custid) REFERENCES Customer(CustomerID),
constraint proj_man_fk FOREIGN KEY(managerid) REFERENCES ProjectManager(ManagerID)
);
create table RoadMap(
RoadID int not null primary key,
goal longtext,
projid int,
constraint proj_road_fk FOREIGN KEY(projid) REFERENCES Project(ProjectID)
);
create table Proj_team(
memberid int,
pid int,
constraint proj_t_fk FOREIGN KEY(pid) REFERENCES Project(ProjectID),
constraint proj_t1_fk FOREIGN KEY(memberid) REFERENCES ProjectManager(ManagerID),
primary key(memberid,pid)
);
create table Template(
TemplateID int not null primary key,
Name_ varchar(25),
Description_ longtext
);
create table Board(
BoardID int not null primary key,
BoardName varchar(40),
pid int,
constraint proj_sprint_fk FOREIGN KEY(pid) REFERENCES Project(ProjectID),
tempid int,
constraint temp_sprint_fk FOREIGN KEY(tempid) REFERENCES Template(TemplateID),
userid int,
constraint user_sp_fk FOREIGN KEY(userid) REFERENCES User_(UserID)
);
create table Deck(
boardid int,
constraint board_sprint_fk FOREIGN KEY(boardid) REFERENCES Board(BoardID),
pid int ,
constraint board1_pro1_fk FOREIGN KEY(pid) REFERENCES Project(ProjectID),
DeckId int not null primary key,
DeckTitle varchar(30)
);
create table card(
CardId int not null primary key,
Name_ varchar(50),
Description_  longtext,
deckid int,
constraint deck_card_fk FOREIGN KEY(deckid) REFERENCES Deck(DeckId)
);
create table report(
ReportId int not null primary key,
CreationDate date,
Description_ longtext,
projid int ,
constraint proj_report_fk FOREIGN KEY(projid) REFERENCES Project(ProjectID),
userid int,
constraint report_user_fk FOREIGN KEY(userid) REFERENCES User_(UserID)
);
create table IssueType(
TypeID int not null primary key,
Name_ varchar(20)
);
create table Issue(
IssueId int not null primary key,
Description_ longtext,
typeid int,
constraint iss_type_fk FOREIGN KEY(typeid) REFERENCES IssueType(TypeID),
pid int,
constraint pro1_Issue1_fk FOREIGN KEY(pid) REFERENCES Project(ProjectID)
);
create table Priority(
Rank_ int not null primary key,
Description_ text,
issueid int,
constraint pro_issue_fk FOREIGN KEY(issueid) REFERENCES Issue(IssueID)
);
create table Attachment(
AttachmentID int not null primary key,
Name_ varchar(25),
Path_ longtext,
size int,
issueid int,
constraint attachment_issue_fk FOREIGN KEY(issueid) REFERENCES Issue(IssueID)

);
create table Team_Issue(
memberid int,
issueid int,
constraint t_issue_fk FOREIGN KEY(issueid) REFERENCES Issue(IssueID),
constraint t1_issue_fk FOREIGN KEY(memberid) REFERENCES TeamMember(MemberID),
primary key(memberid,issueid)
);
create table Comment_(
CommentId int not null primary key,
Description_ text,
userid int,
constraint comment_nuser_fk FOREIGN KEY(userid) REFERENCES User_(UserID)
);
create table comment_issue(
commentid int,
issueid int,
constraint com_issue_fk FOREIGN KEY(issueid) REFERENCES Issue(IssueID),
constraint com1_issue_fk FOREIGN KEY(commentid) REFERENCES Comment_(CommentID),
primary key(commentid,issueid)
);
create table WorkflowStatus(
WorkflowID int not null primary key,
Status_ text,
Name_ varchar(25),
issueid int ,
constraint wf_issue_fk FOREIGN KEY(issueid) REFERENCES Issue(IssueID)
);

USE pwb;
insert into Role_
values(1,"Admin roles: create delete projects ,users"),
(2,"Customer roles: Access app ,can report issue and ask additional feature"),
(3,"Project Manger: Manage projects ,assigns issues to the team members ,updates status and use reports and dashboards"),
(4,"Team Members: View and track progress only");

insert into User_
values(1,"Sabah","Nawab",'123124',"sabah.nawab.sn@gmail.com",1),
(2,"Mahnoor","Mehmood",'123',"mahnoormehmood2001@gmail.com",2),
(3,"Talha","Nadeem",'1234',"Talhanadeem@gmail.com",3),
(4,"John","Jackson",'hehe123',"John.Jackson@gmail.com",4);

insert into Administrator
values(1,1);

insert into Customer
values(2,2);

insert into TeamMember
values(4,4);

insert into ProjectManager
values(3,3);

insert into Project
values("Website Development",1,"2023-05-25",3,2,1),
("Mobile App",2,"2023-05-25",3,2,1);

insert into RoadMap
values(1,"Make Landing page ,user login sign-up",1),
(2,"Make User Interface ,user login sign-up",2);

insert into Proj_team
values(3,1),
(3,2);

insert into Template
values(1,"Kaanban","Visualize your tasks and workflow"),
(2,"Art Gallery","Showcase your Art and create gallery"),
(3,"Scrum","Adopt an agile framework for managing and organizing work"),
(4,"Gantt Chart","Plan and schedule your projects using a visual timeline");

insert into Board
values(1,"web dev Sprint 1 ",1,1,3),
(2,"web dev Sprint 2",1,1,3),
(3,"web dev Sprint 3",1,1,3);

insert into Deck
values(1,1,1,"web dev To-Do"),
(2,1,2,"web dev in-Progress"),
(3,1,3,"web dev Completed");

insert into Card
values(1,"update1","web dev landing page done",1),
(2,"update2","web dev login page done",2),
(3,"update3","web dev login page done",3);

insert into Report
values(1,"2023-05-25","overall project report",1,3),
(2,"2023-05-25","overall project report",2,3);

insert into IssueType
values(1,"Code bug"),
 (2,"Scope issue"),
 (3,"Testing Issue"),
 (4,"Feature Issue");

insert into Issue
values(1,"ADD Feature not as intended not created project",4,1),
(2,"app crashes",1,1);

insert into Priority
values(1,"fix feature issue for web dev",2),
(2,"fix app ",2);

insert into Attachment
values(1,"code snippet","C:\Users\NAWAB-PC\OneDrive\Desktop",10,1),
(2,"error","C:\Users\NAWAB-PC\OneDrive\Desktop",10,2);

insert into Team_Issue
values(4,1),
(4,2);

insert into Comment_
values(1,"not working",3),
(2,"task assigned to john",3),
(3,"Job done well",3);

insert into comment_issue
values(1,1),
(2,1),
(3,2);

insert into WorkflowStatus
values(1,"open","feature add",1),
(2,"Resolved","app crashes",2);



