const express = require('express');
const app = express();
const exphbs =  require('express-handlebars')
const port = 3000;

const restaurantList = require('./restaurant.json')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set ('view engine', 'handlebars')

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index', { restaurant: restaurantList.results })
})

app.get('/restaurants/:shop_id', (req, res) => {
    const shop = restaurantList.results.find(shop => shop.id.toString() === req.params.shop_id)
    console.log(shop)
    res.render('show', { restaurant: shop })
})

app.get('/search', (req, res) => {
    const keyword = req.query.keyword
    const restaurant = restaurantList.results.filter(shop => {
        return shop.name.toLowerCase().includes(keyword.toLowerCase())
    })
    res.render('index', { restaurant: restaurant, keyword: keyword })
  })

app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})