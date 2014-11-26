library(shiny)
library(rCharts)
options(RCHART_LIB = 'dimple')

load('data/bl_f.RData')

shinyUI(fluidPage(theme='bootstrap.min.css',
                  tags$style(type='text/css',
                             'label {font-size: 12px;}',
                             '.recalculating {opacity: 1.0;}'
                  ),
                  tags$h2('Localytics Data Visualization Challenge'),
                  tags$h3('Finding the target funders'),
                  
                  wellPanel(
                    fluidRow(
                      tags$h4('1. What regions have the most generous funders in terms of the total funding given?')
                      ),
                    fluidRow(
                      column(2, 
                             checkboxGroupInput('cat', 
                                                label = h5('Select project category:'), 
                                                choices = levels(as.factor(bl_f$category)),
                                                selected = c('Environment', 'Sports')),
                             actionButton('submit', 'Submit')
                            ),
                      column(10, plotOutput('county_plot', height = 'auto'))
                      ),
                    
                    fluidRow(
                      tags$h4('2. How are the users distributed within and across all the states?')
                      ),
                    fluidRow(
                      column(2,
                             radioButtons('var', label = h5('Select user type:'),
                                          choices = c('age', 'device', 'gender', 'marital_status'),
                                          selected = 'age'),
                             radioButtons('perc', label = h5('y-axis:'),
                                          choices = c('in %', 'in $'),
                                          selected = 'in %')
                             ),
                      column(10, showOutput('state_plot', 'dimple'))
                    ),
                    
                    fluidRow(
                      tags$h4('3. Using logistic regression, determine what factors that may influence a user\'s decision to fund a project and how these factors are related to the outcome (while controlling for other factors)?')
                    ),
                    fluidRow(
                      column(4, htmlOutput('test_roc')),
                      column(6, plotOutput('coef_plot', height = 'auto'))
                    ),
                    
                    fluidRow(
                      tags$h4('Conclusion:'),
                      htmlOutput('conclusion')
                      )
                  ),
                  p(tags$a(href = 'http://www.runzemc.com', 'www.runzemc.com')),
                  p(tags$a(href = 'https://github.com/Runze/data_viz_challenge', 'https://github.com/Runze'))
))