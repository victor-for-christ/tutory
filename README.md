# tutory

## A tutoring app built with Node, Express, MongoDB and other technologies

This app has three categories of users: Admin, tutors and students. Every user needs an email, first name, surname and password to sign up.

To sign in as an admin:

```JSON
{
  email: admin@tutory.io
  password: test1234
}
```

Admin/Students/tutors can retrieve a subject in a category (by Id) using:

```curl
 https://tutory-sn.herokuapp.com/api/v1/categories/{categoryID}/subjects/{subjectsID}
```

e.g

```https
https://tutory-sn.herokuapp.com/api/v1/categories/5eb993f20cd35b2c3461cc43/subjects/5ebd2f2f44b7db3a54497d63

```

Admin/Students /tutors can retrieve all subjects, by category

```curl
 https://tutory-sn.herokuapp.com/api/v1/categories/{categoryID}/subjects
```

e.g.

```https
https://tutory-sn.herokuapp.com/api/v1/categories/5eb993f20cd35b2c3461cc43/subjects
```

Admin/Students /tutors can search for subjects by name, sorted alphabetically in ascending order.

multiple query

```https
https://tutory-sn.herokuapp.com/api/v1/subjects?name=mathematics&sort=name
```

| Key  | Value                        | Description    |
| ---- | ---------------------------- | -------------- |
| name | {any value} e.g. Mathematics | Search by name |
| sort | {any value} e.g. name        | sort by name   |

## **`Authentication`**

**`Headers`**

| Key          | Value            | Description |
| ------------ | ---------------- | ----------- |
| Content-Type | application/json | JSON TYPE   |

Admin/Students/tutors sign in:

Submit a `POST` request to https://tutory-sn.herokuapp.com/api/v1/users/login

```JSON
{
  email: adejohn@tutory.io,
  password: test1234
}
```

Student signs up:

Submit a `POST` request to https://tutory-sn.herokuapp.com/api/v1/users/signup

```JSON
{
  surname: "John",
  fistName: "Ade",
  email: adejohn@tutory.io,
  password: test1234
}
```

Tutor signs up:

Submit a `POST` request to https://tutory-sn.herokuapp.com/api/v1/users/signup/tutor

**`Body`**

```JSON
{
  surname: "John",
  fistName: "Seun",
  email: seunjohn@tutory.io,
  password: test1234
}
```

Admin/Students/tutors gets user details:

Submit a `GET` request to https://tutory-sn.herokuapp.com/api/v1/users/me

Admin/Students/tutors can use forgotPassword route:

Make a POST request to https://tutory-sn.herokuapp.com/api/v1/users/forgotPassword

Admin/Students/tutors can use resetPassword route:

Make a PATCH to https://tutory-sn.herokuapp.com/api/v1/users/resetPassword/4ad8b43a5f75d031acc6d20ae3d24f062a361d46

Admin/Students/tutors can use update user details route:

Make a PATCH to https://tutory-sn.herokuapp.com/api/v1/users/updateMe

Admin/Students/tutors can use updatePassword route:

Make a POST to https://tutory-sn.herokuapp.com/api/v1/users/updatePassword

Admin/Students/tutors can use logout route:

Make a GET to https://tutory-sn.herokuapp.com/api/v1/users/logout

<!-- ```JSON
{
    "email": "nagiatzi@gmail.com",
    "password": "123456"
}
``` -->

| Request | Endpoints                                                         | Description                                                                  |
| ------- | ----------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| POST    | https://tutory-sn.herokuapp.com/api/v1/users/login                | User Login                                                                   |
| POST    | https://tutory-sn.herokuapp.com/api/v1/users/signup               | User Sign up for Student                                                     |
| GET     | https://tutory-sn.herokuapp.com/api/v1/users/me                   | Get Logged in User                                                           |
| POST    | https://tutory-sn.herokuapp.com/api/v1/users/forgotPassword       | Forgot Password (Send an email token for forogoten password)                 |
| PATCH   | https://tutory-sn.herokuapp.com/api/v1/users/resetPassword/:token | Reset Password (Reset a password for a user with a tokken from the database) |
| PATCH   | https://tutory-sn.herokuapp.com/api/v1/users/updateMe             | Update User Details (Patch method to update user details)                    |
| PATCH   | https://tutory-sn.herokuapp.com/api/v1/users/updatePassword       | Change users password with 2 fields from req.body: new and current password  |
|         |
| GET     | https://tutory-sn.herokuapp.com/api/v1/users/logout               | Logout User (Logout user and clean cookies)                                  |

## **`Categories`**

Categories has three 3 categories which are primary, JSS or SSS

**`Headers`**

| Key          | Value            | Description |
| ------------ | ---------------- | ----------- |
| Content-Type | application/json | JSON TYPE   |

**_Create a category_**

```JSON
{
	"name":"primary",
	"value": 6
}
```

Be mindful of the case. i.e. JSS not jss

```JSON
{
	"name":"JSS",
	"value": 1
}
```

**_Get a category_**

