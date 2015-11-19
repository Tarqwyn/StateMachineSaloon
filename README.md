shortHandPostProcessingTool
===========================

Node webkit app that takes the exported output from a shorthand project and bbc'ifies it until it is in a state to deploy.

There are instructions for the producers to help them construct the initial content in shorthand which can be found here: 

https://docs.google.com/document/d/1J3mlxn9jKu32MhIl9mzZe1yl3JKFka8cB1SbTlteSzU/edit?usp=sharing 

The producers guide explains how to construct pieces of content like the bbc quotes and embedding bbc video (smp) that this tool use to output the final product

## Staring point

- Clone the repository

- Create a new config file in `assets/config`.  Name it `<JIRA_NUMBER>.json`.

- Add all the required values.  Use an existing config for an example of what to put into it.

- Edit the file `node_modules/model.js` by changing the variable `jiraNumber` at the beginning of the file to the jira number for this new shorthand.

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

- Run selected tasks

## Instructions for running the tool with background videos

* Editorial staff can add background videos into shorthand and export as they did previously.

* Editorial staff also have to upload the videos into jupiter and publish them as MAP pages.  Once they have done this they must tell you what pages they have been published to.

* Developer visits each map page and uses dev tools to work out what the MAP ID value is for each video.  For example if you go to the page `http://www.bbc.co.uk/news/magazine-30719140` and inspect the video player, you'll find the element `div.player-wrapper`.  The child element `div#media-asset-page-video` has the attribute `data-asset-id` with the value `30719140`, this is the MAP ID for the video.  Take a copy of this value from each MAP page for the background videos you want to appear in the shorthand.

* Developer opens the file `assets/config/backgroundVideoMapping.json` and adds a new entry.  For Example the following entry is for a project with the JIRA ticket number `0000`:

  ```
  {
	"0000": {
		"chapterheadopeningimage_1": "30719140"
   	}
 }
 ```

 You need to add a row in the entry for each background video.  If you inspect each background video in the shorthand HTML file, you'll find video elements like this:

 ```
 <video autoplay="autoplay" loop="loop" muted="muted" data-autoscale="cover" data-autoscale-content-ratio="1.77777777778">
    <source src="./media/chapterheadopeningimage_1.mp4" type="video/mp4">
    <source src="./media/chapterheadopeningimage.webmhd.webm" type="video/webm">
 </video>
 ```

 Using the JSON file we want to match the name of the MP4 source video file with the MAP ID that we'll replace it with.  Using the examples above this means that the source named `chapterheadopeningimage_1` will be replaced with an SMP player using the MAP ID `30719140`.

* Run the shorthand post processing tool.  When the tool gets to the video processing part, you'll be asked for the JIRA ticket number, type in just the 4 digit id.

* That should be it.
