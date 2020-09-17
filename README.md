# Cocktail Hour 

React application serving Cocktail Recipes from Flask API

See Cocktail Hour live [here](https://cocktailhours.herokuapp.com/)

## Main Features

1. User Authentication using JSON Web Tokens and login Modals 
2. Create new cocktails and upload them to the site; this includes image uploads using Boto3 and the AWS Bucket
3. Search for cocktail recipes by ingredient or by name
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
