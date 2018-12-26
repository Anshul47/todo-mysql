# todo-mysql

# 1. Signup Login User
   1. Method: POST
   2. URL: www.disto-do.com/user
   3. Headers:
      1. Content-Type        application/json
   4. Body raw (application/json):
   
 	    {
         "email": "test.email@gmail.com",
         "password": "qwerty12345"
	    }


# 2. Create New ToDo
   1. Method: POST
   2. URL: www.disto-do.com/todo
   3. Headers:
      1. Content-Type        application/json
      2. x-auth                {token}        
   4. Body raw (application/json):
   
 	    {
         "text": "Todo Text"
	    }


# 3. Get All InCompleted ToDo
   1. Method: GET
   2. URL: www.disto-do.com/todo
   3. Headers:
      1. Content-Type        application/json
      2. x-auth                {token}        


# 4. Get All Completed ToDo
   1. Method: GET
   2. URL: www.disto-do.com/todo/completed
   3. Headers:
      1. Content-Type        application/json
      2. x-auth                {token}        


# 5. Update ToDo As Completed
   1. Method: GET
   2. URL: www.disto-do.com/todo/completed/{id}
   3. Headers:
      1. Content-Type        application/json
      2. x-auth                {token}        


# 6. Update ToDo
   1. Method: POST
   2. URL: www.disto-do.com/todo/text/{id}
   3. Headers:
      1. Content-Type        application/json
      2. x-auth                {token}        
   4. Body raw (application/json):
   
 	    {
         "text": "Todo Text"
      }


# 7. Delete ToDo
   1. Method: DELETE
   2. URL: www.disto-do.com/todo/{id}
   3. Headers:
      1. x-auth                {token}        


# 8. Logout User
   1. Method: DELETE
   2. URL: www.disto-do.com/user/me/token
   3. Headers:
	    1. x-auth                {token}


