
# ReUtilyze #

_______________________________________________________________________________________________________________________________________________  

## What is ReUtilyze? ##
Recycling is vital as it reduces the need to harvest new raw materials, prevents pollution, saves energy & money, reduces the amount of waste that ends up in the landfills and also allows products to be re-utilized at their maximum capacity.

## Contents 

01. [Short Description](#Short-Description)
02. [Demo Video](#Demo-Video)
03. [How it works](#How-it-works)
04. [Long Description](#Long-Description)
05. [Solution Architecture](#Solution-Architecture)
06. [Tech Stack Details](#Tech-Stack-Details)
07. [Project Roadmap](#Project-Roadmap)
08. [Getting Started](#Getting-Started)
09. [IBM Cloud Services](#IBM-Cloud-Services)
10. [Authors](#Authors)
 

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
 
 India alone generates about 3 million tons (MT) of e-waste annually and ranks third among e-waste producing countries, after China and the United States. Reports state that it might rise to 5 million tons by 2021.

With COVID-19 keeping people indoors and on devices, the usage of electronics is only getting higher.

The way forward for consumers could be the 4 R method of reuse, repair, recycle, and research.

India is the only country in Southern Asia with e-waste legislation, with laws to manage e-waste in place since 2011, mandating that only authorized dismantlers and recyclers collect e-waste. There are now 312 authorized recyclers in the country.

(reference - Electronic waste: the need to reuse, repair, recycle and safely dispose (mongabay.com))

ReUtilyze will help minimize the impact of electronic waste on the environment during the life span of the product and also when it becomes obsolete.

![picture alt](https://cfcimages.blob.core.windows.net/cfcimages/Recyle.png)
- Source : [Website](https://www.ewaste1.com/how-does-recycling-electronics-help-the-environment/) 

![picture alt](https://cfcimages.blob.core.windows.net/cfcimages/globalewasteflow.png)
- Source : [Document](http://www3.weforum.org/docs/WEF_A_New_Circular_Vision_for_Electronics.pdf)

## Solution Architecture <a name="Solution-Architecture"></a>
![picture alt](https://cfcimages.blob.core.windows.net/cfcimages/Solution_Architecture.png)
## Project Roadmap <a name="Project-Roadmap"></a>
![picture alt](https://cfcimages.blob.core.windows.net/cfcimages/roadmap.png)

## Tech Stack Details <a name="Tech-Stack-Details"></a>

1. .Net core 5.0  : It is used for developing WEB API which will get consume inside the web applications which is developed for customer, back office users and vendors.

2. Angular 11 : It is used for developing single page application.

3. Mongo DB : ReUtilyze uses the Mongo DB  (no-SQL database) for storing the user and request related information.

4. Azure Cloud Services : We have deployed the web API applications using the azure cloud services.

5. git - For managing the source code and working multiple developers efficiently at same time. 

## Getting Started <a name="Getting-Started"></a>

#### Prerequisite
* Install VS 2019    - Required to run Wep API Project [Download Link](https://visualstudio.microsoft.com/downloads/)  
* Install node.js    - Required for Angular [Download Link](https://nodejs.org/en/)
* Visual Studio Code - Required to run single page applicatioms. [Download Link](https://visualstudio.microsoft.com/downloads/)
* Register for an IBM Cloud account. [Website](https://www.ibm.com/account/us-en/)

#### Run it
* Download the Github code for single page application and Web API Project.
* Install node.js
* Install Angular CLI at global using  <code>npm install -g @angular/cli</code>
* Install .net SDK 5.0

 
* Running the web application :
    01. To run the single page application on a local machine:<br />

     Open application folder path 
        Follow below steps :
        1. Go to the application source code path and open WEBUI or BOUI folder in Visual Studio Code:
        2. Open terminal in visual Studio code and install dependacies using below command : 
         <code>npm install</code>
        3. Once the dependancies are get installed, run the application using below command :
        <code>ng serve --o --ssl true</code>
        
   02. To run the microservice Wep API application using visual studio  
       1.Go to the application source code path (CFCAPI) and open solution file RecyclingForRewards.sln in Visual Studio.   
       2.Go to the Debug menu and click on start debugging to run the application.


## IBM Cloud Services <a name="IBM-Cloud-Services"></a>
  
 

 

## Authors <a name="Authors"></a>
1. Amiya Padhi
2. Vitthal Shinde
3. Uma Shanker Pandey
4. Arjun Rajan
5. Manish Prasad
6. Akash Chavan
7. Annie Vaidya
8. Rohit Nair
9. Siddhesh Bhojane

 

 
