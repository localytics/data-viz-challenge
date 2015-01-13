library(shiny)
library(pROC)
library(caret)
library(dplyr)
library(mapproj)
library(ggplot2)
library(grid)
library(rjson)
library(rCharts)
library(coefplot)

load('data/bl_df.RData')
load('data/bl_f.RData')
load('data/county_map.RData')
load('data/state_abbs.RData')

#server function
shinyServer(function(input, output) {
  #filter to the given category and aggregate by user
  by_user = reactive({
    validate(
      need(length(input$cat) > 0, 'Please select at least one category.')
    )
    
    bl_f %>%
      filter(category %in% input$cat) %>%
      group_by(session_id, age, device,
               location.state, marital_status, county) %>%
      arrange(session_id, gender) %>%
      summarize(amount = sum(amount), gender = first(gender))
  })
  
  #plot map
  output$county_plot = renderPlot({
    input$submit
    
    isolate({
      #aggregate by county
      by_county =
        by_user() %>%
        group_by(county) %>%
        summarize(total_amount = sum(amount))
      
      #merge with map data
      fund_map = left_join(county_map, by_county, by = 'county', all = T)
      fund_map = arrange(fund_map, order)
      fund_map$total_amount[is.na(fund_map$total_amount)] = 0
      
      #plot map
      county_plot = 
        ggplot(fund_map, aes(x = long, y = lat, group = group, fill = log1p(total_amount))) +
        geom_polygon(colour = '#fff5eb', size = .05) + coord_map('polyconic') +
        scale_fill_continuous(low = '#fee6ce', high = '#b30000', name = 'log(1 + Total Funding)') +
        borders('state', colour = 'white', size = .5) +
        annotate('text', x = state_abbs$long, y = state_abbs$lat, label = state_abbs$state_abb,
                 size = 3, colour = '#67000d') +
        ggtitle(paste('Funding of', paste(input$cat, collapse = ', '))) +
        theme(legend.position = 'bottom', plot.margin = unit(c(0, 0, 0, 0), 'mm'),
              panel.grid = element_blank(), panel.border = element_blank(),
              axis.title = element_blank(), axis.ticks = element_blank(), axis.text = element_blank(),
              panel.background = element_blank(), plot.background = element_blank(),
              legend.background = element_blank())
      
      county_plot
    })
  }, bg = 'transparent', width = 800, height = 600)
  
  #plot states
  output$state_plot = renderChart2({
    input$submit
    
    by_state = isolate({
      by_user()
    })
    
    #the following function is not isolated and is executed whenever a selection is made by the user
    #aggregate by state and one other variable as specified
    by_state =
      by_state %>%
      regroup(list('location.state', input$var)) %>%
      summarize(total_amount = sum(amount))
    names(by_state) = c('State', input$var, 'Funding')
    
    state_plot =
      dPlot(Funding ~ State, groups = input$var,
            type = 'bar', data = by_state)
    
    state_plot$xAxis(type = 'addCategoryAxis', orderRule = 'State')
    state_plot$yAxis(type = 'addMeasureAxis', orderRule = input$var, showPercent = input$perc == 'in %')
    state_plot$legend(x = 60, y = 10, width = 700, height = 20, horizontalAlign = 'right', orderRule = input$var)
        
    state_plot
  })
  
  #train a logit model
  train_logit = reactive({
    validate(
      need(length(input$cat) > 0, 'Please select at least one category.')
    )
    
    withProgress(message = 'Creating map and training model...', {
      bl_m =
        bl_df %>%
        filter(category %in% input$cat) %>%
        group_by(session_id, age, device,
                 location.state, marital_status) %>%
        arrange(session_id, gender) %>%
        summarize(amount = sum(amount), gender = first(gender)) %>%
        filter(gender %in% c('M', 'F')) %>%
        mutate(fund = amount > 0) %>%
        select(-amount)
      
      bl_m = data.frame(sapply(bl_m, as.factor))
      levels(bl_m$fund) = list('not_funded' = F, 'funded' = T)
      
      #convert to model matrix
      bl_matrix = model.matrix(fund ~ age + device + location.state + marital_status + gender,
                               data = bl_m)
      bl_matrix = bl_matrix[, -1]
      
      #split data into training and test set
      set.seed(2014)
      train_ind = createDataPartition(bl_m$fund, p = .75, list = F)
      bl_train = bl_matrix[train_ind, ]
      bl_test = bl_matrix[-train_ind, ]
      
      #remove near-0 variance
      near0 = nearZeroVar(bl_train)
      if (length(near0) > 0) {
        bl_train = bl_train[, -near0]
        bl_test = bl_test[, -near0]
      }
      
      #remove highly correlated varaibles
      corr = cor(bl_train)
      highcorr = findCorrelation(corr)
      if (length(highcorr) > 0) {
        bl_train = bl_train[, -highcorr]
        bl_test = bl_test[, -highcorr]
      }
      
      #merge with the response variable
      bl_train = data.frame(bl_train)
      bl_train$fund = bl_m$fund[train_ind]
      
      #10-fold cv
      set.seed(2014)
      f = createFolds(bl_train$fund, returnTrain = T)
      ctrl = trainControl(method = 'cv', index = f,
                          summaryFunction = twoClassSummary, classProbs = T)
      
      set.seed(2014)
      logit_m = train(fund ~ ., data = bl_train,
                      method = 'glm', family = 'binomial', metric = 'ROC', trControl = ctrl)
      
      logit_m_fin = logit_m$finalModel
      
      #apply to test set
      bl_test = data.frame(bl_test)
      logit_p = predict(logit_m, bl_test, type = 'prob')
      
      #roc
      roc_test = roc(bl_m$fund[-train_ind], logit_p$funded)
    })
    
    
    list(logit_m_fin, round(as.numeric(roc_test$auc), 3))
  })
  
  output$coef_plot = renderPlot({
    input$submit
    
    isolate({
      coef_plot =  
        coefplot(train_logit()[[1]]) + 
        theme(panel.border = element_rect(fill = NA, colour = 'black'),
              panel.background = element_blank(), plot.background = element_blank(),
              legend.background = element_blank())
      
      coef_plot
    })
  }, bg = 'transparent', width = 600, height = 500)
  
  output$test_roc = renderUI({
    input$submit
    
    isolate({
      HTML('<h5>', 'The logistic regression model is trained and selected using 75% of the data with 10-fold cross-validation.', '<br>', 
           'When applied to the remaining 25%, the model results in an ROC of', train_logit()[[2]], '<h5>')  
    })
  })
  
  output$conclusion = renderUI({
    input$submit
    
    isolate({
      coefs = coef(summary((train_logit()[[1]])))
      coefs = data.frame(coefs)
      coefs$var = row.names(coefs)
      
      #function to create narrative to describe the regression result
      create_narrative = function(c, n) {
        #location
        if(length(grep('location', c$var)) > 0) {
          states = filter(c[grep('location', c$var), ], Estimate > 0)
          states = as.character(states$var)
          states = gsub('location.state', '', states)
          states = paste(states, collapse = ', ')
          n = paste(n, 'located in', states)
        }
        
        if(length(grep('age', c$var)) > 0) {
          ages_sig = filter(c[grep('age', c$var), ])
          ages_pos = filter(ages_sig, Estimate > 0)
          if(nrow(ages_pos) > 0) {
            ages = as.character(ages_pos$var)
            ages = gsub('age', '', ages)
            ages = gsub('\\.$', '+', ages)
            ages = gsub('\\.', '-', ages)
            ages = paste(ages, collapse = ', ')
            n = paste(n, 'aged', ages)
          }
          else {
            n = paste(n, 'aged 18-24')
          }
        }
        
        if(length(grep('gender', c$var)) > 0) {
          if(c$Estimate[c$var == 'genderM'] > 0) {
            n = paste(n, 'male')
          }
          else {
            n = paste(n, 'female')
          }
        }
        
        if(length(grep('marital', c$var)) > 0) {
          if(c$Estimate[c$var == 'marital_statussingle'] > 0) {
            n = paste(n, 'single')
          }
          else {
            n = paste(n, 'married')
          }
        }
        
        if(length(grep('device', c$var)) > 0) {
          if(c$Estimate[c$var == 'deviceiOS'] > 0) {
            n = paste(n, 'using iOS')
          }
          else {
            n = paste(n, 'using Android')
          }
        }
        n
      }
      
      #analyze significant variables
      coefs_sig = coefs %>%
        filter(Pr...z.. <= .05) %>%
        select(var, Estimate)
      
      if(nrow(coefs_sig) > 0) {
        narrative = create_narrative(coefs_sig, sprintf('The model shows that the following viewers have a significantly higher likelihood to fund a project in %s:', paste(input$cat, collapse = ', ')))
      }
      else {
        narrative = create_narrative(coefs, sprintf('None of the variables are statistically significant, however, the model shows that the following viewers have a higher (although not significantly higher) likelihood to fund a project in %s:', paste(input$cat, collapse = ', ')))
      }
      
      HTML('<h5>', narrative, '<h5>')
    })
  })
})
