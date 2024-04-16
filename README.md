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


![Screenshot 2024-04-16 193923](https://github.com/BiJu-02/TravelRecommender/assets/67651024/830fa900-a4f4-4476-9497-be52cf50fa97)
    Once the containers start running, open the browser and enter the URL **localhost:3000**

![Screenshot 2024-04-16 193837](https://github.com/BiJu-02/TravelRecommender/assets/67651024/755a1143-d9b0-4103-85ad-00777c37cd49)
    You would see the login page on the browser. On the bottom of the form click on **register** below **login** button.
    
![Screenshot 2024-04-16 195109](https://github.com/BiJu-02/TravelRecommender/assets/67651024/a19cb485-2b79-43f8-b855-d22f84ab3caf)
    Once on the register page enter your email id and set a password and click **register**.
    
![Screenshot 2024-04-16 193909](https://github.com/BiJu-02/TravelRecommender/assets/67651024/f6a5eb19-202d-4424-ba00-19561bab71f7)
    You will be back on the login page. Enter the same email id and password and click **login**.

![Screenshot 2024-04-16 193935](https://github.com/BiJu-02/TravelRecommender/assets/67651024/af89f180-77cf-4661-86c8-8f0ac95ededb)
    The browser will show the home page. Click on **Add Destination** button.
    
![Screenshot 2024-04-16 193956](https://github.com/BiJu-02/TravelRecommender/assets/67651024/f69cb428-7ec7-4b04-a194-630a3ab1298c)
    On the card type in a **travel destination name**, you will be suggested options as you type. Select one from them (The travel destinations are limited to the one's that are in the dataset).

![Screenshot 2024-04-16 194015](https://github.com/BiJu-02/TravelRecommender/assets/67651024/1e4414e3-48a0-4eb7-86d2-215048e50822)
    Click on the box below **Aspects you liked** and select the options you feel like you liked about the destination. Do the same for **Activities you enjoyed**.
    
![Screenshot 2024-04-16 194030](https://github.com/BiJu-02/TravelRecommender/assets/67651024/98be7f12-9016-4f3f-adaa-a67b5d99c65c)
    After filling in as many destinations as you want, click on **Recommend**.

![Screenshot 2024-04-16 194050](https://github.com/BiJu-02/TravelRecommender/assets/67651024/b36cc93d-fdc6-498d-8eb1-e802210536b5)
The page will show you 5 different travel destinations that you could visit based on your prefernces. On the header you can press **Preferences** button to go back to editing the travel destinations that you input or press on **Logout** button to log out.


