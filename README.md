# Getting Started
To start adding features to this app, clone the repo then install all the required packages
```
$ npm install
```

Once the installation has successfully completed, run
```
$ npm start
```

# Deployment
This project is set up for deployment to an AWS s3 bucket following [this tutorial](https://medium.com/ovrsea/deploy-automatically-a-react-app-on-amazon-s3-iam-within-minutes-da6cb0096d55).

[Install](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html) 'aws cli'.
Once installed, configure aws in your local environment to have the correct credentials for publishing to s3 by running
```
$ aws configure
```
You will be prompted for an access key id and secret access key, which can be given to you by the owners of this project.
You do not need to fill out any other options.

To build the application to a deployment ready state, run
```
$ npm run build
```

Once the build has successfully completed, run
```
$ npm run deploy
```

# References

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Below you will find some information on how to perform common tasks.<br>
You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).
