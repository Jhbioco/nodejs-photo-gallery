# nodejs-photo-gallery

This is a simple backend app of photo gallery with nodejs, express and mongodb.
You can clone this project on your machine, run and change it.

**Dependecies**
You need to have mongodb installed in your machine.

***Create the project***
```
npm init -y
```
***Install express***
```
npm i express
```

***Install mongoose and mongoose-paginate***
```
npm i mongoose
npm i express-pagination
```
Mongoose is a ODM for mongodb (See more: https://www.npmjs.com/package/mongoose). 
You used mongoose-paginate to implement pagination in our project (See documentation for more details: https://www.npmjs.com/package/mongoose-paginate).

***Install joi and joi-objectid***
```
npm i joi
npm i joi-objectid
```
We use joi to perform validation in our models fields (See more: https://www.npmjs.com/package/joi).

***Install multer***
We use multer in order to implement file upload (See more: https://www.npmjs.com/package/multer).

