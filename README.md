# cakebookwitter server

This server is written Node.js/Express.

## Databese

NEdb was choosen to save JSON objects. NeDB is a smaller NoSQL datastore that mimics MongoDB.
It's performing write, read and delete operations to the servers local filesystem.
Images are not saved to the database they are saved to the filesystem using fs-extra.
fs-extra is a package that adds file system methods that aren't included in the native fs module and adds promise support to the fs methods.
Before being saved images are resized using sharp package.

## Deployment

To run the srever locally no additional configuration is needed.
Just run these commands from the servers root directory:

``` npm install ```

and then 

``` npm start ``` 

The server will be runung on your ``` localhost:8000 ```

By default CORS is disabled.
 
