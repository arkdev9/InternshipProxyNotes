# Express Bootstrap Template

A slightly modified version of the folder structure created by `express-generator`.
The view engine has been set to Pug and the `layout.pug` file has been modified to include
the CDN links for all Bootstrap 4 dependencies. `users.js` has also been deregistered as a route
and removed from the repository.

## Using the Template

The template can be cloned and used directly in place of use the `express-generator` command.
Keep in mind though that upon cloning, you need to run `sudo rm -rf .git` from the root of the cloned
repository so that your local copy will stop tracking changes from the template repository. You can
then create and push to your own repository.