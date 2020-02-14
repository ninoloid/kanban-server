# **KANBAN-DUNG** #
### REST API built with Express and Sequelize ###
----

**KANBAN SERVER**
----

* **BASE URL**
  
      localhost:3000

* **Method:**
  
  `GET` | `POST` | `PUT` | `PATCH` | `DELETE`
  

<br>
----
## **Task Route** ##
**Show Tasks**
----
  Get all the tasks filtered by Project ID.

* **URL**

      /task/getTask

* **Method:**

  `POST`

* **Data Params**

    * **ProjectId** : integer

* **Headers**
  
  **Required:**
 
      access_token

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ Tasks }`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg: Error Message }`

    OR

  * **Code:** 403 FORBIDDEN <br />
    **Content:** `{ msg : 'This page can only be accessed by registered user' }`

<br>

**Add Tasks**
----
  Create a task.

* **URL**

      /task

* **Method:**

  `POST`

* **Data Params**

    * **title** : string
    * **description** : string
    * **CategoryId** : integer
    * **ProjectId** : integer

* **Headers**
  
  **Required:**
 
      access_token
  
* **Success Response:**

  * **Code:** 201 CREATED <br />
    **Content:** `{ Created Item }`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : err.message }`

    OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ Validation Error }`

    OR

  * **Code:** 403 FORBIDDEN <br />
    **Content:** `{ msg : 'This page can only be accessed by registered user' }`

<br>

**Show Task by ID**
----
  Get a single task info.

* **URL**

      /task/:id

* **Method:**

  `GET`

* **Params**
  
  **Required:**
 
      id (integer)
      
* **Headers**
  
  **Required:**
 
      access_token
  
* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ A Single Task (by ID) }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ msg: 'Not found' }`

    OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : err.message }`

    OR

  * **Code:** 403 FORBIDDEN <br />
    **Content:** `{ msg : 'This page can only be accessed by registered user' }`

<br>

**Update Task Title and Description**
----
  Update a task with new info.

* **URL**

      /task/:id

* **Method:**

  `PUT`

* **Params**
  
  **Required:**
 
      id (integer)

* **Data Params**

  * **title** : string
  * **description** : string

* **Headers**
  
  **Required:**
 
      access_token
  
* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ msg: 'Task updated successfully' }`
 
* **Error Response:**
  
  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg: Error Message }`

    OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ msg: "Not Found" }`

    OR

  * **Code:** 403 FORBIDDEN <br />
    **Content:** `{ msg : 'This page can only be accessed by registered user' }`

<br>

**Update Task Category**
----
  Change category of a task.

* **URL**

      /task/:id

* **Method:**

  `PATCH`

* **Params**
  
  **Required:**
 
      id (integer)

* **Data Params**

  * **CategoryId** : integer

* **Headers**
  
  **Required:**
 
      access_token
  
* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ msg: 'Task category updated successfully' }`
 
* **Error Response:**
  
  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg: Error Message }`

    OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ msg: "Not Found" }`

    OR

  * **Code:** 403 FORBIDDEN <br />
    **Content:** `{ msg : 'This page can only be accessed by registered user' }`

<br>

**Delete Task**
----
  Delete a task.

* **URL**

      /task/:id

* **Method:**

  `DELETE`

* **Params**
  
  **Required:**
 
      id (integer)

* **Headers**
  
  **Required:**
 
      access_token
  
* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ msg: 'Task deleted successfully' }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ msg: 'Not found' }`

    OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : err.message }`

    OR

  * **Code:** 403 FORBIDDEN <br />
    **Content:** `{ msg : 'This page can only be accessed by registered user' }`

    OR

  * **Code:** 403 FORBIDDEN <br />
    **Content:** `{ msg : 'Not authorized' }`

<br>

---
## **Project Route** ##

**Create Project**
----
  Create a new project.

* **URL**

      /project

* **Method:**

  `POST`

* **Data Params**

    * **name** : string

* **Req Params**

    * **UserId** : integer

* **Headers**
  
  **Required:**
 
      access_token
  
