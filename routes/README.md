# Endpoints

1. [Get user list](#get-user-list)
2. [Get user by id](#get-user-by-id)
3. [Create a new user](#create-a-new-user)
4. [Delete user by id](#delete-user-by-id)
5. [Get order by id](#get-order-by-id)
6. [Create new order](#create-new-order)
7. [Get item list](#get-item-list)
8. [Get item by id](#get-item-by-id)

## Get user list
`GET /api/users`

## Get user by id
`GET /api/user/:id`
#### Path parameters
- `id` *integer* **Required**

## Create new user
`POST /api/user`
#### Body parameters
- `name` *string* **Required**
- `email` *string* **Required**

## Delete user by id
`DELETE /api/user/:id`
#### Path parameters
- `id` *integer* **Required**

## Get order by id
`GET /api/order/:id`
#### Path parameters
- `id` *integer* **Required**

## Create new order
`POST /api/order`
#### Body parameters
- `user` *string* **Required**
- `items` *array of objects* **Required**
  - `name` *string* **Required**
  - `quantity` *integer* **Required**

## Get item list
`GET /api/items`

## Get item by id
`GET /api/item/:id`
#### Path parameters
- `id` *integer* **Required**
