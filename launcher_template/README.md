# Shorthand_launcher: shorthand_promo

shorthand launcher(promo) template module

## Getting started

Set up the project

In this document XXXX stands for the gira ticket number for example(10472)
And YEAR stands for the current year for example(2015)

Copy the launcher_template directory into /news/special/YEAR/
Rename the copy version to newsspec_XXXX
cd into newsspec_XXXX
Open it in sublime
Change the value for the project number in /news/special/YEAR/newsspec_XXXX/config.json from XXXX to the jira ticket number
Replace the image in  /news/special/YEAR/newsspec_XXXX/source/img/responsive with the new image
Change the contents of /news/special/YEAR/newsspec_XXXX/source/tmpl/index.html.tmpl as required
You can style it here /news/special/YEAR/newsspec_XXXX/source/scss/shorthand_launcher.scss
change the project's description and name in /news/special/2015/newsspec_XXXX/README.md

```
grunt
```

Make images responsive

```
grunt images
```

Build World Service version

```
grunt translate
```

## iFrame scaffold

This project was built using the iFrame scaffold v1.6.2

## License
Copyright (c) 2014 BBC