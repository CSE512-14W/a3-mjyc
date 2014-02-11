a3-mjyc
===============

## Team Members

1. Michael Jae-Yoon Chung mjyc@uw.edu

## Wifi4bot
![](http://homes.cs.washington.edu/~mjyc/shared/cse512-a3/wifi4bot.png)

### Description

Signal strength measurements from Wifi access points around the building are useful for various robotics tasks such as localization.  Wifi4bot is an interactive visualization application which allows people to control a mobile robot and monitor real time signal strength measurements collected from the robot.

### Data Domain

My data domain is the real-time stream of Wifi data collected from a mobile robot.  Specifically, the Wifi data is collected at 0.1Hz and has following three sub-fields; 1) *timestamps* of measurements in precision of nanoseconds, 2) estimated mobile robot's *2D positions*, e.g. (x,y), in the “map” frame (in meter) 3) lists of *access points data* containing MAC addresses and associating signal strengths (in dBm).

## Running Instructions

You can check recorded result ![here](http://homes.cs.washington.edu/~mjyc/shared/cse512-a3/result.mpg)

You can also see live demo at ![here](http://chester:8000/occupancygrid.html).  However, this will not always be available, you have to contact me to get the robot side programs ready.

## Story Board

Initially, I wanted to make an application that can dynamically create scatter plots from the wifi data collected from the application-controlled mobile robot.  Below figure shows a design of the main web interface.

![](https://raw.github.com/CSE512-14W/a3-mjyc/master/storyboard/storyboard_map.png)

The mobile robot, a magenta triangle with a pointy peak indicating its front, can be controlled by giving a “goal”, another magenta triangle with an annotation “goal”.  The goal can be created by double clicking a desired position in the map.

The scatter plot is overlaid on top the map to show locations of detected access points.   The color is used to distinguish access points (e.g., green, orange, blue indicating three access points in figure above) and the size is used to indicate to its signal strength.  To avoid clutterred scatter plot, circles can be displayed around the estimated robot position (as shown in figure below--three circles around the magenta triangle).  In addition transparency can be used to further improve visual clarity.  The created circles stay visible for certain interval (input parameter).  In addition, hovering over one of the circle can make other circles with different colors very transparent as shown below.

![](https://raw.github.com/CSE512-14W/a3-mjyc/master/storyboard/storyboard_zoomed.png) This figure is the zoomed version of the figure above.

### Changes between Storyboard and the Final Implementation

The final implementation changed dramatically from the storyboard.  The goal-based navivation control interface is implemented as described.  However, I did not use the scattor plot but used the bar plot.  I placed the bar plot displaying signal strength measurements (x-axis) and access points (y-axis) on the right side of the map.  The bar plot was updated as the wifi data comes in with transition technique learned in class.


## Development Process

All the work was done by me.  There was three major components; 1) wifi data collection from the mobile robot, 2) real time sensors data visualization and 3) integration of the robot and the web interface.  Each component took at least 8 hours and the integration part definitely took longer time--this excludes storyboard and write up time.

For the wifi data collection, I started from [here](https://github.com/esmaras/bwi).  I extracted part of code I needed and integrated them to my existing mobile robot navigation [code](https://github.com/mjyc/deliverbot-catkin-giyeok).  The hardest part was setting up access point scanning program.  For the data visualization, I started from [here](http://bost.ocks.org/mike/constancy/).  The hardest part was adopting the given code to my purpose.  For the integration, I started from [here](http://robotwebtools.org/).  The hardest part was dealing with their bleeding edge-ness code.  Also, this code is based on canvas where D3 uses svg, I spent good amount of time trying to use them both and moved on.  This is the main reason why I could not do scatter plot for this project.
