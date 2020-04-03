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

After pre-processing, we have over 700k valid answers to the personality test.
*other stats*

### 2.4 – Related work

What others have already done with the data ?
Does the growth in COVID-19 cases have anything to do with Big 5 Personality traits? : https://www.kaggle.com/bluewizard/covid-19-and-the-big-5-personality-test

Why is your approach original ?
 
 
What source of inspiration do you take ? Visualization that you found on other websites or magazines :



## Milestone 2 (Friday 1st May, 5pm)

**10% of the final grade**




## Milestone 3 (Thursday 28th May, 5pm)

**80% of the final grade**