https://tutory-sn.herokuapp.com/api/v1/categories/5eb99279a86d8830d46b5a7e

**_Get all categories_**

https://tutory-sn.herokuapp.com/api/v1/categories

**_Delete a category_**

https://tutory-sn.herokuapp.com/api/v1/categories/5eb99279a86d8830d46b5a7e

**_Update a category_**

https://tutory-sn.herokuapp.com/api/v1/categories/5eb99279a86d8830d46b5a7e

| Request | Endpoints                                                    | Description                                  |
| ------- | ------------------------------------------------------------ | -------------------------------------------- |
| POST    | https://tutory-sn.herokuapp.com/api/v1/categories            | Admin can create category                    |
| PATCH   | https://tutory-sn.herokuapp.com/api/v1/categories/categoryId | Admin can update category                    |
| DELETE  | https://tutory-sn.herokuapp.com/api/v1/categories/categoryId | Admin can delete category                    |
| GET     | https://tutory-sn.herokuapp.com/api/v1/categories            | Admin/tutor/student can get all categories   |
| GET     | https://tutory-sn.herokuapp.com/api/v1/categories/categoryId | Admin/tutor/student can get a category by Id |

## **`Subjects`**

**`Headers`**

| Key          | Value            | Description |
| ------------ | ---------------- | ----------- |
| Content-Type | application/json | JSON TYPE   |

**_Get all subjects_**

GET:: https://tutory-sn.herokuapp.com/api/v1/subjects

**_Get a subject_**

GET:: https://tutory-sn.herokuapp.com/api/v1/subjects/5ebd2f2f44b7db3a54497d63

**_Create a subject_**

POST:: https://tutory-sn.herokuapp.com/api/v1/subjects

```JSON
{
"name":"Basic Science",
"category": "5eb993f20cd35b2c3461cc43"
}
```

OR

POST:: https://tutory-sn.herokuapp.com/api/v1/categories/5eb993f20cd35b2c3461cc43/subjects

```JSON
{
"name":"Basic Science"
}
```

**_Update a subject_**

PATCH:: https://tutory-sn.herokuapp.com/api/v1/subjects/5ebd2f2f44b7db3a54497d63

**_Delete a subject_**

DELETE:: https://tutory-sn.herokuapp.com/api/v1/subjects/5ebd2f2f44b7db3a54497d63

| Request | Endpoints                                                  | Description                                         |
| ------- | ---------------------------------------------------------- | --------------------------------------------------- |
| POST    | https://tutory-sn.herokuapp.com/api/v1/categories/subjects | Admin can create subject under the three categories |
| PATCH   | https://tutory-sn.herokuapp.com/api/v1/subjectId           | Admin can update subject in a category              |
| DELETE  | https://tutory-sn.herokuapp.com/api/v1/subjects/subjectId  | Admin can delete subject in a category              |
| GET     | https://tutory-sn.herokuapp.com/api/v1/subjects            | Admin/tutor/student can get all categories          |
| GET     | https://tutory-sn.herokuapp.com/api/v1/subjects/subjectId  | Admin/tutor/student can get a subject by Id         |

## **`Lessons`**

**`Headers`**

| Key          | Value            | Description |
| ------------ | ---------------- | ----------- |
| Content-Type | application/json | JSON TYPE   |

**_Get all lessons_**

GET:: https://tutory-sn.herokuapp.com/api/v1/lessons

**_Get a subject_**

GET:: https://tutory-sn.herokuapp.com/api/v1/lessons/5ebd2f2f44b7db3a54497d63

**_Create a subject_**

POST:: https://tutory-sn.herokuapp.com/api/v1/lessons

```JSON
{
"name":"Basic Science",
"category": "5eb993f20cd35b2c3461cc43"
}
```

OR

POST:: https://tutory-sn.herokuapp.com/api/v1/categories/5eb993f20cd35b2c3461cc43/subjects

```JSON
{
"name":"Basic Science"
}
```

**_Update a subject_**

PATCH:: https://tutory-sn.herokuapp.com/api/v1/subjects/5ebd2f2f44b7db3a54497d63

**_Delete a subject_**

DELETE:: https://tutory-sn.herokuapp.com/api/v1/subjects/5ebd2f2f44b7db3a54497d63

| Request | Endpoints                                                 | Description                                         |
| ------- | --------------------------------------------------------- | --------------------------------------------------- |
| POST    | https://tutory-sn.herokuapp.com/api/v1/lessons            | Admin can create subject under the three categories |
| PATCH   | https://tutory-sn.herokuapp.com/api/v1/subjectId          | Admin can update subject in a category              |
| DELETE  | https://tutory-sn.herokuapp.com/api/v1/subjects/subjectId | Admin can delete subject in a category              |
| GET     | https://tutory-sn.herokuapp.com/api/v1/subjects           | Admin/tutor/student can get all categories          |
| GET     | https://tutory-sn.herokuapp.com/api/v1/subjects/subjectId | Admin/tutor/student can get a subject by Id         |