* **Success Response:**

  * **Code:** 201 CREATED <br />
    **Content:** `{ msg: 'Project 'project_name' has been created' }`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : err.message }`

    OR

  * **Code:** 403 FORBIDDEN <br />
    **Content:** `{ msg : 'This page can only be accessed by registered user' }`

<br>

**Show Project**
----
  Show all created project.

* **URL**

      /project

* **Method:**

  `GET`

* **Headers**
  
  **Required:**
 
      access_token
  
* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ User's Project }`
 
* **Error Response:**
  
  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ msg: 'Not found' }`

    OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : err.message }`

    OR

  * **Code:** 403 FORBIDDEN <br />
    **Content:** `{ msg : 'This page can only be accessed by registered user' }`

<br>

**Add Person to a Project**
----
  Add a person to a project by email / username.

* **URL**

      /project/addPerson

* **Method:**

  `POST`

* **Data Params**

    * **identification** : string
    * **identification** : string

* **Headers**
  
  **Required:**
 
      access_token
  
* **Success Response:**

  * **Code:** 201 CREATED <br />
    **Content:** `{ User 'user_identification' added to project }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ msg: 'Failed to add user to project. User not found' }`

    OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : err.message }`

    OR

  * **Code:** 403 FORBIDDEN <br />
    **Content:** `{ msg : 'User already added as project member' }`

    OR

  * **Code:** 403 FORBIDDEN <br />
    **Content:** `{ msg : 'This page can only be accessed by registered user' }`

<br>

**Delete Person from a Project**
----
  Delete a person from a project (only project admin can do this)

* **URL**

      /project/deletePerson/:id

* **Method:**

  `DELETE`

* **Params**
  
  **Required:**
 
      id (integer)

* **Headers**
  
  **Required:**
 
      access_token
  
* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ msg: 'User successfully deleted from project member }`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : err.message }`

    OR

  * **Code:** 404 FORBIDDEN <br />
    **Content:** `{ msg : 'Not Found' }`

    OR

  * **Code:** 403 FORBIDDEN <br />
    **Content:** `{ msg : 'This page can only be accessed by registered user' }`

    OR

  * **Code:** 403 FORBIDDEN <br />
    **Content:** `{ msg : 'Sorry you're not an administrator of this project' }`
<br>

**Delete a Project**
----
  Delete a project (only project admin can do this)

* **URL**

      /project/:id

* **Method:**

  `DELETE`

* **Params**
  
  **Required:**
 
      id (integer)

* **Headers**
  
  **Required:**
 
      access_token
  
* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ msg: 'Project deleted successfully }`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : err.message }`

    OR

  * **Code:** 404 FORBIDDEN <br />
    **Content:** `{ msg : 'Not Found' }`

    OR

  * **Code:** 403 FORBIDDEN <br />
    **Content:** `{ msg : 'This page can only be accessed by registered user' }`

    OR

  * **Code:** 403 FORBIDDEN <br />
    **Content:** `{ msg : 'Sorry you're not an administrator of this project' }`

<br>

**Get List of Project's Member**
----
  Show members of a project (exclude project admin)

* **URL**

      /project/:id

* **Method:**

  `GET`

* **Params**
  
  **Required:**
 
      id (integer)

* **Headers**
  
  **Required:**
 
      access_token
  
* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ Project's Member }`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : err.message }`

    OR

  * **Code:** 404 FORBIDDEN <br />
    **Content:** `{ msg : 'Not Found' }`

    OR

  * **Code:** 403 FORBIDDEN <br />
    **Content:** `{ msg : 'This page can only be accessed by registered user' }`

<br>

---
## **User's Route** ##

**Register**
----
  Register as a new member.

* **URL**

      /register

* **Method:**

  `POST`

* **Data Params**
  
  **Required:**
  * **email** : string
  * **password** : string

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ User }`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg: Error Message }`

    OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ Validation Error }`

<br>

**Login**
----
  Login by email and password.

* **URL**

      /register

* **Method:**

  `POST`

* **Data Params**
  
  **Required:**
  * **email** : string
  * **password** : string

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ User's Token, User's Username }`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg: Error Message }`

    OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ msg: 'Invalid Username / Password' }`

    OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ Validation Error }`

<br>

**Google Login**
----
  Login by a google account.

* **URL**

      /google-auth

* **Method:**

  `POST`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ User's Token, User's Username }`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg: Error Message }`