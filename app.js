// require packages used in the project
const express = require('express')
const app = express()
const port = 3000

// require express-handlebars here
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))


// routes setting
app.get('/', (req, res) => {
    res.render('index', {restaurants: restaurantList.results})
})

app.get('/restaurants/:restaurant_id', (req, res) => {
    const restaurant = restaurantList.results.find( restaurant => restaurant.id.toString() === req.params.restaurant_id)
    res.render('show', {restaurant: restaurant})
})

app.get('/search', (req, res) => {
    console.log('search keyword: ', req.query.keyword)
    // const restaurants = restaurantList.results.filter( restaurant => restaurant.name.toLowerCase().includes(req.query.keyword.toLowerCase()))
    const restaurants = restaurantList.results.filter( restaurant =>    restaurant.name.toLowerCase().includes(req.query.keyword.toLowerCase()) || 
                                                                        restaurant.category.toLowerCase().includes(req.query.keyword.toLowerCase()))
    console.log('restaurants: ', restaurants)
    res.render('index', {restaurants: restaurants, keyword: req.query.keyword})
})

  
  // start and listen on the Express server
app.listen(port, () => {
    console.log(`Express is listening on localhost:${port}`)
})