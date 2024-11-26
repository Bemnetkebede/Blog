▎Basic Web Server

This is a simple Node.js web server that demonstrates basic routing capabilities. It has three routes that respond with static messages.

▎Features

• /name: Returns your full name as plain text.

• /hobby: Returns your favorite hobby or activity as a JSON object.

• /dream: Returns a motivational message about your dream or goal in life.

▎Installation

▎1. Clone this repository

git clone <repository-url>
cd basic-web-server


▎2. Install Dependencies

Make sure you have Node.js installed on your machine. Then, run the following command to install the required dependencies:

npm install


▎3. Start the Server

You can start the server using the following command:

node index.js


Replace index.js with the main file of your application if it has a different name.

▎4. Access the Routes

Once the server is running, you can access the following routes in your web browser or via tools like Postman:

• Name: http://localhost:5000/name

• Hobby: http://localhost:5000/hobby

• Dream: http://localhost:5000/dream

▎Example Responses

• GET /name

  • Response: Bemnet Kebede

  
• GET /hobby

  • Response: 
    
    {
      "hobby": "Playing soccer"
    }
    

  
• GET /dream

  • Response: Believe in yourself and chase your dreams!

▎Contributing

If you would like to contribute to this project, please fork the repository and submit a pull request.
