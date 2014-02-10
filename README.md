a3-mjyc
===============

## Team Members

1. Michael Jae-Yoon Chung mjyc@uw.edu

## Wifi4bot

### Description

Signal strength measurements from Wifi access points around the building are useful for various robotics tasks such as localization.  Wifi4bot is an interactive visualization application which allows people to control a mobile robot and monitor real time signal strength measurements collected from the robot.

### Data Domain

My data domain is the real-time stream of Wifi data collected from a mobile robot.  Specifically, the Wifi data is collected at 0.1Hz and has following three sub-fields; 1) *timestamps* of measurements in precision of nanoseconds, 2) estimated mobile robot's *2D positions*, e.g. (x,y), in the “map” frame (in meter) 3) lists of *access points data* containing MAC addresses and associating signal strengths (in dBm).

<!--## Running Instructions

Put your running instructions here.  (Tell us how to open your visualization.)

If your visualization is web-based,  it would be great if your submissions can be opened online. [Github Pages](http://pages.github.com/) is a good and easy way to put your visualization online so you can put your link here.  For example:

Access our visualization at http://cse512-14w.github.io/a3-jheer-kanitw/ or download this repository and run `python -m SimpleHTTPServer 9000` and access this from http://localhost:9000/.

(If you put your work online, please also write [one-line description and put a link to your final work](http://note.io/1n3u46s) so people can access it directly from CSE512-14W page.)-->

## Story Board

Initially, I wanted to make an application that can dynamically create scatter plots from the wifi data collected from the application-controlled mobile robot.  Below figure shows a design of the main web interface.

![](https://raw.github.com/CSE512-14W/a3-mjyc/master/storyboard/storyboard_map.png =250x)

The mobile robot, a magenta triangle with a pointy peak indicating its front, can be controlled by giving a “goal”, another magenta triangle with an annotation “goal”.  The goal can be created by double clicking a desired position in the map.

The scatter plot is overlaid on top the map to show locations of detected access points.   The color is used to distinguish access points (e.g., green, orange, blue indicating three access points in figure above) and the size is used to indicate to its signal strength.  To avoid clutterred scatter plot, circles can be displayed around the estimated robot position (as shown in figure below--three circles around the magenta triangle).  In addition transparency can be used to further improve visual clarity.  The created circles stay visible for certain interval (input parameter).  In addition, hovering over one of the circle can make other circles with different colors very transparent as shown below.

![](https://raw.github.com/CSE512-14W/a3-mjyc/master/storyboard/storyboard_zoomed.png =250x) This figure is the zoomed version of the figure above.

### Changes between Storyboard and the Final Implementation

The final implementation changed dramatically from the storyboard.  The goal-based navivation control interface is implemented as described.  However, I did not use the scattor plot but used the bar plot.  I placed the bar plot displaying signal strength measurements (x-axis) and access points (y-axis) on the right side of the map.  The bar plot was updated as the wifi data comes in with transition technique learned in class.


## Development Process

All the work was done by me.  There was three major components; 1) wifi data collection from the mobile robot, 2) realtime sensors data visualization and 3) integration of the robot and the web interface.  Each component took at least 10 hours and the integration part definitely took longer time.

For robotics component, I started from [here](https://github.com/esmaras/bwi).   I extracted part of code I need from the repo integrated into my existing mobile robot navigtion code.  The hardest part was figuring out network setup.

For data visualization component, I started from [here](http://bost.ocks.org/mike/constancy/).  The hardest part was deadling mixing canvas and d3.

For integration component, I started from [here](http://robotwebtools.org/).  The hardest part was dealing with their bleeding edge code.
