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
1. An artist draw or design every trait for every part separatelly in a transparent .png layer. For example a hair part can be blonde, brown or black traits, while an eyes part can be blue, green, sunglasses etc...
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
-Is crucial to choose the righ selection for the database models.
-I need to figure out how to merge the trait's pngs.
-I need to learn proper png management with javascript assuming only URLs from these pngs will be requested as post and stored in the backend's database.
-I need to rewatch the React class to make sure I use the framework properly.
-Also I need to figure out how Cloudinary work, a web image host, potential candidate for this app.