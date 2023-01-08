
# Social Media Web application
Social media platform for conversation , connecting friends and building relationships



## Tech Stack

**Client:** React, , TailwindCSS

**Server:** Node, Express,MongoDb


## Technical Goals

###### Posts, Comments, Chat, Marketplace:

Users will be able to custom tailor a ”post” to be accessible from other devices. A post will be described as image upload. The author of the post as well as other users of the web application will be able to “comment” on existing posts. Comment defined as text. Users can have chat other users on the app.


###### User Authentication:
Users will be able to login with their specific data to access posting, commenting. We aim to utilize JWT for authentication rather than using external libraries such as Passport.js User's data will be stored in a database(MongoDB tentatively) to allow for recalling of existing post and profile pages.
## Sample images


![image](https://user-images.githubusercontent.com/105580721/211220090-557db4c6-e9a3-473b-8eea-d792b55c9ced.png)


![image](https://user-images.githubusercontent.com/105580721/211220147-88b1af71-6822-4137-b549-b0b9ec2cf1dd.png)


![image](https://user-images.githubusercontent.com/105580721/211220197-9d0baa02-7823-4846-9cc6-42ab82741705.png)

![image](https://user-images.githubusercontent.com/105580721/211220230-af40d136-462b-48e1-9220-d1591dfb9003.png)






## Login Details

| Email             | Name                   |Password|  Role  |
| ----------------- | -----------------------|--------|----------|
| admin@gmail.com | admin |  1234   | Administrator  |
| sravanpthankappan@gmail.com|  1234     |  User   |



## Run Locally

Clone the project

```bash
  git clone https://github.com/Sravan-P-Thankappan/Fashion-feet.git
```

Go to the project directory

```bash
  cd client
  cd server
  cd socket
  cd notification
```


Install dependencies

```bash
  npm install
```

Start the server

```bash
  client:npm start
  server:npm start
  socket:npm start
  notification :npm start

```

