Banking Project Test
====================================

This is a sample automation project for the [XYZ Bank](https://www.globalsqa.com/angularJs-protractor/BankingProject/).

Prerequisites
-------------

* Node 16.x of higher
* npm 7.x or higher
* Docker 20.x or higher
* Java 8 or higher (for Allure)

Setup
-----

```shell
npm install
```

Run Tests
---------

```shell    
npm test
```

Generate Allure Report
----------------------

```shell    
npm run report:generate 
```

Lint code
---------

```shell
npm run lint
```

Note 
----

The page object pattern was not used in this project on purpose.
First of all, Cypress developer recommends [not to use it](https://www.cypress.io/blog/2019/01/03/stop-using-page-objects-and-start-using-app-actions/). 
Secondly, for Cucumber + Cypress I prefer using Step pattern instead. The step definition files represent the app pages. Step definitions may be reusable both in features and in other step definitions.
Finally, Chained Page Object pattern is hard to implement in Cypress due to its async nature. Also, we might face the circular dependency problem.