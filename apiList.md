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

- post /request/send/interested/:userId
- post /request/send/ignored/:userId
- post /request/review/accepted/:requestId
- post /request/review/rejected/:requestId

#### User Router

- get /user/connections
- get /requests/recieved
- get /feed -> Gets you the profiles of other users on platform.

status: ignore -> pass, interested -> like, accepted -> right swipe, rejected -> left swipe
