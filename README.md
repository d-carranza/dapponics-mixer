# Dapponics Mixer Web App

#### Video Demo: https://www.youtube.com/watch?v=l-LonpDWJ5g

#### Description: A Web Application that mixes NFT traits and generates full Collection's Tokens & Metadata

### **Introduction:**

With the popularization of NFTs, there is an increasing demand among the crypto users and enthusiast of creating their own NFT colection. There is a constant need to put together an entire collection so can be sold after to interested buyers.
One of the most commons types of NFT collections are the trait collections.
A NFT trait collection consists in a serie of tokens that has a set of traits, these traits are randomly selected inside certain parameters and this is what makes every token a unique 1/1 collectible.

There are 5 steps to create a NFT trait collection:

1. An artist draws or designs every trait for every part separatelly in a transparent .png layer. For example a hair type can be blonde, brown or black traits, while an eyes type can be blue, green, sunglasses etc...
2. Once every trait is designed, the creator must decide what is the rarity for every trait, a lower percentage of a given trait means it will appear less in the collection and as it will be more rare it will potentially have more collector value.
3. Then the traits pass through an algorithm that creates n tokens png, being n the total supply, merging the layers for each randomly selected trait following the rarity percentages.
4. At the same time the tokens are created, the metadata (a .json file with all the part-trait pairs a given token has) is also stored next to the token .png
5. When the collection images and their respective metadata is set, this data is written inside a smart-contract and this contract is then deployed in the blockchain.
6. Finally, interacting with this smartcontract (usually in a mint website), users can mint and create their own unique NFT to flex it in their wallet or benefit from its utility.

In this project I cover the step 2, 3 and 4. Dapponics Mixer is going to be a web application where any user can register and create their own collection.

The input this app take is (1) the traits of the collection sorted by type and layer order, (2) the rarity of every trait, and (3) the supply of the collection.

Then this app processes the request and using an algorithm, traits are randomly mixed to create all the tokens of the collection.

The output of this app is a zip folder containing the json file with the entire collection's metadata and a folder called "images" containing all the png files for every token.
The inputs are be saved in the database, so the user can come back any time to modify the parameters and mix the collection again, or download the collection files needed in the step 5.

To do that I used Python and Django in the backend to manage the database and JavaScript and React in the frontend to develop the webapp as a Single Page Application.

### Disctinctiveness and Complexity:

I created a fully functional and useful responsive web application in which users can store their NFT-art trait layers in a session after register and log in, and they can generate a fully fledged collection as many times as they want downloading the final images and the metadata for every token of the collection in a zip file.

For this project, aside of Javascript, Python and Django I had to learn React and how to manage components, render dynamic states and use effects. I had to master calling asynchronously to the backend sending or requesting data. And additionally I had to learn how to create the mixing and fetched api's algorithms, how to merge image files and how to buffer files and manage the client local storage as well as download files in the browser.
Lastly I polished the user experience filtering the user input and providing feedback to guide the user towards a correct use of this application.

### What's contained in each file you created:

As per the usual Django file structure we can find a project called mixer and an app called app. In this last app folder there are aditional files external to Django due to the React integration in this project. "webpack.config.js", "babel.config.json", "static/app/main.js", and "src/index.js" are the necessary files to make react work.

In "src/components" you can find all the components I created. And in "static/app/utils.js" the functions that contain most of the logic I used in the Buttons component.

In "templates/app" you can find a layout and the 3 other html views: One for register, other for login and the last one called mixer, where React takes over the div with id="app".

In "package.json" and "package-lock.json" you can find all the libraries and dependencies included in this project.

I used 5 external libraries:

- "react-dropzone" and "styled-components" for creating the dropzone component and conditionally style it.

- "merge-images" to merge pngs together avoiding the use of Canvas making the code and the process cleaner and more efficient.

- "jszip" and "file-saver" to create and structure the file's tree in the local storage buffer followed by a zip download and a methodical free of the used memory.

