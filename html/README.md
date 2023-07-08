# Guide for the project bradflaugher.com

## Building of the project

### Running via docker

- ```cd html```
- ```sudo sh rundocker.sh```
- then proceed to ```npm install``` and ```gulp``` in steps below

### Installing Locally 


For the project building you need those tools:
- [Node JS](https://nodejs.org/uk/) 
- [Node package manager (NPM)](https://www.npmjs.com/)

For more info regarding installing Node JS and NPM on macOS, Windows or Linux  you may go to [this site](https://kinsta.com/blog/how-to-install-node-js/).

Install Gulp
- ```npm install -g gulp-cli``` version 4.0.2 was used for development

### For building the project source you should do the following steps:

**1. Step 1**

From folder "Html" run the following command: 

````
npm install
````

This command will install all NPM packages, which are included in the project.

**Attention! You only need to take this step once, before the first building of the project.**

**2. Step 2**

For the building project using the Gulp package, which was installed with other packages in the previous step.

**You may use the following variants gulp command**

1. The command used in the developing version. Command build a project and runs Virtual local server.
````
gulp
````

2. The command may be used in the staging version of the site. Command build a project without HTML minification.
````
gulp build
````

3. This command should be used in the production version of the site. This command builds project with minimized HTML code of the site.
````
gulp build_prod
````

**Attention! After running gulp commands all files in the directory *"dist"* will be replaced.**

## Project structure

All code of the site is included in the **HTML** folder.

### In the HTML folder are those subfolders:
* **dist** - *contains compiled files of the project*;
* **src**  - *contains project source*.

### Project source structure (*src* folder)

In the HTML folder are those subfolders:
* **assets** - *contains fonts, images, scripts and CSS styles*;
* **data**  - *contains all main variables, used in the project*;
* **views**  - *contains source HTML files*.

#### 1. Data structure (*data* folder)
This folder contains those data files:
* ***global.json*** - in this file, you may change the name of the site, the text of the header and footer logo, and other global variables;
* ***menu.json*** - in this file, you may add and remove new items to the header and footer menu;
* ***path.json*** - in this file, you may change paths to the images of the site.

#### 2. Source HTML structure (*views* folder)
* ***layouts*** - this folder contains two base pages layouts **default.html** and **page-with-chart.html** (this layout should be used for pages, which contain Chart Diagram);
* ***pages*** - in this folder are files which contains body of the all pages on the site;
* ***partials*** - this folder contains HTML codes for all sections, which are used in the body of the pages on the site.


## Changing page title and meta description on the page

For each page, you may change the title and meta description. This you can do in the file, which contains the body for the current page. 

All files, which contain bodies for the pages, you may find in the directory ***"src\views\pages"***.

In each file is the code section, which looks like this:

````
layout: default
title: Home
metaDescription: This is the home page
``````

## Adding new items to menus

For adding new items to menus you don't need to add any HTML code.
New items of the menu you may add in the file ***menu.json*** in the **data** directory:

````json
{
    "header" : [
      {
        "label" : "bootcamp",
        "page" : "bootcamp.html"
      }
    ],
    "footer" : [
      {
        "label" : "privacy",
        "page" : "privacy.html"
      }
    ]
}
````

For example, I added a new item to the header menu:
````json
{
    "header" : [
      {
        "label" : "bootcamp",
        "page" : "bootcamp.html"
      },
      {
        "label" : "New page",
        "page" : "new-page.html"
      }      
    ],
    "footer" : [
      {
        "label" : "privacy",
        "page" : "privacy.html"
      }
    ]
}
````

## Changing data on the Bars Chart

To construct diagrams in the project used the JS library [ChartJS v2.9.4.](https://www.chartjs.org/docs/2.9.4/)

In the project used following code for the Bars Chart diagram:

````html
        <canvas 
                class="chart-section__canvas" 
                data-x-label="Years of Experience" 
                data-y-label="Annual Total Compensation" 
                data-x-values="1-4, 5-9, 10-19, 10-19, 20+" 
                data-y-values="78, 88, 105, 117, 118">
        </canvas>
````

All attributes in this section, which begin from the prefix "data-" are displayed on the Bars chart.

* ***data-x-label***  - the value of this attribute is displayed near the horizontal coordinate axis;
* ***data-y-label***  - the value of this attribute is displayed near the vertical coordinate axis;
* ***data-x-values***  - list of the values for the horizontal coordinate axis;
* ***data-y-values***  - list of the values for the vertical coordinate axis.

<br />

**Attention!** 
* Count of the values in the list in the attributes ***data-x-values*** and ***data-x-values*** must be the same;
* If you want to use a chart on the page you should use the ***page-with-chart*** layout.

## Adding new page

### For adding a new page you should do the following steps:

**1. Step 1**

In this step, you should create a new file, which will be contained the body for the new page in the directory ***src/views/pages***.

For example:
````html
layout: default
title: Home
metaDescription: This is the home page

<h1>Hello World</h1>
````

In the header of this file is the value *"layout"*.
If you want to use Chart Bar on this page you should use the ***page-with-chart*** layout.

**2. Step 2**

*If you don't used sections in the body of your page you may miss this step.*

In this step you should create new folder in the directory ***src/views/partials/sections/pages***.
Name of this directory should be the same with name of the page.

For example, you want to create a page ***"example.html"***. The name of the directory should be ***"example"***.

In this directory, in the future, you should create all section templates, which you will be used on the new page.

Are added examples of the sections, which are used now on the project to the folder ***src/views/partials/sections/examples***.
You may use them in the future.

**Name of the new section template must correspond following structure:**
````
{Name of the section}.page-{Name of the page which section used}.html
````





