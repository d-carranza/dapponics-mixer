# Dapponics Mixer Web App

#### Video Demo:

#### Description: A web application that create NFT collections

Must include:

### Disctinctiveness and Complexity:

### What's contained in each file you created:

### How to run my application:

### Any other additional information the staff should know about your project:

## If I've added any Python packages that need to be installed in order to run your web application, be sure to add them to a "requirements.txt" file!

## +500 words

### **Introduction:**

With the popularization of NFTs, there is an increasing demand among the crypto users and enthusiast of creating their own NFT colection. There is a constant need to put together an entire collection so can be sold after to interested buyers.
One of the most commons types of NFT collections are the trait collections.
A NFT trait collection consists in a serie of tokens that has a set of traits, these traits are randomly selected inside certain parameters and this is what makes every token a unique 1/1 collectible.

There are 5 steps to create a NFT trait collection:

1. An artist draws or designs every trait for every part separatelly in a transparent .png layer. For example a hair part can be blonde, brown or black traits, while an eyes part can be blue, green, sunglasses etc...
2. Once every trait is designed, the creator must decide what is the rarity for every trait, a lower percentage of a given trait means it will appear less in the collection and as it will be more rare it will potentially have more collector value.
3. Then the traits pass through an algorithm that creates n tokens png, being n the total supply, merging the layers for each randomly selected trait following the rarity percentages.
4. At the same tame the tokens are created, the metadata (a .json file with all the part-trait pairs a given token has) is also stored next to the token .png
5. When the collection images and their respective metadata is set, this data is written inside a smart-contract and this contract is then deployed in the blockchain.
6. Finally, interacting with this smartcontract (usually in a mint website), users can mint and create their own unique NFT to flex it in their wallet or benefit from its utility.

In this project I will cover the step 2, 3 and 4. Dapponics NFT Mixer is going to be a web application where any user can register and create their own collection.

The input this app will take is (1) the traits of the collection sorted by parts and layer order, (2) the rarity of every trait, and (3) the supply of the collection.

Then this app will process the request and using an algorithm, traits will be randomly mixed to create all the tokens of the collection.

The output of this app will be a folder containing all the png and json files for every token. The inputs and the results will be saved in the database, so the user can come back any time to modify the parameters and mix the collection again, or download the collection files needed in the step 5.

To do that I will use Python and Django in the backend to manage the database and I will use JavaScript and React in the frontend to develop the webapp, initially I have in mind to make a Single Page Application.

**Developing Process Notes**

**Notes 1.0**

Once I initialized the Django project, the app, the initial model and the superuser
-I need to create the HTML templates including a layout.
-Is crucial to choose the right selection for the database models.
-I need to figure out how to merge the trait's pngs.
-I need to learn proper png management with javascript assuming only URLs from these pngs will be requested as post and stored in the backend's database.
-I need to rewatch the React class to make sure I use the framework properly.
-Also I need to figure out how Cloudinary work, a web image host, potential candidate for this app.

**Notes 2.0**

Receiving user's input (User clicks save, database updates. When user logs in, the data is prepopulated in the fields )
To polish the performance of this app im considering to store only the seed in the database and not the result after mixing.

The user will input the traits for each part, sorted by layer and with its rarity. This could be represented by a matrix of elements being the parts columns and the traits for each part the rows. User will be able to expand this matrix to add a new part as well as adding new traits for a part. In every cell of this table user should input the image for a given trait, its name and its rarity.

This way the database will have a table containing all the traits for eash user. User class will also have a new model called input that will be a json with all the input data in order.

Providing user an output, data from the database is runned through the mixing algorithm n times (supply) and when algorithm is completed user downloads a zip named "<user>'s_Collection" that contains two folders, images with all the pngs and metadata with all the json.

**Notes 3.0**

HTML templates created, login logout register views added

**Notes 4.0**

Database models created.
V1 for testing will consist in a table to input 4 traits.
Following steps:

1. make a working form to transfer the user input to the backend
2. store the data sucessfully in the database
   For this I have to learn proper img file management and how to fetch with react
   TODO: Constrain user input to avoid bugs and provide feedback

**Notes 5.0**
I decided to start with the frontend first.
Need to revamp all the structure of this project to include React and allow React to take control of the things happening in the DOM.
In order to do that I installed npm modules and configured React.
In the lecture we saw react embedded inside the HTML file, but to be more tidy this time I will be using react in independent javascript files.
App.js in components will contain all the react code for the frontend. Now my goal is to make a great user friendly interface where user can input the different parts of the collection and every trait in each part.

**Notes 6.0**
TODO: Develop the frontend with the divs add/remove features and the buttons for save the data in the database and to mix the saved traits.
Initially without the pictures.

**Notes 7.0**
Ok, React is going to take longer time than expected to learn and apply but is extremely useful so it will be worthit to take the time. For now I'm watching a React crash course and reading React's documentation.

**Notes 8.0**
This project is complex, but I'm going to beak it down to smaller steps and advance little by little.

1 - Make frontend with React.js and Chakra UI
2 - Fetch data to backend
3 - DB management each session's collection
4 - Prepopulate frontend with data if any
5 - Mixer algorithm buffer files .png .json in folders and zip them
6 - Download from local storage

To run the server I need to use "python manage.py runserver" and to compile the react app I need to use "npm run dev" in the app folder.

**Notes 9.0**
I allow myself to take longer time learning react as I consider it will be useful in my future
Progress: Added Trait, Type, Input and Output components layout.

**Notes 10.0**
After two weeks...
-The UI has the desired styles.
-The components were fleshed out several times until every button and input rendered the desired html and updated the state as expected.

-I fixed the bugs that made the inputs to lose focus with every keystroke.
-I improved the components spliting them in different files, exporting and importing them in different components / main App.

**Notes 11.0**
Save changes button successfully fetches the json version of the state to the backend, and now I can start managing the data from the frontend's input in the backend.
The idea is replace the previous traits (if any) in the database with the new ones.

**Notes 12.0**
Save button now saves all the traits'values in the database except the supply.
TODO: Prepopulate the state with the stored data from the data base.

**Notes 13.0**
I fixed a bug in the view initialstate loops and now the outputed object is iterable in the maps
Added a null input filter in the save button function to avoid bugs when sending empty data to the database, now if the user leave empty fields an alert will prompt notifying the user that some fields are empty.

Added a rarity filter in the save button that checks if all the rarity values for the same trait type add up to 100. If not the user is notified with an alert.

Today, the app successfully populetes its fiels with the saved data from the database as wel as smoothly sends the data to the database when saved. Many bugs were encountered and fixed.

The challenge I encountered when trying to code the populate field's formulas is that fetching to the backend is asynchronous but in react I can't asynchronously render the page, so instead I made a default state as initial state and after fetching, the state is updated with setState.

**Notes 13.5**
The first part was the react.js frontend and he django.py backend talking to each other and managing how to display and store the information. Also how to manage the text inputs.

The second part is the integration of image files into the data.

And the last part of the project will be the output algorythm with the final traits and the metadata in files.

Now is time to focus in the second part of this project and decide how to manage the png images. I think I have a couple of options...
I would ng bloab to the back end as my table in the database just stores URL adresses.
My first option is, each time user inputs a png I store it somewhere in the cloud and I receive the URL. That URL is send after to the back end when the save button is clicked.
Then what is displayed in the front end is the URL from the uploaded picture.
