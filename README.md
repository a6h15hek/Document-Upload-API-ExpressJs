# DocUpload-8 API 

A Generic Independent  file/document uploading component that can be integrated with any application in a secure way.

## API Usage

### Generating Authkey

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
    **Content:** `{ id : 12 }`

* **Error Response:**

  Most endpoints will have many ways they can fail. From unauthorized access, to wrongful parameters etc. All of those should be liste d here. It might seem repetitive, but it helps prevent assumptions from being made where they should be.

  * **Code:** 401 UNAUTHORIZED <br/>
    **Content:** `{ error : "Log in" }`

    OR

  * **Code:** 422 UNPROCESSABLE ENTRY <br/>
    **Content:** `{ error : "Email Invalid" }`


<br/><br/>

### Document Upload

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
    **Content:** `{ id : 12 }`

* **Error Response:**

  Most endpoints will have many ways they can fail. From unauthorized access, to wrongful parameters etc. All of those should be liste d here. It might seem repetitive, but it helps prevent assumptions from being made where they should be.

  * **Code:** 401 UNAUTHORIZED <br/>
    **Content:** `{ error : "Log in" }`

    OR

  * **Code:** 422 UNPROCESSABLE ENTRY <br/>
    **Content:** `{ error : "Email Invalid" }`

    ### Get Files 

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
    **Content:** `{ error : "Log in" }`

    OR

  * **Code:** 422 UNPROCESSABLE ENTRY <br/>
    **Content:** `{ error : "Email Invalid" }`
