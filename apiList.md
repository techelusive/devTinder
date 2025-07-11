# DevTinder APIs

#### AuthRouter

- post/signup
- post /login
- post /logout

#### Profile Router

- get /profile /view
- patch /profile/edit but it will not edit our amil and password. We don't use same api for edit the password
- patch /profile/password -> **homework**

#### Connection Request Router

- post /request/send/:status/:userId
- post /request/review/:status/:requestId

#### User Router

- get /user/requests
- get /user/connections
- get /feed -> Gets you the profiles of other users on platform.

status: ignore -> pass, interested -> like, accepted -> right swipe, rejected -> left swipe
