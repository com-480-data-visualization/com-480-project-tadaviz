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

We have a dataset containing the result of 1 015 341 big five personality tests, conducted from march 2016 to november 2018. There is 110 variables, 50 answers from the test and the corresponding time the participants take to answers. There is also diverse informations such as the screen size of the participants, the date at wich they attempted the test, the total time they took to complete it and the location. 
We cleaned the dataset by removing participants when they have multiple IP adresses, no location, when they did not answer to more than 90 percent of the test or when they were outlier in the time they take to answer. 
We can see on the graph below the distribution of time taken to answer. They're are a lot of 0. Some of them are due to participant skipping questions, we have no explanation for other, so they are discarded.
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

**10% of the final grade**




## Milestone 3 (Thursday 28th May, 5pm)

**80% of the final grade**

