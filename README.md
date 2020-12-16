# Cocktail Hour 

Cocktail Hour is a simple, quick way to find recipes for your favorite cocktails by name or discover a new cocktail you can make with the ingredients in your fridge or pantry. If you don't see your favorite drink on the site, share it with the rest of us using the Create a Drink form.

See Cocktail Hour live [here](https://cocktailhours.herokuapp.com/)

## Technologies

* Backend: Python / Flask / SQLAlchemy / PostgresSQL
* Frontend: React / Redux
* Secure User Authentication using JSON Web Tokens and Bcrypt hashing
* Boto3 in conjunction with AWS for image hosting 

## Main Features

1. Smooth user login/sign up flow using Modals
2. Share your favorite cocktail recipes and images with others 
3. Search for drinks by ingredients or by name
4. Favorite/unfavorite cocktail recipes to easily find them again later

## Screen Views

### Home Page 

### Signin Modal

### Create Drink Form

### Search Form 

### Search Results



## Deploy to Heroku

1. Push docker container to heroku (this will build the dockerfile, and push) 
```zsh
$ heroku container:push web -a cocktailhours
```
2. Release docker container to heroku 
```zsh
$ heroku container:release web -a cocktailhours
```
3. set up database:
```zsh
    $ heroku run python -m database -a cocktailhours
```
