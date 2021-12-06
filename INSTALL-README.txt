------------------------------------- Unzip File --------------------------------------

1) Extract The App Solution from the zip file to a suitable location on your machine.



------------------------------ Solution Structure -------------------------------------

Inside of the project folder you will notice there is three individual folders. These
are the three main components of our project solution.

--------------------------------|-----------------------------------------------
File Location			|  Description
--------------------------------|-----------------------------------------------
Extracted Zip Folder		|  Root Folder
|--- Mobile 			|  Contains our Angular/Ionic Patient App
|--- RESTApi 			|  Contains Node Express Server
|--- Web     			|  Contains Angular Practioners Dashboard App
--------------------------------|-----------------------------------------------



------------------------------ Installation Requirements ------------------------------

To Configure Machine for Ionic and Angular Development

Node.js
1) Navigate to https://nodejs.org/en/ 
2) Install recommended version (16.13.1 LTS)

Angular CLI
1) Open a command prompt as an administrator on your machine
2) Run the command `npm install -g @angular/cli`

Ionic CLI
1) npm install -g @ionic/cli



------------------------------ Building the Rest Api --------------------------------

Run the following commands in this order using Command Prompt or an integrated terminal in a code editor of your choice.

1) cd <extracted-path>/6129COMP-Project/RESTApi
2) npm i express
3) npm install
4) npm start

You should now see in the console - 'Node app is running on port xxxx' where 'xxxx' is the assigned port.
You now must leave this command prompt running in the background.a



------------------------------ Building the Mobile App --------------------------------

Run the following commands in this order using Command Prompt or an integrated terminal in a code editor of your choice.

1) cd `<extracted-path>/6129COMP-Project/Mobile`
2) npm install
3) ionic serve

Your web browser will now open displaying the mobile app in full screen.
You can change this to a mobile view by opening your browsers developer tools and selecting a device e.g, Google Pixel 2.
You can now interact with the mobile app.

Example Logins

--------------------------------|-----------------------------------------------
User 				|  Password
--------------------------------|-----------------------------------------------
aaron@mail.com			|  pass
sampeters@sky.com		|  pass
amayagordon@yahoo.co.uk		|  pass	
--------------------------------|-----------------------------------------------



------------------------------ Building the Web App -----------------------------------

Run the following commands in this order using Command Prompt or an integrated terminal in a code editor of your choice.

1) cd <extracted-path>/6129COMP-Project/Web
2) npm install
3) ng serve -o

Your web browser will now open displaying the web app.
You can verify page scale responsivity by opening your web browsers display tools and selecting responsive layout.
You can change this to a mobile view by opening your browsers developer tools and selecting a device e.g, Google Pixel 2.
You can now interact with the mobile app.


Example Logins

--------------------------------|---------------|-------------------------------
 User 				| Password      | Role
--------------------------------|---------------|-------------------------------
robbie@itsolutions.co.uk	|  pass         | System Administrator
dr.jones@gmail.co.uk		|  pass		| Practitioner
rebecca.jane841@yahoo.com	|  pass		| Practitioner
--------------------------------|---------------|-------------------------------



------------------------------ Directly Connecting to Database -----------------------------------

The Database is stored to a remote MySQL server hosted on Microsoft Azure.
The connection details are stored in <extracted-path>/6129COMP-Project/RestApi/conn_details.js
You can use these parameters to actively connect to the physical database inside of MySQL workbench if you would like to.

The database is accessible and remain live until next year. If for what ever reason you cannot connect to the database and wish to,
please contact Adam on 07701324422 or a.robson1@2018.ljmu.ac.uk and he will attempt to rectify this.






















