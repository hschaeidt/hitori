## GraphQL

### Typescript typings

#### Documentation

We use the [apollo-codegen](https://github.com/apollographql/apollo-codegen) library to sync and update the Typescript types based on the GraphQL schema.

To update the types:
```
# first update the ./schema.json file in the repo based on the GraphQL endpoint
npm run graphql:updateSchema

# next generate the types located at ./src/app/schema.json
npm run graphql:generateTypes
```

Regenerating the types shall become a separate commit.

## i18n

### Documentation

We are using ngx-translate as the official angular i18n is not yet supported in ionic.<br />
Reference: https://github.com/ionic-team/ionic/issues/8542<br />
Note: Keep an eye on this and update if necessary<br />

Official references:

* [ngx-translate](http://www.ngx-translate.com/)
* [Ionic Developer Resources - ngx-translate](https://ionicframework.com/docs/developer-resources/ng2-translate/)

The initialization takes place in the [app.component.ts](src/app/app.component.ts#22).

#### Add translations

To add a translation a new file must be created in the [src/assets](src/assets) folder.<br />
Then add the language code to the [app.component.ts](src/app/app.component.ts#22) to allow loading of that newly created language.

================================================================================

This is a starter template for [Ionic](http://ionicframework.com/docs/) projects.

## How to use this template

*This template does not work on its own*. The shared files for each starter are found in the [ionic2-app-base repo](https://github.com/ionic-team/ionic2-app-base).

To use this template, either create a new ionic project using the ionic node.js utility, or copy the files from this repository into the [Starter App Base](https://github.com/ionic-team/ionic2-app-base).

### With the Ionic CLI:

Take the name after `ionic2-starter-`, and that is the name of the template to be used when using the `ionic start` command below:

```bash
$ sudo npm install -g ionic cordova
$ ionic start myTabs tabs
```

Then, to run it, cd into `myTabs` and run:

```bash
$ ionic cordova platform add ios
$ ionic cordova run ios
```

Substitute ios for android if not on a Mac.