All the styles for this webapp are contained in "static/app/css".

### How to run my application:

Note that .gitignore ignores the node_modules as this directory is very heavy, so first of all, in the terminal, in the ../dapponics-mixer/mixer/app directory, the command "npm install" will download all the node_modules needed to run the app.

After that, a simple "python manage.py runserver" in the terminal in the ../dapponics-mixer/mixer directory will give life to the server and accessing from any browser to the local URL will render the webapp.

## **Development process**

### **Notes v1.0**

Once I initialized the Django project, the app, the initial model and the superuser
-I need to create the HTML templates including a layout.
-Is crucial to choose the right selection for the database models.
-I need to figure out how to merge the trait's pngs.
-I need to learn proper png management with javascript assuming only URLs from these pngs will be requested as post and stored in the backend's database.
-I need to rewatch the React class to make sure I use the framework properly.
-Also I need to figure out how Cloudinary work, a web image host, potential candidate for this app.

### **Notes v2.0**

Receiving user's input (User clicks save, database updates. When user logs in, the data is prepopulated in the fields )
To polish the performance of this app im considering to store only the seed in the database and not the result after mixing.

The user will input the traits for each part, sorted by layer and with its rarity. This could be represented by a matrix of elements being the parts columns and the traits for each part the rows. User will be able to expand this matrix to add a new part as well as adding new traits for a part. In every cell of this table user should input the image for a given trait, its name and its rarity.

This way the database will have a table containing all the traits for eash user. User class will also have a new model called input that will be a json with all the input data in order.

Providing user an output, data from the database is runned through the mixing algorithm n times (supply) and when algorithm is completed user downloads a zip named "<user>'s_Collection" that contains two folders, images with all the pngs and metadata with all the json.

### **Notes v3.0**

HTML templates created, login logout register views added

### **Notes v4.0**

Database models created.
V1 for testing will consist in a table to input 4 traits.
Following steps:

1. make a working form to transfer the user input to the backend
2. store the data sucessfully in the database
   For this I have to learn proper img file management and how to fetch with react
   TODO: Constrain user input to avoid bugs and provide feedback

### **Notes v5.0**

I decided to start with the frontend first.
Need to revamp all the structure of this project to include React and allow React to take control of the things happening in the DOM.
In order to do that I installed npm modules and configured React.
In the lecture we saw react embedded inside the HTML file, but to be more tidy this time I will be using react in independent javascript files.
App.js in components will contain all the react code for the frontend. Now my goal is to make a great user friendly interface where user can input the different parts of the collection and every trait in each part.

### **Notes v6.0**

TODO: Develop the frontend with the divs add/remove features and the buttons for save the data in the database and to mix the saved traits.
Initially without the pictures.

### **Notes v7.0**

Ok, React is going to take longer time than expected to learn and apply but is extremely useful so it will be worthit to take the time. For now I'm watching a React crash course and reading React's documentation.

### **Notes v8.0**

This project is complex, but I'm going to beak it down to smaller steps and advance little by little.

1 - Make frontend with React.js and Chakra UI
2 - Fetch data to backend
3 - DB management each session's collection
4 - Prepopulate frontend with data if any
5 - Mixer algorithm buffer files .png .json in folders and zip them
6 - Download from local storage

To run the server I need to use "python manage.py runserver" and to compile the react app I need to use "npm run dev" in the app folder.

### **Notes v9.0**

I allow myself to take longer time learning react as I consider it will be useful in my future
Progress: Added Trait, Type, Input and Output components layout.

### **Notes v10.0**

After two weeks...
-The UI has the desired styles.
-The components were fleshed out several times until every button and input rendered the desired html and updated the state as expected.

-I fixed the bugs that made the inputs to lose focus with every keystroke.
-I improved the components spliting them in different files, exporting and importing them in different components / main App.

### **Notes v11.0**

