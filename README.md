# Travel Recommendation System
**Made for JTP Technical Project by Biju Saji**

It is a simple web app that takes users previous favourite destination details and recommends places based on the same

## Prerequisites

Before you begin, ensure you have met the following requirements:
- **Git:** You need Git to clone the repository. You can download it from [here](https://git-scm.com/downloads).
- **Docker:** You will need Docker to run the containers for the frontend, backend, and database. Download Docker [here](https://docs.docker.com/engine/install/).

## Installation

To install the project, follow these steps:

1. **Clone the repository**

   Open a terminal and run the following command to clone the project repository:

   ```bash
   git clone https://github.com/BiJu-02/TravelRecommender
   ```

2. **Navigate to project directory**

    ```bash
    cd TravelRecommender
    ```


## Running the Program

To run the project, you will use Docker Compose. This will start the frontend React application, the backend Flask application, and the MongoDB service as defined the compose.yaml file. Follow these steps:

1. **Start Docker**

    Ensure that Docker Desktop is running on your machine. You can start Docker Desktop through your operating system's application menu.

2. **Launch the service**

    In the terminal, run the following command in the project directory:

    ```bash
    docker compose up --build
    ```
    Sit back and relax this might take a few minutes to build and start.

## Using the Web App

1. **Open web app on browser**

    Once the containers start running, open the browser and enter the URL **localhost:3000**

2. **Register and Login**

    You would see the login page on the browser. On the bottom of the form click on **register** below **login** button.

    Once on the register page enter your email id and set a password and click **register**.

    You will be back on the login page. Enter the same email id and password and click **login**.

    The browser will show the home page. Click on **Add Destination** button.

    On the card type in a **travel destination name**, you will be suggested options as you type. Select one from them (The travel destinations are limited to the one's that are in the dataset).

    Click on the box below **Aspects you liked** and select the options you feel like you liked about the destination. Do the same for **Activities you enjoyed**.
    
    After filling in as many destinations as you want, click on **Recommend**.

    The page will show you 6 different travel destinations that you could visit based on your prefernces. On the header you can press **Preferences** button to go back to editing the travel destinations that you input or press on **Logout** button to log out.


