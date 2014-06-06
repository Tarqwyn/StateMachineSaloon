shortHandPostProcessingTool
===========================

Node webkit app that takes the exported output from a shorthand project and bbc'ifies it until it is in a state to deploy.

There are instructions for the producers to help them construct the initial content in shorthand which can be found here: 

https://docs.google.com/document/d/1J3mlxn9jKu32MhIl9mzZe1yl3JKFka8cB1SbTlteSzU/edit?usp=sharing 

The producers guide explains how to construct pieces of content like the bbc quotes and embedding bbc video (smp) that this tool use to output the final product

## Staring point

- Clone the repository

- In the project open the file 'assets/markup/bbcFooter.html' and edit it to reflect the new story details

- From terminal cd into the project directory and type:

*open node-webkit.app*

OR in finder click on node-webkit.app

- Follow the instructions

### Things the tool does

- Prompts for the shorthand export directory (you download this from the shorthand app page: https://app.shorthand.com/ )

- Sanity checks the directory you have just choosen

- Prompts for an output directory to save the processed story into

- Copy files into the output directory

- Prompt for setable options:
	
	. remove google analytics
	. add istats
	. add chartbeat
	. add bbc (smp) video
	. add bbc quotes
	. add bbc footer
	. add share tools

-run selected tasks