Save changes button successfully fetches the json version of the state to the backend, and now I can start managing the data from the frontend's input in the backend.
The idea is replace the previous traits (if any) in the database with the new ones.

### **Notes v12.0**

Save button now saves all the traits'values in the database except the supply.
TODO: Prepopulate the state with the stored data from the data base.

### **Notes v13.0**

I fixed a bug in the view initialstate loops and now the outputed object is iterable in the maps
Added a null input filter in the save button function to avoid bugs when sending empty data to the database, now if the user leave empty fields an alert will prompt notifying the user that some fields are empty.

Added a rarity filter in the save button that checks if all the rarity values for the same trait type add up to 100. If not the user is notified with an alert.

Today, the app successfully populetes its fiels with the saved data from the database as wel as smoothly sends the data to the database when saved. Many bugs were encountered and fixed.

The challenge I encountered when trying to code the populate field's formulas is that fetching to the backend is asynchronous but in react I can't asynchronously render the page, so instead I made a default state as initial state and after fetching, the state is updated with setState.

### **Notes v13.5**

The first part was the react.js frontend and he django.py backend talking to each other and managing how to display and store the information. Also how to manage the text inputs.

The second part is the integration of image files into the data.

And the last part of the project will be the output algorythm with the final traits and the metadata in files.

Now is time to focus in the second part of this project and decide how to manage the png images. I think I have a couple of options...
I would ng bloab to the back end as my table in the database just stores URL adresses.
My first option is, each time user inputs a png I store it somewhere in the cloud and I receive the URL. That URL is send after to the back end when the save button is clicked.
Then what is displayed in the front end is the URL from the uploaded picture.

### **Notes v14**

I improved the code creating a loading state that is replaced by the rendered state using useEffect.
I also fixed a backend bug where the img values were duplicated and a frontend bug where rarity showed error while having several types.

### **Notes v15**

TODO: Create a working Dropzone, upload to cloudinary when a png is dropped, receive a URL, set the URL as the value of Image

I need to read the documentation of react-dropzone in https://react-dropzone.js.org/

### **Notes v16**

(Upgraded the favicon and the title.)

_Dropzone is working as intended now_ accepting only pngs and the max files possible is 1, everything else is rejected. When a png file is dropped then its converted to base 64 and that URL is included in the state as img input.

I decided to not use cloudinary calls for this project because the right way to do it is from the backend and, if the png data is in the back enf I prefer to just store it in my database. I realised base64 strings are not too heavy and this way the app is going to be more efficient and faster.

I also included a conditional render to show the preview of the pngs one droped and also show the user's pngs that are stored in the database when the state is loaded.

Now is the time to start the output algorythm with the final traits and the metadata stored in files in the local storage and download them.

### **Notes v17**

The button create collection, after filtering the right Supply input now is able to create the json with all the metadata in regard to the token's traits and values. I used a function to randomly select the values following the given input rarity values.

Additionally, now I implemented the logic to create the arrays that contain the png layers for each token. The next step is to combine all the png layers in one png and save it in tokenArray.

To finally put every element in tokenArray inside a folder, and right after download the folder, together with the metadata.json.

### **Notes v18**

For merging images I will need to learn to use Canvas. Before installing this module, I cleaned my package.json dependencies leaving only the 2 I use for the dropzone: react-dropzone and styled-components.

The layout of the code is more tidy now, I worked on adding sintactic sugar in the functions inside the buttons component and also I created utils.js where im going to define the functions needed for the "create collection" button.
So far I already defined createMetadata, createLayeredTokens and now I'm working on mergeLayeredTokens, where I need to use Canvas.

Installed merge-images, node-canvas and path dependencies.

Bug fixed for the remove buttons now modifying the state arrays using splice instead of pop, removing the target elements and not the last elements of the array.

### **Notes v19**

Ok, progress. I know how to merge the pngs. I need to input the array with the base64urldata into the mergeImages() function.

