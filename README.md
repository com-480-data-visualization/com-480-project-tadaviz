# Project of Data Visualization (COM-480)

| Student's name | SCIPER |
| -------------- | ------ |
| Guilhem Sicard | 263834 |
| Robin Szymczak | 258589 |
| Kenyu Kobayashi| 314181 |
| | |

[Milestone 1](#milestone-1-friday-3rd-april-5pm) • [Milestone 2](#milestone-2-friday-1st-may-5pm) • [Milestone 3](#milestone-3-thursday-28th-may-5pm)

## Milestone 1 (Friday 3rd April, 5pm)

### 2.1 Dataset
  
The dataset is called “The Big Five Personality Test”. 

Source : https://www.kaggle.com/tunguz/big-five-personality-test#codebook.txt

It is a dataset containing over a million of answers to a personality test, from people all around the globe. It is taken from Kaggle, and has a usability score of 9.7.

For each users, there are 5 essential variables that are being measured :

1. **EXT** - *Extroversion*
2. **AGR** - *Agreeableness*
3. **CSN** - *Conscientiousness*
4. **EST** - *Neuroticism*
5. **OPN** - *Openness to Experience*

And other variables such as the localisation of the user and their time spent to answer each of the questions.

The preprocessing required is pretty basic : handle the outliers, drop the NaNs, check that each value is included in their corresponding domain and cast each variable to their real type.

### 2.2 Problematic

With our visualization, we want to show to what extent cultures can shape our personality.  we would like to see whether some countries have a dominant personality trait. We would also like to know which questions require the most reflexion time, and whether there is a difference between countries regarding that aspect. Using the approximate localisation of users, we could draw some interesting map visualizations.

Also, we could visualize the distribution of the answers (from 1 to 5) for each question. This could show if there are some questions for which the majority of people answered positively/negatively.

Moreover, through clustering and visualization, we want to explore the hypothesis that people can actually be classified into personality categories.

Our motivation is to answer these questions with simple yet subtle visualization techniques, hoping that we could teach something interesting to the target audience, which generally speaking can be anyone.

### 2.3 Exploratory Data Analysis

We have a dataset containing the result of 1 015 341 big five personality tests, conducted from march 2016 to november 2018. There are 110 variables, 50 answers from the test and the corresponding time the participants take to answers. There are also diverse informations such as the screen size of the participants, the date at wich they attempted the test, the total time they took to complete it and the location. 
We cleaned the dataset by removing participants when they have multiple IP adresses, no location, when they did not answer to more than 90 percent of the test or when they were outliers because of the time they took to answer. 
We can see on the graph below the distribution of time taken to answer. There are a lot of 0. Some of them are due to participant skipping questions, while for other, there is simply no explanation, so we discarded them.
![alt text](https://github.com/com-480-data-visualization/com-480-project-tadaviz/blob/master/times.jpeg)

After preprocessing, we end up with 677 156 participants from 220 different countries. We then compute the total score in each trait for each participant and normalize it. From this we obtain the following graph showing the number of participant by country.
![alt text](https://github.com/com-480-data-visualization/com-480-project-tadaviz/blob/master/country.jpeg)

### 2.4 – Related work

##### What others have already done with the data ?

Does the growth in COVID-19 cases have anything to do with Big 5 Personality traits? : https://www.kaggle.com/bluewizard/covid-19-and-the-big-5-personality-test

This study used the same dataset combined with another one concerning the COVID-19 growth. It made some explorations with country-level aggregates on both datasets to determine whether there is some correlation between the growth of the virus and the scores on each of the Big 5 personality traits.

##### Why is your approach original ?

Compared to the study cited above, we will focus more on the psychological aspect to draw some interesting conclusions which we hope to show clearly through accessible visualizations.

##### What source of inspiration do you take ? Visualization that you found on other websites or magazines :

For visualizing the scores on each of the Big 5 personality traits, we think that radar graphs would be perfect. 
Here are some nice radio graphs :

- https://www.informationisbeautifulawards.com/showcase/2809-quartetto-sincronie-performing-beethoven-op-74-num-10

- https://dribbble.com/shots/2498804-Radar-Graph/attachments/491097

- https://dribbble.com/shots/3249998-Radar-Graph

Concerning map visualizations, we will define colours associated to each personality traits, and look forward to doing something like the following :

- https://www.informationisbeautifulawards.com/showcase/3135-streetscapes-mozart-marx-and-a-dictator



## Milestone 2 (Friday 1st May, 5pm)

  Our project’s principal goal is to show to what extent cultures can shape our personality. Thus, we would like to study, for each country, which personality trait is dominant, and make an interactive visualization which could convey this information the most easily. 

For this purpose, a dynamic map is the best suited. The map will be our **core visualization** and will be interactive. We hope to implement it using *Leaftlet.js*. Not only it will show the dominant personality trait, the user will also to be able to visualize other information such as the happiness level of countries or their average response time per personality questions. Here is a sketch of the visualization we hope to achieve: 


![Interactive Map S](https://user-images.githubusercontent.com/36303330/80799084-377d1e00-8ba6-11ea-82e5-91212d5872ed.png)


The user will be able to zoom in and out as he wishes, and will get to choose in the top-left tab between 3 criteria for visualization (other criteria may be added later): 

- The **dominant trait** : Each country will be displayed in the color associated to its dominant personality trait. Moreover, when the user hovers over a country, the following radar graph should be displayed :  


![Radar Graph S](https://user-images.githubusercontent.com/36303330/80799089-3b10a500-8ba6-11ea-8abe-004ed2034050.jpg)

   > Each vertex corresponds to one of the 5 personality traits. Thanks to this radar graph, we can easily visualize the average value for each personality trait for a given country.  

   > There are 5 axes, the center corresponds to a value of 1, and the closer a vertex of a polygon gets to the vertex of the outer polygon, the closer to the value of 5 the associated personality trait is. 
 
   > The black polygon corresponds to the average values, whereas the colored polygon corresponds to the average values in a given country. We think of implementing this graph using *D3.js*.
 
 
- The **trait corresponding to the longest response time**: Each country will be displayed in the color associated to the personality trait for which the questions had the longest response time in average. The labels will be the same as the labels for the Dominant Trait visualization. When the user hovers over a country, a radar graph should be displayed in the same manner, but this time, with the average response time for the questions associated to a given personality trait. This criterion might be interesting to visualize as it could be interesting to see if people from a given country are in average more “preoccupied” by questions for a given personality trait. 

- The **happiness level**: We plan on using an extra dataset, which could give us the happiness level of each country. This will be visualized using a heat map, which could indicate whether a happiness level of a given country is high or not. For this visualization, the labels will indicate the happiness level for given colors. When the user hovers over a country, a small window will appear and display the exact value of the associated happiness level. 


Additionally to this visualization, we also want to make an interactive barplot to visualize the distribution of the answers to a given question, for a given country. The user will get to choose these two parameters, and visualize the associated distribution. When he hovers over one of the bars, information will be displayed in a window, such as the value of the number of answers in this case.  Other interesting parameters to visualize might be added later on. This barplot will be implemented using *D3.js*, or libraries providing inbuilt interactive barplots. 
 
 
![Bar Plots S](https://user-images.githubusercontent.com/36303330/80799086-3946e180-8ba6-11ea-9ac9-eb2742568b61.png)


For all these visualizations, notes from lectures 6 and 7 about channels, design and dos and don’ts will be taken into consideration. 

#### Extra ideas 

- Besides making visualizations at the scale of countries, we could also make them at the scale of cities. For the dynamic map, that would require a function that determine in which scale the user wants to visualize by comparing the zooming degree to a threshold. The visualizations and radar graphs should be adapted accordingly. 

- We could select more than one country in the barplot to be able to compare the distribution of the answers to a given question between countries. Moreover, we could add an interactive map in to the barplot to be able to choose countries by selecting them directly on the map. 

- We could add a functionality which allows the user to do the Big Five Personality Test on our website,  displays his values for the 5 personality traits, and gives him the country which would suit him the best accordingly! 

- We could also run a 5-dimension clustering algorithm over all the answers to the test (by computing the average value for each personality trait for each test), and make a 2D visualization to see whether there are some patterns or not

#### Project prototype preview

The project prototype is available [here](https://com-480-data-visualization.github.io/com-480-project-tadaviz)

## Milestone 3 (Thursday 28th May, 5pm)

Two new datasets : 

- World Happiness dataset : https://www.kaggle.com/unsdsn/world-happiness#2019.csv
- Population by countries & country codes : https://www.kaggle.com/erikbruin/countries-of-the-world-iso-codes-and-population#countries_by_population_2019.csv

**80% of the final grade**

### Technical emplamentation and intended usage 
The project revolves around the answers of participants based on where they come from. The website is divided in 4 differentes pages based on what information is relevant.
The first page is a general overview of the the different visualisation containing the three buttons leading to the map, statistics and the custom made questionnaire.
#### Map page
The map page is a location oriented approach where data of the number of participants, dominant trait and characteristics are shown when a country is clicked. To do so a map taken from leaflet was linked with the data. Radiographs are displayed whenever the user hovers or clicks on a country if he selected “principal traits”. The radiograph axes use min-max normalization to better render the differences between each country. The global average is used as a reference. The results can be compared to the global happiness level of each country, it is intended so that the user can make guesses and hypothesis for correlation. But no clear tool of comparison is provided to avoid any position taking from the developers in this regard. The number of users that have answered in each country is also made available to better understand the data and its weights. 
#### General staitcs
The statistics button is a question oriented approach where the answers of the participants are displayed in regards to each question under the hierarchy of the dominant trait they belong to (consciousness, extraversion, openness, agreeableness, emotional stability). It is also possible to filter the answers by a country. The data can therefore be based on the country of the respondent and a specific question. The bar plots are made with the d3 librairie and on hover a bar will compare itself to the others displaying the difference through a percent difference. 
#### Custom questionaire
After visiting the two pages the visitor might want to take the test himself so he can compare his answers to the world and see where his personality stands in the world. The questions clearly indicates to which trait they refer to. It is made so that if people want to try and match a personality from a specific country it is fully possible. 

