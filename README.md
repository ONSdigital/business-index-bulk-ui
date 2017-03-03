# DemoU

For Bulk BI project

## Environment setup:

You will need to setup the environment for the Business Index to run.

These instructions are for Mac OS, but should work for Windows.

It is recommended to install IntelliJ Idea as your IDE.

* 1. Install java jre-1.8

https://java.com/en/download/help/mac_install.xml

* 2. Install scala 2.11

https://www.scala-lang.org/download/2.11.8.html

* 3. Install elasticsearch 2.4.4

It helps to have brew installed to make the elasticsearch installation easier.

http://brew.sh/

And then type the following into the terminal:

```shell
brew install elasticsearch24
```

* 4. Install sbt

```shell
brew install sbt
```

* 5. Clone the Business Index

```shell
git clone https://github.com/ONSdigital/business-index-api.git
```

* 6. Download CORS for Chrome:

https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en

## Running the Business Index:

* 1. Run elasticsearch

```shell
elasticsearch
```

* 2. Open a new terminal and navigate to where you cloned the Business Index in the terminal

* 3. Run sbt, then once in sbt, run the business index.

```shell
sbt
run
```

## Running the Demo UI:

This should be possible by cloning this repo, and then opening index.html in your browser.


## Troubleshooting

If you have pulled the repo, have the Business Index running and the website gives errors in the console when you try to submit a query, turn CORS off, then on again and reload the page.
