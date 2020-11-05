# DocUpload-8 API 

A Generic Independent  file/document uploading component that can be integrated with any application in a secure way.

## API Usage

### How to generate auth key to perform Read & write operation?

* **URL**

  [admin/register/](admin/register/)

* **Method**

  POST

* **URL Params**

  Required:

  `name=[alphanumeric]`

  `email=[alphanumeric]`

  `password=[alphanumeric]`

  Optional:

  `organization=[alphanumeric]`

* **Data Params**

  If making a post request, what should the body payload look like? URL Params rules apply here too.

* **Success Response**

   * **Code:** 200 <br />
    **Content:** `{ message : "Success", Authkey : AUTH4kjkakfjjaejfjajk2324 }`

* **Error Response:**

  Most endpoints will have many ways they can fail. From unauthorized access, to wrongful parameters etc. All of those should be listed here. It might seem repetitive, but it helps prevent assumptions from being made where they should be.

  * **Code:** 401 UNAUTHORIZED <br/>
    **Content:** `{ error : "Log in" }`

    AND

  * **Code:** 422 UNPROCESSABLE ENTRY <br/>
    **Content:** `{ error : "Email Invalid" }`


<br/><br/>

### How to upload files Upload and image configuration parameters?

* **URL**

  [admin/docment/upload](admin/document/upload)

* **Method**

  POST

* **URL Params**

  Required:

  `author=[alphanumeric]`
  
  `documentfile=[file]`

  `width=[integer]`

  `height=[integer]`

  `authkey=[alphanumeric]`

  `password=[alphanumeric]`

  `appname=[alphanumeric]`

  Optional:

  `quality=[alphanumeric]`

* **Data Params**

  If making a post request, what should the body payload look like? URL Params rules apply here too.

* **Success Response**

   * **Code:** 200 <br />
    **Content:** `{ message : "success" , DocId : DOC394890280934809 }`

* **Error Response:**

  Most endpoints will have many ways they can fail. From unauthorized access, to wrongful parameters etc. All of those should be liste d here. It might seem repetitive, but it helps prevent assumptions from being made where they should be.

  * **Code:** 401 UNAUTHORIZED <br/>
    **Content:** `{ error : "email or password not match." }`

    AND

  * **Code:** 422 UNPROCESSABLE ENTRY <br/>
    **Content:** `{ error : "Input not valid." }`

    
    ### How to get the files?

* **URL**

  [admin/:docmentid/fileindex](admin/:documentid/fileindex)

* **Method**

  GET

* **URL Params**

  Required:


  `authkey=[alphanumeric]`

  `password=[alphanumeric]`


* **Data Params**

  If making a post request, what should the body payload look like? URL Params rules apply here too.

* **Success Response**

   * **Code:** 200 <br />
    **Content:** File

* **Error Response:**

  Most endpoints will have many ways they can fail. From unauthorized access, to wrongful parameters etc. All of those should be liste d here. It might seem repetitive, but it helps prevent assumptions from being made where they should be.

  * **Code:** 401 UNAUTHORIZED <br/>
    **Content:** `{ error : "Email or Password is invalid or you are not authorized to access this file" }`

    OR

  * **Code:** 422 UNPROCESSABLE ENTRY <br/>
    **Content:** `{ error : "inputs are not valid" }`