Now, before advancing more on that area I need to think if the metadata structure is the optimal. Maybe I improve the structure of the metadata from
[{"token_id":1,"attributes":{"Left":"Green","Right":"Blue"}},{"token_id":2,"attributes":{"Left":"Green","Right":"Yellow"}}]

to

[{"token_id":1,"attributes":[
{"trait_type":"Left","value":"Green"},
{"trait_type":"Right","value":"Blue"}
]},
{"token_id":2,"attributes":[
{"trait_type":"Left","value":"Green"},
{"trait_type":"Right","value":"Yellow"}
]}
]

Also, very important to consider for the final version of the app, if I'm going to implement a way to avoid duplicates in the collection. But this pottencially could create infinite loops if the supply number is higher than the maximun number of combinations.

In the worst case, if the user wants to abuse and make infinite loops, this look is creater in their frontend. But regardless, I would like to have a way to prevent infinite loops.

Lastly, I'm considering to simplify a couple of formulas merging them together, such as createLayeredTokens() + mergeLayeredTokens()

### **Notes v20**

[x] Metadata structure Updated. TODO: Avoid duplicates in the metadata algorythm

[x] Cleaned the formulas.

[x] Now the merged tokens are gatthered in an array containing every token's .png image.

### **Notes v21**

I used JSZip and FileSaver libraries for structuring my zipfile and download the output of the app, it took a long time to get to know these libraries after I learned and tried to download in the traditional way creating new bloabs and clicking the link in the invisible anchor tag. And freeing from memory the URL and the anchortag after. I like these libraries so much as they are simple and highly efficient.

### **Notes v22**

Zip download sintaxis fleshed out.

Clean the dataURLtoFile function, note that atob is only deprecated in node but works fine in the DOM.

Note that the metadata is a unique json file containing the metadata of all the tokens while the images folder contains a png file for each token. For further usage, the specific metadata of each token can be obtained from the metadata.json file by searching token_id number.

### **Notes v23**

Idea of improvement 1: Avoid duplicates in the collection while creating the metadata, every time a new token created already existed is created again.

Idea of improvement 2: If duplicates are avoided I need to prevent infinity loops if the supply is larger than the collection's possible combinations.

### **Notes v24**

The app now succesfully avoids duplicates (meaning no tokens have the same trait values combinations).

Now I need to cap the max supply, how? If the user sets all the traits with the same name value we can start a infinite loop again.

_Rules to avoid infinite loops:_
[x] 1 - New input filter:
Every trait in a same type must be a different string

[x] 2 - Set max supply permited:
max supply = a + b + c... (being the trait number for each type)

Note: Even after filtering input, there is a chance that if the user clicks CreateColleciton button before SaveChanges after the user inputed same values for many traits and the Suply is close to the maxSupply, an infinite loop may happen. To avoid this I encourage users to always click SaveChanges and not missuse the app.

TODO: Create a condition for the CreateCollection that requires to save changes first?

### **Notes v25**

I added a function areChangesSaved() that fetches the stored state from the database and then compares the stored state with the current state. It return frue or false.
If false, it requires to save the changes before creating the collection. If true, user can download the collection.
Now I avoided infinite loops.

BUG: Right after save, if no reresh page gives same error after calling areChangesSaved, find out why and fix it

### **Notes v26**

Bug fixes.

Now areChangesSaved work as intended

Added a supply input filter to avoid user inputing decimals.

Require user to modify default initial state before being able to create a collection.

Empty Type, Empty Trait edgecases are handled by the rarities filter so doesn't create a trouble.

### **Notes v27**

Found a serious backend bug. The traits fetched are not only the user's traits, but all the traits from all the users. _FIXED._

Found a bug in the last testing, metadata creates correctly, but the images bugged. Image created does not correspond with metadata. _FIXED._

### **Notes v28**

Testing2 was successful, I inputed the traits successfully and downloaded a collection of 10,000 unique images.

No bugs noticed, app works smoothly.
