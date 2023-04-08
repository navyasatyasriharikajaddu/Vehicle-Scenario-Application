In this project directory, there is an end-to-end CRUD application made with React JS.  In this application, users able to create, display, update, delete the Scenarios and Vehicles, a Scenario can have multiple Vehicles, and vehicles should be able to move when user click the start simulation button based on the scenario and vehicles parameters.

On the Home page, users can select the Scenarios from the dropdown list and start the simulation by clicking the start simulation button. When the user clicks the button, vehicles starts moving based on the direction and speed until the scenario time is over, if the vehicles are going outside the container then the vehicles are hidden. In my project there is proper validation when adding vehicles to prevent positions greater than the graph size.

•	The Scenario consists the following fields:

   o	Scenario id
   
   o	Scenario name
   
   o	Time

•	The Vehicle  consists the following fields:

   o	Vehicle id
   
   o	Vehicle name
   
   o	Initial PositionX
   
   o	Initial PositionY
   
   o	Speed
   
   o	Direction (They are Towards, Backwards, Upwards and Downwards)
   
In this project json-server is used for storing data.

Technologies

   •	React


   •	CSS

   •	Axios for API calls
   
   •	Json-server

This project consists of four pages they are

   •	Home : Here we can select Scenario and start simulation.

   •	Add Scenario: In this page we can add new Scenarios, we can also edit and delete the existing Scenarios.

   •	All Scenarios: In this page all the existing Scenarios will be displayed, we can also add Scenarios, Vehicles.

   •	Add Vehicle: In this page we can add vehicles to any existing Scenarios, we can also edit and delete the existing Vehicles.

Installation and Use

To install and run the application, follow these steps:

   • Clone the repository to your local machine using the following command:
      
      Git clone - https://github.com/navyasatyasriharikajaddu/Vehicle-Scenario-Application.git

   • Navigate to the project directory – cd vehicle-scenario-application

   • Install the required dependencies – npm install

   • Start the application – npm run dev

   • After the application starts running , you can access it at http://localhost:3000

   • Run the json-server in another windows using – http://localhost:3006/vehicles and http://localhost:3006/scenario

