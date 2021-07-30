
# ReUtilyze #

This is your README. READMEs are where you can communicate what your project is and how to use it.
*Website: http://www.ReUtilyze.com*  
*Linkedin: https://www.linkedin.com/company/ReUtilyze*  
*Instagram: [@ReUtilyze.tech](https://www.instagram.com/ReUtilyze.tech/)*  
*Contact: ReUtilyze.tech@outlook.com*    
_______________________________________________________________________________________________________________________________________________  

Write your name on line 6, save it, and then head back to GitHub Desktop.
## What is ReUtilyze? ##
Recycling is vital as it reduces the need to harvest new raw materials, prevents pollution, saves energy & money, reduces the amount of waste that ends up in the landfills and also allows products to be re-utilized at their maximum capacity.

## Contents 

01. [Short Description](#Short-Description)
02. [Demo Video](#Demo-Video)
03. [How it works](#How-it-works)
04. [Long Description](#Long-Description)
05. [Innovation/Competition](#Innovation)
06. [Project Roadmap](#Project-Roadmap)
07. [Getting Started](#Getting-Started)
08. [IBM Cloud Services](#IBM-Cloud-Services)
09. [Deployment/Pilot](#Pilot)
10. [Authors](#Authors)
11. [License](#License)

## Short Description <a name="Short-Description"></a>

### What's the problem?
What happens to computers, mobile phones and other devices when they are damaged / replaced after a long period of time? They are either exchanged for a new device or thrown away to be discarded with other waste and end up incinerated or in landfill. The most likely outcome - old phones go into drawers and cupboards to be forgotten forever. In a certain way this is good because obsolete devices are not being thrown away and adding to the e-waste landfill. In another way it is bad. Hibernating phones represent an unused resource that if used properly could realize significant value and reduce the demand for new raw materials.

Most of the websites we see today, allows exchange only of products which are in working condition or provides very low value for exchanging damaged devices which discourages customers from going for exchange option. This leads to more and more devices being thrown away into trash adding to the e-waste landfill.

How ReUtilyze will help
Provides a platform to dispose and reduce e-waste

Increase resource efficiency

Reduces cost of raw materials for manufacturers

Supports circular economy

Recycling is vital as it reduces the need to harvest new raw materials, prevents pollution, saves energy & money, reduces the amount of waste that ends up in the landfills and also allows products to be re-utilized at their maximum capacity.

ReUtilyze will allow user to evaluate their old or waste electronic equipments, earn reward points for submitting their electronic equipments for recycling and also use the earned reward points for buying new electronic equipments.

ReUtilyze is built using .net Core 5, nosql DB (Mongo DB), Angular 11, Bootstrap 5, AWS Cloud Platform,  Azure Cloud Platform, IBM Cloud Platform, Visual Studio 2019 Community Version, GIT, Swagger.

## Long Description <a name="Long-Description"></a>
[Long Description Document Link](https://github.com/ReUtilyze/ReUtilyze/blob/main/ReUtilyze.docx)
 
 India alone generates about 3 million tons (MT) of e-waste annually and ranks third among e-waste producing countries, after China and the United States. Reports state that it might rise to 5 million tons by 2021.

With COVID-19 keeping people indoors and on devices, the usage of electronics is only getting higher.

The way forward for consumers could be the 4 R method of reuse, repair, recycle, and research.

India is the only country in Southern Asia with e-waste legislation, with laws to manage e-waste in place since 2011, mandating that only authorized dismantlers and recyclers collect e-waste. There are now 312 authorized recyclers in the country.

(reference - Electronic waste: the need to reuse, repair, recycle and safely dispose (mongabay.com))

ReUtilyze will help minimize the impact of electronic waste on the environment during the life span of the product and also when it becomes obsolete.

## Project Roadmap <a name="Project-Roadmap"></a>
![picture alt](https://cfcimages.blob.core.windows.net/reutilyze/roadmap.png)
* For the 1st Phase, we focused on given farmers tools and knowledge to fight against changes in the weather.
  We are testing with some of the Mongolian farmers to identify user interface opportunities.
* The 2nd phase is planned to focus on the interactions between farmers so they can increase their relationship. This will enable them to know what others are planting and explore their options. We are also planning to integrate some tools so the farmers can leverage their know-how, such as the expert advice feature will allow farmers to get in touch with specialists and trends in the agriculture sector.
We plan in this phase to deploy  APP testing in Brasil - Parana. We already have done some contacts with local authorities. 
* Our 3rd goal is to connect small farmers with banks and customers, by implementing QR code for food traceability and farming credit score algorithms. We also plan to expand the risk mgm for deceases and market risks.

## Getting Started <a name="Getting-Started"></a>

#### Prerequisite
* Register for an [IBM Cloud account](https://www.ibm.com/account/reg/us-en/signup?formid=urx-42793&eventid=cfc-2020).
* Request a [Weather Company API key](https://callforcode.weather.com/)
* Dowload Forecast from [NASA webiste](https://power.larc.nasa.gov/data-access-viewer/) or use github library:
``` nasapower ```
* Read and select any forecast regression from the article provided.

#### Run it
* Download the Github code
* Install node.js
* Install Ionic and Cordova
* This app makes use of 18 plugins all of which are needed to be installed in order to compile the app or run on localhost
     1. Photo Viewer Plugin <br /> (https://ionicframework.com/docs/native/photo-viewer)
     2. Android Permission Management Plugin <br /> (https://ionicframework.com/docs/native/android-permissions)
     3. AndroidX Plugin <br /> (https://ionicframework.com/docs/native/firebase-x)
     4. AndroidX Adapter Plugin <br /> (Should automatically install when you install firebase plugin)
     5. Camera Plugin <br /> (https://ionicframework.com/docs/native/camera)
     6. Device Plugin <br /> (https://ionicframework.com/docs/native/device)
     7. Firebase Cloud Messaging Plugin <br /> (https://ionicframework.com/docs/native/fcm)
     8. File Plugin <br /> (https://ionicframework.com/docs/native/file)
     9. File Manager Plugin <br /> (https://ionicframework.com/docs/native/file-transfer)
    10. Full Screen Plugin <br /> (https://ionicframework.com/docs/native/android-full-screen) <br />
            * Available only on Android for devices with notch/ not supported on iOS
    11. Keyboard Plugin <br /> (https://ionicframework.com/docs/native/keyboard)
    12. Webview Plugin <br /> (https://ionicframework.com/docs/native/ionic-webview)
    13. Screen Orientation Plugin <br /> (https://ionicframework.com/docs/native/screen-orientation)
    14. Splash Screen Plugin <br /> (https://ionicframework.com/docs/native/splash-screen)
    15. Statusbar Plugin <br /> (https://ionicframework.com/docs/native/status-bar)
    16. Vibration Plugin <br /> (https://ionicframework.com/docs/native/vibration)
    17. Sql Lite Storage Plugin <br /> (https://ionicframework.com/docs/angular/storage)
    18. Google Services Plugin <br /> (Will be automatically installed when installing Firebase)

* Once the plugins are installed the platforms are needed to be added:
    01. In order to add the Android Platform run the following command:<br />
        <code>ionic cordova platform add android</code>
    02. In order to add the iOS Platform run the following command:<br />
        <code>ionic cordova platform add ios</code>

* Running the app:
    01. To run the app on a local node server:<br />
        <code>ionic serve</code>
    02. To run the app on an Android device:<br />
        <code>ionic cordova run android --device</code>
    03. To run the app on Android emulator:<br />
        <code>ionic cordova run android</code>

* Building packages:
    01. To build an Android package:<br />
        <code>ionic cordova build android</code>

## IBM Cloud Services <a name="IBM-Cloud-Services"></a>
* [IBM Cloud Object Storage](https://www.ibm.com/cloud/object-storage)
* [IBM Watson Studio](https://www.ibm.com/cloud/watson-studio)
* [IBM Watson Assistant](https://www.ibm.com/cloud/watson-assistant/) 
* [The Weather Company API](https://callforcode.weather.com/)   
Check out ReUtilyze's website  repository database [click here](https://github.com/helentsai17/ReUtilyze) 

## Deployment/Pilot <a name="Pilot"></a>
In order to create the APP, we did previous research with the farmers to identify their main concerns and needs. The mains focus areas that we found were the lack of access to rainfall and bank loans.
We then started testing the APP features with a selected 15 farmers in the Mongolian householder farmers to identify any gaps in the user interface and improvements need in the APP.
* Start Date: 01/June/2020
* Region: Mongolia (Dornord Province)
* Currently real users :[15 users]( https://github.com/ajinkyadatalkar1/ReUtilyze/blob/master/Pilot%20Mongolia%20Users.png)
* Currently Situation: OnGoing. Collecting data.

Check the firsts feedbacks from the field test done to the APP's user interface: 
* [Feedback Director of the Alt Margad- Khentii province](https://www.youtube.com/watch?v=_mRERF0wa1Y).
* [Feedback family farmer Sukhbaatar province](https://www.youtube.com/watch?v=SHfCFlWM-5c).

## Authors <a name="Authors"></a>
* Ajinkya Datalkar - Product & Sotware Developer, System Design [*See Linkedin*](https://www.linkedin.com/in/ajinkya-datalkar/)
* Manoela Morais - Data Intelligence (R program) & Project Management [*See Linkedin*](https://www.linkedin.com/in/manoelamorais/)
* Helen Tsai - Web Developer [*See Linkedin*](https://www.linkedin.com/in/helen-tsai-teyi/)
* Chimka Munkhbayar - Mongolian Deployment [*See Linkedin*](https://www.linkedin.com/in/chimka-munkhbayar-0ab421b5/)

## License <a name="License"></a>
This project is licensed under the Apache 2 License - see the [ LICENSE ](https://github.com/ajinkyadatalkar1/ReUtilyze/blob/master/LICENSE) 
for details.
