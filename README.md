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
![Home Page](https://github.com/sambrady0652/cocktail-hour/blob/master/wireframes/home_screen.png)

### Signin Modal

![Sign In](https://github.com/sambrady0652/cocktail-hour/blob/master/wireframes/sign_in.png)

### Create Drink Form

![Create Drink](https://github.com/sambrady0652/cocktail-hour/blob/master/wireframes/create_drink.gif)

### Searching

![Search By Name](https://github.com/sambrady0652/cocktail-hour/blob/master/wireframes/searching.gif)
![Search By Ingredient](https://github.com/sambrady0652/cocktail-hour/blob/master/wireframes/ingredients_form.png)



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
