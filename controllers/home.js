import models from '../models/index'
import React from 'react'
import { renderToString } from 'react-dom/server'
import Articles from '../assets/javascripts/components/articles.jsx'

async function index(ctx, next) {
  const articles = await models.Article.findAll({
    include: [ models.User ]
  })
  const prerenderHtml = await renderToString(
    <Articles articles={ articles } />
  )
  // ctx.session.userId = 4
  const locals = {
    nav: 'index',
    prerenderHtml: prerenderHtml,
    preloadedState: { articles: articles }
  }
  await ctx.render('home/index', locals)
}

async function about(ctx, next) {
  const locals = {
    title: 'About | Kails',
    nav: 'about'
  }
  await ctx.render('home/about', locals)
}

export default {
  index: index,
  about: about
}
