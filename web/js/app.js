import Vue from 'vue'
import VueRouter from 'vue-router'

import LayoutSection from './sections/layout/index.js'
import HomeSection from './sections/home/index.js'
import FAQSection from './sections/faq/index.js'

Vue.use(VueRouter);

var router = new VueRouter();
router.map({
    '/': { component: HomeSection },
    '/faq': { component: FAQSection }
});

router.start(LayoutSection, '#content');